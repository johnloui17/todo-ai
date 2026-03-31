=== PHASE 01: DISCOVERY & RESEARCH ===

You are a senior UX researcher. Help me conduct a thorough discovery phase for my product.

Tasks:
1. Generate 3 detailed user personas with: name, age, job, goals, pain points, and tech literacy level
2. Suggest 5 direct competitor products I should audit and what to look for in each
3. Define my core design goals: speed, simplicity, data-density, mobile-first, or trust-building
4. List every user journey I need to design for (onboarding, core action, error recovery, empty state)
5. Identify any assumptions I'm making that need to be validated

My product is: [DESCRIBE YOUR PRODUCT HERE]
My target user is: [DESCRIBE TARGET USER]

Free tools: v0.dev, Perplexity AI, ChatGPT, Notion AI

────────────────────────────────────────────────────────────

=== PHASE 02: INFORMATION ARCHITECTURE ===

You are an expert Information Architect. Help me structure my product's IA.

Tasks:
1. Create a complete sitemap listing every screen/page and how they connect
2. Map out step-by-step user flows for these key actions: [LIST YOUR KEY ACTIONS]
3. Define the content hierarchy for each main screen (what is most important, secondary, tertiary)
4. Recommend a navigation pattern (top nav / sidebar / bottom tabs / hamburger) with reasoning
5. Identify any screens I might be missing

Apply these principles: progressive disclosure, minimal clicks to core action, familiar patterns over clever ones.

My product screens so far: [LIST YOUR SCREENS]

Free tools: Whimsical (free), Miro (free tier), FigJam (free), Eraser.io

────────────────────────────────────────────────────────────

=== PHASE 03: WIREFRAMING (LO-FI) ===

You are a senior product designer. Help me wireframe my key screens.

For each screen listed below, describe:
1. The exact layout structure (header, sidebar, main content, footer)
2. What components go where (buttons, inputs, cards, tables, modals)
3. The primary CTA and where it lives
4. What empty state, loading state, and error state should show
5. Mobile vs desktop layout differences

Screens to wireframe: [LIST YOUR SCREENS]

Output each screen as a structured text wireframe using ASCII or a clear description I can hand to a designer or paste into Figma.

Free tools: Figma (free), Uizard (free tier), Sketch2Code, tldraw (free)

────────────────────────────────────────────────────────────

=== PHASE 04: DESIGN SYSTEM SETUP ===

You are a design systems expert. Help me build a scalable design system from scratch.

Tasks:
1. Suggest a complete color palette: primary, secondary, neutrals, and semantic colors (success/warning/error/info) with hex values
2. Recommend a typography scale: font family, sizes (H1-H6, body, caption, label), weights, and line heights
3. Define a spacing system using base-8 grid (8, 16, 24, 32, 48, 64, 96px)
4. List every UI component I need to build first (prioritized by usage frequency)
5. Suggest a free icon library that fits my product's tone
6. Define elevation levels (no shadow / subtle / medium / high)

My product tone is: [professional / playful / minimal / bold / trustworthy]
My primary brand color is: [HEX or description]

Free tools: Shadcn/ui (free), Radix UI (free), Lucide Icons (free), Google Fonts (free), Coolors (free)

────────────────────────────────────────────────────────────

=== PHASE 05: HI-FI MOCKUPS ===

You are a senior UI designer with expertise in conversion-focused design. Help me design high-fidelity screens.

For each screen, provide:
1. Visual hierarchy recommendations — what should draw the eye first, second, third
2. Specific color, typography, and spacing decisions using my design system
3. Component choices — which UI pattern works best and why (table vs cards, tabs vs accordion, etc.)
4. Micro-copy suggestions — button labels, empty states, placeholder text, tooltips
5. Accessibility checks — contrast ratios, focus states, aria labels needed
6. One "design upgrade" idea that would make this screen stand out

Apply these principles: generous whitespace, consistent 8px grid, WCAG AA contrast, mobile-first.

Screen to design: [SCREEN NAME]
Key user goal on this screen: [WHAT USER WANTS TO DO]

Free tools: Figma (free), v0.dev (free), Galileo AI (free tier), Framer (free tier)

────────────────────────────────────────────────────────────

=== PHASE 06: PROTOTYPING & INTERACTIONS ===

You are a motion design and prototyping expert. Help me define interactions and animations for my product.

Tasks:
1. List all micro-interactions needed (button press, form validation, page transition, loading, success/error feedback)
2. For each interaction, define: trigger, animation type, duration (ms), easing curve
3. Recommend skeleton loader patterns for my data-heavy screens
4. Define toast/snackbar behavior: position, duration, dismiss behavior
5. Suggest page transition style that fits my product's tone
6. Identify any interactions that could delight users without adding friction

Prioritize: perceived performance over decoration. Every animation must have a purpose.

My product's tone is: [fast & functional / warm & friendly / premium & smooth]
Key screens needing interactions: [LIST SCREENS]

Free tools: Figma (free), Framer (free tier), Rive (free), CSS animations (free)

────────────────────────────────────────────────────────────

=== PHASE 07: USABILITY TESTING ===

You are a UX research expert. Help me design and run a usability test for my prototype.

Tasks:
1. Write 5 task-based test scenarios for my core user flows (not "click on X" — real goal-based tasks)
2. Create a pre-test screener questionnaire to find the right participants (5 users needed)
3. Write a moderator script: intro, tasks, debrief questions
4. List the top 10 usability heuristics I should evaluate against
5. Create a scoring rubric: how to rate each task (completed / completed with difficulty / failed)
6. Suggest how to synthesize findings into a prioritized fix list

My core user flows: [LIST YOUR FLOWS]
My target user: [DESCRIBE USER]

Free tools: Maze (free tier), Lyssna (free tier), Google Forms (free), Lookback (free trial)

────────────────────────────────────────────────────────────

=== PHASE 08: DEV HANDOFF ===

You are a design engineering expert. Help me create a complete dev handoff package.

Tasks:
1. Write a component spec for each UI component: props, variants, states, behavior
2. Create an annotation guide: what measurements and notes engineers need on every screen
3. List all assets to export: format (SVG/WebP/PNG), size variants (@1x, @2x), naming convention
4. Write interaction spec: exact timing, easing, trigger conditions for every animation
5. Create an accessibility checklist: ARIA roles, keyboard navigation, focus order, screen reader labels
6. List edge cases engineers need to handle: long text truncation, empty states, error states, offline state

Components to spec: [LIST YOUR COMPONENTS]
Tech stack: [YOUR STACK — e.g. React + Tailwind]

Free tools: Figma Dev Mode (free), Storybook (free), Zeroheight (free tier), Chromatic (free tier)