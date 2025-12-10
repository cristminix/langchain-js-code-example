import { createChatModel } from "@/app/global/fn/createChatModel"
import { OllamaEmbeddings } from "@langchain/ollama"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { Document } from "@langchain/core/documents"
import { Pinecone } from "@pinecone-database/pinecone"
import * as fs from "fs"
import * as dotenv from "dotenv"

dotenv.config()
const pinecone = new Pinecone()

export const run = async () => {
  try {
    //initialize the vectorstore to store embeddings
    // Pinecone v6+ automatically reads from environment variables
    // or you can pass the apiKey directly: new Pinecone({ apiKey: process.env.PINECONE_API_KEY })

    // initialize LLM to answer the question
    // initialize LLM to answer the question
    const model = createChatModel()

    // Load file that we want to ask questions from
    const text = fs.readFileSync(require.resolve("../state_of_the_union.txt"), "utf8")

    // split text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
    })

    // create document objects of text
    const docs = await textSplitter.createDocuments([text])

    //retrieve API operations for index created in pinecone dashboard
    const index = pinecone.Index("langchainjsfundamentals")

    /*
create embeddings to extract text from document and send to openAI for embeddings then
add vectors to pinecone for storage
*/
    /* Embed query from the user */
    const embeddings = new OllamaEmbeddings({
      // model: "nomic-embed-text",
      model: "all-minilm:l6-v2",

      // You can also specify other options like baseUrl if needed, e.g.,
      baseUrl: "http://localhost:11434",
    })
    await addDocuments(docs)

    // embeddings functions
    async function addDocuments(documents: Document[], ids?: string[]): Promise<void> {
      const texts = documents.map(({ pageContent }) => pageContent)
      return addVectors(await embeddings.embedDocuments(texts), documents, ids)
    }

    async function addVectors(vectors: number[][], documents: Document[], ids?: string[]): Promise<void> {
      //create the pinecone upsert object per vector
      const upsertRequest = {
        vectors: vectors.map((values, idx) => ({
          id: ids ? ids[idx] : `${idx}`,
          metadata: {
            ...documents[idx].metadata,
            text: documents[idx].pageContent,
          },
          values,
        })),
      }

      // Execute the upsert operation
      await index.upsert(upsertRequest)
    }

    /*check your pinecone index dashboard to verify insertion
run the code below to check your indexstats. You should see the new "namespace"
*/
    const indexData = await index.describeIndexStats()
    console.log("indexData", indexData)
  } catch (error) {
    console.log("error", error)
  }
}
run().catch((e) => console.error(e))
