# Gemini Clone (React + Vite)

A simple Gemini-style chat UI built with React and Vite.

## Local development

1. Install dependencies:

```bash
npm install
```

2. Create a `.env` file in the project root:

```bash
VITE_GOOGLE_API_KEY=your_google_ai_api_key
```

3. Start the app:

```bash
npm run dev
```

## Build

```bash
npm run build
```

## Deployment notes

This app requires `VITE_GOOGLE_API_KEY` to be present at build/runtime (depending on host).
If the key is missing, sending a prompt will fail with an explicit error message.

For static hosts (Netlify, Vercel, GitHub Pages, etc.), set `VITE_GOOGLE_API_KEY` in the platform environment settings before deploying.

If the env variable is missing, the app now prompts for a Gemini API key in the browser and stores it in `localStorage` as `gemini_api_key`.


## Live deployment

https://kasaudhanshivani.github.io/gemini_clone/docs/
