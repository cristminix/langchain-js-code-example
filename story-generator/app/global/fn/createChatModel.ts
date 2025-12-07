import { ChatOpenAI } from "@langchain/openai"

// Fungsi pembuat model ChatOpenAI yang reusable
export const createChatModel = (options?: {
  streaming?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callbacks?: any[]
  temperature?: number
}) => {
  return new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: process.env.OPENAI_MODEL,
    configuration: {
      baseURL: process.env.OPENAI_BASE_URL,
    },
    temperature: options?.temperature ?? 0.7,
    streaming: options?.streaming ?? false,
    callbacks: options?.callbacks,
  })
}
