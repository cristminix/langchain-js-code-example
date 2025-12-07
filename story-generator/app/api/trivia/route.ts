import { ChatPromptTemplate } from "@langchain/core/prompts"
import { StructuredOutputParser } from "@langchain/core/output_parsers"
import { createChatModel } from "../../global/fn/createChatModel"
import { z, ZodString, ZodArray, ZodNumber } from "zod"
import { RunnableSequence } from "@langchain/core/runnables"
import { AIMessage, BaseMessage, HumanMessage } from "@langchain/core/messages"

type ITriviaSchema = {
  question: ZodString
  answers: ZodArray<ZodString>
  correctIndex: ZodNumber
}

// Definisikan chatHistory sebagai array BaseMessage
const chatHistory: BaseMessage[] = []
// menggunakan StructuredOutputParser kita sekarang dapat membungkus semua
// data ke dalam satu struktur tunggal

const makeQuestionAndAnswers = async () => {
  // Zod digunakan untuk mendefinisikan apakah suatu bidang adalah string, angka, array, dll
  const config: ITriviaSchema = {
    question: z.string().describe(`berikan saya pertanyaan trivia geografi acak`),
    answers: z.array(z.string()).describe(`
                berikan 4 kemungkinan jawaban, dalam urutan acak,
                di mana hanya satu yang benar.`),
    correctIndex: z.number().describe(`nomor index jawaban yang benar, indeks dimulai dari nol`),
  }
  const zodSchema = z.object(config)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parser = StructuredOutputParser.fromZodSchema(zodSchema as any)
  const model = createChatModel()

  //Buat template prompt yang mendukung pesan history
  const prompt = ChatPromptTemplate.fromMessages([
    ...chatHistory,
    [
      "user",
      `Jawab pertanyaan pengguna sebaik mungkin.\n
    {format_instructions}`,
    ],
  ])
  // definisikan chain baru dengan RunnableSequence
  const chain = RunnableSequence.from([prompt, model, parser])
  // mengembalikan JSON struktur yang ditentukan
  const userMessage = parser.getFormatInstructions()
  chatHistory.push(new HumanMessage(userMessage))

  const result = await chain.invoke({
    format_instructions: userMessage,
  })
  chatHistory.push(new AIMessage(JSON.stringify(result)))

  return result
}

export async function GET() {
  // const question = await makeQuestion()
  // const answers = await makePossibileAnswers(question)
  // return Response.json({ question, answers })

  const data = await makeQuestionAndAnswers()
  return Response.json({ data })
}
