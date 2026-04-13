import { pipeline, env } from '@xenova/transformers';

// Configuration for Transformers.js
env.allowLocalModels = false;
env.useBrowserCache = true;

class AIWorker {
  static instance: AIWorker | null = null;
  private ocrPipeline: any = null;
  private classifierPipeline: any = null;

  static async getInstance() {
    if (!this.instance) {
      this.instance = new AIWorker();
    }
    return this.instance;
  }

  async loadModels() {
    if (!this.ocrPipeline) {
      console.log('Loading OCR model...');
      // Using Florence-2 for robust OCR
      this.ocrPipeline = await pipeline('image-to-text', 'onnx-community/Florence-2-base-ft', {
        device: 'webgpu', // Fallback to 'wasm' is automatic in newer versions if webgpu fails
      });
    }

    if (!this.classifierPipeline) {
      console.log('Loading classification model...');
      // Zero-shot classification model
      this.classifierPipeline = await pipeline('zero-shot-classification', 'Xenova/bart-large-mnli', {
        device: 'webgpu',
      });
    }
  }

  async processScreenshot(image: string | Blob, categories: string[]) {
    await this.loadModels();

    // 1. OCR Extraction
    const ocrResult = await this.ocrPipeline(image, {
      prompt: '<OCR>',
    });
    const extractedText = ocrResult[0].generated_text;

    // 2. Task Parsing (Basic heuristic for now: split lines and look for "todo" markers)
    const lines = extractedText.split('\n').filter((l: string) => l.trim().length > 3);
    
    // 3. Categorization for each extracted line
    const tasks = await Promise.all(lines.map(async (text: string) => {
      const categoryResult = await this.classifierPipeline(text, {
        candidate_labels: categories,
      });
      
      return {
        title: text.trim(),
        category: categoryResult[0].label,
        confidence: categoryResult[0].score,
      };
    }));

    return tasks;
  }
}

// Handle messages from the main thread
self.onmessage = async (event) => {
  const { type, payload } = event.data;
  const worker = await AIWorker.getInstance();

  try {
    if (type === 'PROCESS_SCREENSHOT') {
      const { image, categories } = payload;
      const tasks = await worker.processScreenshot(image, categories);
      self.postMessage({ type: 'RESULT', payload: tasks });
    } else if (type === 'INIT') {
      await worker.loadModels();
      self.postMessage({ type: 'READY' });
    }
  } catch (error: any) {
    self.postMessage({ type: 'ERROR', payload: error.message });
  }
};
