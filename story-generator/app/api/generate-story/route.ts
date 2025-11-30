import { ChatOpenAI } from "@langchain/openai"
import { NextRequest } from "next/server"

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  modelName: process.env.OPENAI_MODEL,
  configuration: {
    baseURL: process.env.OPENAI_BASE_URL,
  },
  temperature: 0.9,
})

export async function POST(req: NextRequest) {
  try {
    const { subject } = await req.json()

    if (!subject) {
      return Response.json({ error: "Subject is required" }, { status: 400 })
    }

    const gptResponse = await model.invoke(subject)

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
