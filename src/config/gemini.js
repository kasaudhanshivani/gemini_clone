import Groq from "groq-sdk";

const API_KEY = import.meta.env.VITE_GROQ_API_KEY;

function getClient() {
  if (!API_KEY) {
    throw new Error("Missing VITE_GROQ_API_KEY");
  }

  return new Groq({
    apiKey: API_KEY,
    dangerouslyAllowBrowser: true,
  });
}

async function runChat(prompt) {
  try {
    const groq = getClient();

    const completion = await groq.chat.completions.create({
      messages: [
        {
          role: "user",
          content: prompt,
        },
      ],
      model: "openai/gpt-oss-20b",
      temperature: 0.7,
      max_tokens: 2048,
    });

    return completion.choices[0].message.content;
  } catch (error) {
    console.error("Groq Error:", error);
    throw new Error("Failed to generate response.");
  }
}

export default runChat;