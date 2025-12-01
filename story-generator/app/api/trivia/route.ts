import { PromptTemplate } from "langchain/prompts"
import {
  CommaSeparatedListOutputParser,
  StringOutputParser,
  StructuredOutputParser,
} from "langchain/schema/output_parser"
import { createChatModel } from "../../global/fn/createChatModel"
import { z, ZodString, ZodArray, ZodNumber } from "zod"
import { RunnableSequence } from "langchain/runnables"

type TriviaConfig = {
  question: ZodString
  answers: ZodArray<ZodString>
  correctIndex: ZodNumber
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
// menggunakan StructuredOutputParser kita sekarang dapat membungkus semua
// data ke dalam satu struktur tunggal

const makeQuestionAndAnswers = async () => {
  // Zod digunakan untuk mendefinisikan apakah suatu bidang adalah string, angka, array, dll
  const config: TriviaConfig = {
    question: z
      .string()
      .describe(`berikan saya pertanyaan trivia geografi acak`),
    answers: z.array(z.string()).describe(`
                berikan 4 kemungkinan jawaban, dalam urutan acak,
                di mana hanya satu yang benar.`),
    correctIndex: z.number().describe(`nomor jawaban yang benar, indeks nol`),
  }
  const zodSchema = z.object(config)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parser = StructuredOutputParser.fromZodSchema(zodSchema as any)
  const model = createChatModel()
  // definisikan chain baru dengan RunnableSequence
  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
      `Buatkan satu pertanyaan trivia geografi acak beserta 4 pilihan jawaban (3 salah dan 1 benar) dalam urutan acak dan nomor jawaban yang benar (indeks nol).
      
      {format_instructions}`
    ),

    model,

    parser,
  ])
  // mengembalikan JSON struktur yang ditentukan
  return await chain.invoke({
    format_instructions: parser.getFormatInstructions(),
  })
}

export async function GET() {
  // const question = await makeQuestion()
  // const answers = await makePossibileAnswers(question)
  // return Response.json({ question, answers })

  const data = await makeQuestionAndAnswers()

  return Response.json(data)
}
