import { ChatOpenAI } from "@langchain/openai";

// Fungsi pembuat model ChatOpenAI yang reusable
export const createChatModel = (options?: {
  streaming?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callbacks?: any[];
  temperature?: number;
}) => {
  // Validate required environment variables
  if (!process.env.OPENAI_API_KEY) {
    console.error("Error: OPENAI_API_KEY is not set in environment variables");
    throw new Error("Missing OPENAI_API_KEY environment variable");
  }

  if (!process.env.OPENAI_MODEL) {
    console.warn(
      "Warning: OPENAI_MODEL is not set, using default model 'gpt-3.5-turbo'",
    );
  }

  try {
    return new ChatOpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      modelName: process.env.OPENAI_MODEL || "gpt-3.5-turbo",
      configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
      },
      temperature: options?.temperature ?? 0.7,
      streaming: options?.streaming ?? false,
      callbacks: options?.callbacks,
    });
  } catch (error) {
    console.error("Error creating ChatOpenAI model:", error);
    throw error;
  }
};
