import { config } from "dotenv"
import { OpenAIEmbeddings } from "@langchain/openai"

// Load environment variables from .env file
config()

const run = async () => {
  try {
    // Inisialisasi embeddings model
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
      },
      modelName: process.env.OPENAI_MODEL,
    })

    // Embedding teks sederhana
    const text = "Hello world"
    const textEmbedding = await embeddings.embedQuery(text)

    console.log(`Teks: "${text}"`)
    console.log(`Dimensi embedding: ${textEmbedding.length}`)
    console.log(`5 nilai pertama: [${textEmbedding.slice(0, 5).join(", ")}...]`)

    // Embedding dokumen (dengan metadata)
    const documents = [
      { pageContent: "Jakarta adalah ibu kota Indonesia.", metadata: { source: "doc1" } },
      { pageContent: "Surabaya adalah kota terbesar kedua di Indonesia.", metadata: { source: "doc2" } },
      { pageContent: "Bandung adalah kota yang terkenal dengan fashion dan kuliner.", metadata: { source: "doc3" } },
    ]

    // Embedding dokumen
    const docEmbeddings = await embeddings.embedDocuments(documents.map((doc) => doc.pageContent))

    console.log("\nEmbedding Dokumen:")
    documents.forEach((doc, i) => {
      console.log(`Dokumen ${i + 1}: "${doc.pageContent}"`)
      console.log(`Dimensi: ${docEmbeddings[i].length}`)
      console.log(`5 nilai pertama: [${docEmbeddings[i].slice(0, 5).join(", ")}...]`)
      console.log("---")
    })

    // Menghitung similarity antara query dan dokumen
    const query = "Apa ibu kota Indonesia?"
    const queryEmbedding = await embeddings.embedQuery(query)

    console.log(`\nQuery: "${query}"`)
    console.log(`Dimensi: ${queryEmbedding.length}`)

    // Fungsi untuk menghitung cosine similarity
    function cosineSimilarity(vecA: number[], vecB: number[]): number {
      let dotProduct = 0
      let normA = 0
      let normB = 0

      for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i]
        normA += vecA[i] * vecA[i]
        normB += vecB[i] * vecB[i]
      }

      return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
    }

    // Menghitung similarity dengan setiap dokumen
    console.log("\nSimilarity dengan dokumen:")
    docEmbeddings.forEach((docEmbedding, i) => {
      const similarity = cosineSimilarity(queryEmbedding, docEmbedding)
      console.log(`Dokumen ${i + 1}: ${similarity.toFixed(4)}`)
    })
  } catch (error) {
    console.error("Error:", error)
  }
}
run().catch((e) => console.error(e))
