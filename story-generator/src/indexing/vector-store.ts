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
    const text = await fs.readFileSync("large-text.txt", "utf8")

    // split text into chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 500, // Mengurangi ukuran chunk agar tidak melebihi batas konteks
      chunkOverlap: 50, // Menambah overlap untuk menjaga kontinuitas konteks
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
      model: "nomic-embed-text", // Model ini memberikan 1024 dimensi sesuai dengan indeks Pinecone

      // You can also specify other options like baseUrl if needed, e.g.,
      baseUrl: "http://localhost:11434",
    })
    // Proses dokumen dengan batch untuk menghindari batas maksimum konteks
    await addDocumentsInBatches(docs, 10) // Batch dengan ukuran 10 dokumen per batch
    // Fungsi untuk membagi dokumen menjadi batch dan memprosesnya
    async function addDocumentsInBatches(
      documents: Document[],
      batchSize: number
    ): Promise<void> {
      for (let i = 0; i < documents.length; i += batchSize) {
        const batch = documents.slice(i, i + batchSize)
        try {
          await addDocuments(batch)
        } catch (error) {
          console.error(`Error processing batch ${i / batchSize}:`, error)
          throw error
        }
      }
    }

    // embeddings functions
    async function addDocuments(
      documents: Document[],
      ids?: string[]
    ): Promise<void> {
      const texts = documents.map(({ pageContent }) => pageContent)

      // Embed dokumen satu per satu jika terjadi error batch
      try {
        return addVectors(
          await embeddings.embedDocuments(texts),
          documents,
          ids
        )
      } catch (batchError) {
        console.warn(
          "Batch embedding failed, attempting individual embeddings:",
          batchError
        )
        // Jika batch gagal, coba embed dokumen satu per satu
        const vectors: number[][] = []

        for (const text of texts) {
          try {
            const vector = await embeddings.embedQuery(text)
            vectors.push(vector)
          } catch (individualError) {
            console.error(
              "Failed to embed individual document:",
              individualError
            )
            // Lewati dokumen yang gagal diembed
            continue
          }
        }

        // Sesuaikan jumlah dokumen dengan jumlah vektor yang berhasil dibuat
        const validDocuments = documents.filter(
          (_, idx) => idx < vectors.length
        )
        return addVectors(vectors, validDocuments, ids)
      }
    }

    async function addVectors(
      vectors: number[][],
      documents: Document[],
      ids?: string[]
    ): Promise<void> {
      // Sesuaikan dimensi vektor ke 1024 (dimensi dari indeks Pinecone)
      // Jika vektor memiliki dimensi kurang dari 1024, tambahkan nilai 0
      // Jika vektor memiliki dimensi lebih dari 1024, potong menjadi 1024
      const adjustedVectors = vectors.map((vector) => {
        if (vector.length < 1024) {
          // Tambahkan nilai 0 hingga mencapai 1024 dimensi
          return [...vector, ...Array(1024 - vector.length).fill(0)]
        } else if (vector.length > 1024) {
          // Potong vektor ke 1024 dimensi
          return vector.slice(0, 1024)
        } else {
          // Jika sudah 1024, kembalikan seperti semula
          return vector
        }
      })

      //create the pinecone upsert object per vector
      const upsertRequest = adjustedVectors.map((values, idx) => ({
        id: ids ? ids[idx] : `${idx}`,
        metadata: {
          text: documents[idx].pageContent,
        },
        values,
      }))

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
