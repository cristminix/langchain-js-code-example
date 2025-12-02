import { z } from "zod"
import { StructuredOutputParser } from "langchain/schema/output_parser"
import { createChatModel } from "../global/fn/createChatModel"
import { PromptTemplate } from "langchain/prompts"
import { RunnableSequence } from "langchain/runnables"
import dotenv from "dotenv"
dotenv.config()
type TriviaConfig = {
  question: z.ZodString
  options: z.ZodArray<z.ZodString>
  correct_answer_index: z.ZodNumber
}

async function testTrivia() {
  const config: TriviaConfig = {
    question: z
      .string()
      .describe(`berikan saya pertanyaan trivia geografi acak`),
    options: z.array(z.string()).describe(`
                berikan 4 kemungkinan jawaban, dalam urutan acak,
                di mana hanya satu yang benar.`),
    correct_answer_index: z
      .number()
      .describe(`nomor jawaban yang benar, indeks nol`),
  }
  const zodSchema = z.object(config)
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const parser = StructuredOutputParser.fromZodSchema(zodSchema as any)
  const model = createChatModel()

  console.log("Format Instructions:")
  console.log(parser.getFormatInstructions())

  // definisikan chain baru dengan RunnableSequence
  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
      `Jawab pertanyaan pengguna sebaik mungkin.\n
      {format_instructions}`
    ),

    model,

    parser,
  ])

  try {
    const result = await chain.invoke({
      format_instructions: parser.getFormatInstructions(),
    })

    console.log("\nResult:")
    console.log(JSON.stringify(result, null, 2))
  } catch (error) {
    console.error("\nError:", error)
  }
}

testTrivia().catch(console.error)
