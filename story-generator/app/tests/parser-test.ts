import { CommaSeparatedListOutputParser } from "langchain/output_parsers"
import { createChatModel } from "../global/fn/createChatModel"
import { PromptTemplate } from "langchain/prompts"
import { RunnableSequence } from "langchain/runnables"
import dotenv from "dotenv"
dotenv.config()
async function main() {
  const parser = new CommaSeparatedListOutputParser()
  console.log(parser.getFormatInstructions())

  const commaListOutputParser = new CommaSeparatedListOutputParser()
  const chain = RunnableSequence.from([
    PromptTemplate.fromTemplate(
      `Berikan saya 3 {topic}.\n{formatInstructions}`
    ),
    createChatModel(),
    parser,
  ])
  const result = await chain.invoke({
    topic: "merek mobil",
    formatInstructions: commaListOutputParser.getFormatInstructions(),
  })

  console.log(result)
}

main().catch((e) => console.error(e))
