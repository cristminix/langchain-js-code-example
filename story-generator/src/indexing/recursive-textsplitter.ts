import * as dotenv from "dotenv"
import { createChatModel } from "@/app/global/fn/createChatModel"
import { OllamaEmbeddings } from "@langchain/ollama"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"

dotenv.config()

export const run = async () => {
  const text = `Hi. \n\nI'm Harrison. \n\nHow? Are? You?\nOkay then f f f. 
This is a weird text to write, but gotta test the splittingggg some how. \n\n
Bye! \n\nN-H. `

  /**
   * Recursivecharactertextsplitter splits a document "recursively" using '\n\n'
   * then "\n" and finally " "
   * It helps to ensure that chunks maintain relevancy.
   */
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 10, //max size(chars) of docs chunk
    chunkOverlap: 1, //how much overlap between chunks
  })

  const output = await splitter.createDocuments([text])
  console.log(output)
}

run().catch((e) => console.error(e))
