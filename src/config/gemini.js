import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const ENV_API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function getApiKey() {
  if (ENV_API_KEY) {
    return ENV_API_KEY;
  }

  if (typeof window !== "undefined") {
    const storedKey = window.localStorage.getItem("gemini_api_key");
    if (storedKey) {
      return storedKey;
    }

    const enteredKey = window.prompt(
      "Enter your Gemini API key to use this app (it will be saved in this browser)."
    );

    if (enteredKey && enteredKey.trim()) {
      const normalized = enteredKey.trim();
      window.localStorage.setItem("gemini_api_key", normalized);
      return normalized;
    }
  }

  throw new Error(
    "Missing VITE_GOOGLE_API_KEY. Add it in Vercel project settings, or enter a key when prompted."
  );
}

function getClient() {
  return new GoogleGenerativeAI(getApiKey());
}

async function runChat(prompt) {
  const genAI = getClient();

  let model = genAI.getGenerativeModel({ model: "gemini-1.5-pro" });

  const generationConfig = {
    temperature: 1,
    topP: 0.95,
    topK: 64,
    maxOutputTokens: 8192,
    responseMimeType: "text/plain",
  };

  const safetySettings = [
    {
      category: HarmCategory.HARM_CATEGORY_HARASSMENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_HATE_SPEECH,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_SEXUALLY_EXPLICIT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
    {
      category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT,
      threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE,
    },
  ];

  let chat = model.startChat({
    generationConfig,
    safetySettings,
    history: [],
  });

  try {
    const result = await chat.sendMessage(prompt);
    const response = result.response;
    return await response.text();
  } catch (error) {
    console.error("Error with chat API (pro):", error);

    if (error.message.includes("429")) {
      model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
      chat = model.startChat({
        generationConfig,
        safetySettings,
        history: [],
      });

      const result = await chat.sendMessage(prompt);
      const response = result.response;
      return await response.text();
    }

    throw new Error("Failed to generate response.");
  }
}

export default runChat;
