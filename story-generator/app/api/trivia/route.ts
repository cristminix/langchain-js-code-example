import { PromptTemplate } from "langchain/prompts"
import {
  CommaSeparatedListOutputParser,
  StringOutputParser,
} from "langchain/schema/output_parser"
import { createChatModel } from "../../global/fn/createChatModel"
import { delay } from "@/app/global/fn/delay"

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
  await delay(5000)
  const answers = await makePossibileAnswers(question)
  return Response.json({ question, answers })
}
