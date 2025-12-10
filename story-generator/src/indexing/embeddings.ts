import * as dotenv from "dotenv"
import { createChatModel } from "@/app/global/fn/createChatModel"
import { OllamaEmbeddings } from "@langchain/ollama"

dotenv.config()

export const run = async () => {
  /* Embed query from the user */
  const embeddings = new OllamaEmbeddings({
    // model: "nomic-embed-text",
    model: "all-minilm:l6-v2",

    // You can also specify other options like baseUrl if needed, e.g.,
    baseUrl: "http://localhost:11434",
  })
  const res = await embeddings.embedQuery("Hello world")
  console.log("query vector", res)

  //
  /* Embed documents (converts your text/data to numbers) */
  const documentRes = await embeddings.embedDocuments(["Hello world", "Bye bye"])
  console.log({ documentRes })
}

run().catch((e) => console.error(e))
