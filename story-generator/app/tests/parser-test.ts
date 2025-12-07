import { CommaSeparatedListOutputParser } from "@langchain/core/output_parsers"
import { createChatModel } from "../global/fn/createChatModel"
import { PromptTemplate } from "@langchain/core/prompts"
import { RunnableSequence } from "@langchain/core/runnables"
import * as dotenv from "dotenv"
dotenv.config()
async function main() {
  const parser = new CommaSeparatedListOutputParser()
  console.log(parser.getFormatInstructions())

  const commaListOutputParser = new CommaSeparatedListOutputParser()
  const chain = RunnableSequence.from([PromptTemplate.fromTemplate(`Berikan saya 3 {topic}.\n{formatInstructions}`), createChatModel(), commaListOutputParser])
  const result = await chain.invoke({
    topic: "merek mobil",
    formatInstructions: commaListOutputParser.getFormatInstructions(),
  })

  console.log(result)
}

main().catch((e) => console.error(e))
