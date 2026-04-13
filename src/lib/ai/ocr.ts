/**
 * AI OCR Service
 * Interface for the AI Worker to process screenshots and categorize tasks.
 */

export interface ExtractedTask {
  title: string;
  category: string;
  confidence: number;
}

class AIService {
  private worker: Worker | null = null;
  private isInitialized = false;

  private getWorker() {
    if (!this.worker) {
      // Create a new worker from our worker script
      this.worker = new Worker(new URL('./worker.ts', import.meta.url), {
        type: 'module'
      });
    }
    return this.worker;
  }

  async init() {
    if (this.isInitialized) return;
    
    return new Promise<void>((resolve, reject) => {
      const worker = this.getWorker();
      
      const handler = (e: MessageEvent) => {
        if (e.data.type === 'READY') {
          worker.removeEventListener('message', handler);
          this.isInitialized = true;
          resolve();
        } else if (e.data.type === 'ERROR') {
          worker.removeEventListener('message', handler);
          reject(new Error(e.data.payload));
        }
      };

      worker.addEventListener('message', handler);
      worker.postMessage({ type: 'INIT' });
    });
  }

  async processScreenshot(image: string | Blob, categories: string[]): Promise<ExtractedTask[]> {
    await this.init();

    return new Promise((resolve, reject) => {
      const worker = this.getWorker();
      
      const handler = (e: MessageEvent) => {
        if (e.data.type === 'RESULT') {
          worker.removeEventListener('message', handler);
          resolve(e.data.payload);
        } else if (e.data.type === 'ERROR') {
          worker.removeEventListener('message', handler);
          reject(new Error(e.data.payload));
        }
      };

      worker.addEventListener('message', handler);
      worker.postMessage({
        type: 'PROCESS_SCREENSHOT',
        payload: { image, categories }
      });
    });
  }
}

export const aiService = new AIService();
