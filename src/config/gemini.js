import {
  GoogleGenerativeAI,
  HarmCategory,
  HarmBlockThreshold,
} from "@google/generative-ai";

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY;

function getClient() {
  if (!API_KEY) {
    throw new Error(
      "Missing VITE_GOOGLE_API_KEY. Add it to your environment before sending prompts."
    );
  }

  return new GoogleGenerativeAI(API_KEY);
}

async function runChat(prompt) {
  const genAI = getClient();

  // Primary model
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

    // If it's a quota error (429), fallback to gemini-1.5-flash
    if (error.message.includes("429")) {
      console.log("Falling back to gemini-1.5-flash due to quota limits...");

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
