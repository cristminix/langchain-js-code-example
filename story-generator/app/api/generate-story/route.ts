import { ChatOpenAI } from "@langchain/openai"
import { LLMChain } from "langchain/chains"
import { PromptTemplate } from "langchain/prompts"
import { NextRequest } from "next/server"

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: process.env.OPENAI_MODEL,
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  },
  temperature: 0.9,
})
// menetapkan format umum template
const prompt = new PromptTemplate({
  inputVariables: ["subject"],

  template: "Beritahu saya judul cerita tentang {subject}",
})
export async function POST(req: NextRequest) {
  try {
    const { subject } = await req.json()

    if (!subject) {
      return Response.json({ error: "Subject is required" }, { status: 400 })
    }

    // sebuah chain lcel yang menghubungkan model, prompt, dan opsi verbose
    const chain = prompt.pipe(model)

    const gptResponse = await chain.invoke({ subject })

    return Response.json({ data: gptResponse })
  } catch (error) {
    console.error("Error in generate-story API:", error)
    return Response.json(
      {
        error: "Failed to generate story",
        details: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 }
    )
  }
}
