import { OllamaEmbeddings } from "@langchain/ollama"
import { config } from "dotenv"

// Load environment variables from .env file
config()

const run = async () => {
  try {
    console.time("Total Execution Time")

    // Inisialisasi embeddings model
    console.time("Model Initialization")
    const embeddings = new OllamaEmbeddings({
      model: "all-minilm:l6-v2",
      // You can also specify other options like baseUrl if needed, e.g.,
      baseUrl: "http://localhost:11434",
    })
    console.timeEnd("Model Initialization")

    // Embedding teks sederhana
    console.time("Single Text Embedding")
    const text = "Hello world"
    const textEmbedding = await embeddings.embedQuery(text)
    console.timeEnd("Single Text Embedding")

    console.log(`Teks: "${text}"`)
    console.log(`Dimensi embedding: ${textEmbedding.length}`)
    console.log(`5 nilai pertama: [${textEmbedding.slice(0, 5).join(", ")}...]`)

    // Embedding dokumen (dengan metadata)
    const documents = [
      {
        pageContent: "Jakarta adalah ibu kota Indonesia.",
        metadata: { source: "doc1" },
      },
      {
        pageContent: "Surabaya adalah kota terbesar kedua di Indonesia.",
        metadata: { source: "doc2" },
      },
      {
        pageContent:
          "Bandung adalah kota yang terkenal dengan fashion dan kuliner.",
        metadata: { source: "doc3" },
      },
    ]

    // Embedding dokumen
    console.time("Document Embeddings")
    const docEmbeddings = await embeddings.embedDocuments(
      documents.map((doc) => doc.pageContent)
    )
    console.timeEnd("Document Embeddings")

    console.log("\nEmbedding Dokumen:")
    documents.forEach((doc, i) => {
      console.log(`Dokumen ${i + 1}: "${doc.pageContent}"`)
      console.log(`Dimensi: ${docEmbeddings[i].length}`)
      console.log(
        `5 nilai pertama: [${docEmbeddings[i].slice(0, 5).join(", ")}...]`
      )
      console.log("---")
    })

    // Menghitung similarity antara query dan dokumen
    console.time("Query Embedding")
    const query = "Apa ibu kota Indonesia?"
    const queryEmbedding = await embeddings.embedQuery(query)
    console.timeEnd("Query Embedding")

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
    console.time("Similarity Calculations")
    console.log("\nSimilarity dengan dokumen:")
    docEmbeddings.forEach((docEmbedding, i) => {
      const similarity = cosineSimilarity(queryEmbedding, docEmbedding)
      console.log(`Dokumen ${i + 1}: ${similarity.toFixed(4)}`)
    })
    console.timeEnd("Similarity Calculations")

    console.timeEnd("Total Execution Time")
  } catch (error) {
    console.error("Error:", error)
  }
}
run().catch((e) => console.error(e))
