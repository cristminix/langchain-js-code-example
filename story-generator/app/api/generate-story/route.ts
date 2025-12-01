import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "langchain/prompts"
import {
  CommaSeparatedListOutputParser,
  StringOutputParser,
} from "langchain/schema/output_parser"
import { NextRequest, NextResponse } from "next/server"

// Fungsi pembuat model ChatOpenAI yang reusable
const createChatModel = (options?: {
  streaming?: boolean
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  callbacks?: any[]
}) => {
  return new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    modelName: process.env.OPENAI_MODEL,
    configuration: {
      baseURL: process.env.OPENAI_BASE_URL,
    },
    temperature: 0.9,
    streaming: options?.streaming ?? false,
    callbacks: options?.callbacks,
  })
}

// semua logika sebelumnya masuk ke sini
const makeStoryTitle = async (subject: string) => {
  const model = createChatModel()

  const prompt = new PromptTemplate({
    inputVariables: ["subject"],
    template:
      "Buatkan satu judul cerita tentang {subject}. Keluarkan HANYA responsnya, tanpa penjelasan atau teks tambahan.",
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
    template:
      "Ceritakan kisah berjudul {storyTitle} sebanyak 500 karakter. Keluarkan HANYA responsnya, tanpa penjelasan atau teks tambahan.",
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

const makePossibileAnswers = async (question: string) => {
  const model = createChatModel()
  const prompt = PromptTemplate.fromTemplate(
    "Berikan 4 kemungkinan jawaban untuk {question}, dipisahkan oleh koma, 3 salah dan 1 benar, dalam urutan acak."
  )
  const chain = prompt.pipe(model).pipe(new CommaSeparatedListOutputParser())

  return await chain.invoke({ question })
}
const makeQuestion = async () => {
  const model = createChatModel()
  const prompt = PromptTemplate.fromTemplate(
    `Ajukan satu pertanyaan trivia tentang geografi.Keluarkan HANYA responsnya, tanpa penjelasan atau teks tambahan.`
  )
  const chain = prompt.pipe(model).pipe(new StringOutputParser())

  return await chain.invoke({})
}
export async function GET() {
  const question = await makeQuestion()
  const answer = await makePossibileAnswers(question)
  return Response.json({ question, answer })
}
