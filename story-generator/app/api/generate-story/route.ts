import { PromptTemplate } from "@langchain/core/prompts"

import { NextRequest, NextResponse } from "next/server"
import { createChatModel } from "../../global/fn/createChatModel"

// semua logika sebelumnya masuk ke sini
const makeStoryTitle = async (subject: string) => {
  const model = createChatModel()

  const prompt = new PromptTemplate({
    inputVariables: ["subject"],
    template: "Buatkan satu judul cerita tentang {subject}. Keluarkan HANYA responsnya, tanpa penjelasan atau teks tambahan.",
  })

  const chain = prompt.pipe(model)

  return await chain.invoke({ subject })
}
const streamStory = async (storyTitle: string) => {
  const encoder = new TextEncoder()

  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  const model = createChatModel({
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken: async (token: string) => {
          await writer.ready
          await writer.write(encoder.encode(`${token}`))
        },
        handleLLMEnd: async () => {
          await writer.ready
          await writer.close()
        },
      },
    ],
  })

  const prompt = new PromptTemplate({
    inputVariables: ["storyTitle"],
    template: "Ceritakan kisah berjudul {storyTitle} sebanyak 500 karakter. Keluarkan HANYA responsnya, tanpa penjelasan atau teks tambahan.",
  })

  const chain = prompt.pipe(model)
  chain.invoke({ storyTitle })

  return new NextResponse(stream.readable, {
    headers: { "Content-Type": "text/event-stream" },
  })
}
export async function POST(req: NextRequest) {
  try {
    const { subject, storyTitle } = await req.json()
    if (storyTitle) {
      return streamStory(storyTitle)
    }
    if (!subject) {
      return Response.json({ error: "Subject is required" }, { status: 400 })
    }

    const gptResponse = await makeStoryTitle(subject)

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
