import { OpenAIEmbeddings } from "@langchain/openai"
import { FaissStore } from "@langchain/community/vectorstores/faiss"
import { Chroma } from "@langchain/community/vectorstores/chroma"
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { Document } from "@langchain/core/documents"
import fs from "fs"
import { config } from "dotenv"

// Load environment variables from .env file
config()
async function main() {
  try {
    // Inisialisasi embeddings
    // Inisialisasi embeddings model
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
      configuration: {
        baseURL: process.env.OPENAI_BASE_URL,
      },
      modelName: process.env.OPENAI_MODEL,
    })
    // Contoh dokumen
    const documents = [
      new Document({
        pageContent: "JavaScript adalah bahasa pemrograman tingkat tinggi yang dinamis dan ditafsirkan.",
        metadata: { source: "programming_guide", category: "javascript" },
      }),
      new Document({
        pageContent: "TypeScript adalah superset dari JavaScript yang menambahkan tipe statis.",
        metadata: { source: "programming_guide", category: "typescript" },
      }),
      new Document({
        pageContent: "React adalah library JavaScript untuk membangun antarmuka pengguna.",
        metadata: { source: "web_development", category: "react" },
      }),
      new Document({
        pageContent: "Node.js memungkinkan JavaScript berjalan di server-side.",
        metadata: { source: "backend_development", category: "nodejs" },
      }),
      new Document({
        pageContent: "Python adalah bahasa pemrograman yang populer untuk data science dan machine learning.",
        metadata: { source: "data_science", category: "python" },
      }),
    ]

    console.log("=== FaissStore Example (Vector Store Lokal) ===")

    // 1. FaissStore - Vector store lokal
    console.log("\n1. Membuat FaissStore...")

    // Membuat vector store dari dokumen
    const faissStore = await FaissStore.fromDocuments(documents, embeddings)

    // Simpan vector store ke disk
    const faissStorePath = "./faiss-store"
    await faissStore.save(faissStorePath)
    console.log(`FaissStore disimpan ke ${faissStorePath}`)

    // Muat kembali vector store dari disk
    const loadedFaissStore = await FaissStore.load(faissStorePath, embeddings)
    console.log("FaissStore berhasil dimuat dari disk")

    // Similarity search
    console.log("\n2. Similarity Search dengan FaissStore:")
    const query = "bahasa pemrograman untuk web"
    const faissResults = await loadedFaissStore.similaritySearch(query, 3)

    console.log(`Query: "${query}"`)
    console.log("Hasil similarity search:")
    faissResults.forEach((doc, i) => {
      console.log(`${i + 1}. ${doc.pageContent}`)
      console.log(`   Metadata:`, doc.metadata)
    })

    // Similarity search dengan skor
    console.log("\n3. Similarity Search dengan Skor:")
    const faissResultsWithScore = await loadedFaissStore.similaritySearchWithScore(query, 3)

    faissResultsWithScore.forEach(([doc, score], i) => {
      console.log(`${i + 1}. Skor: ${score.toFixed(4)}`)
      console.log(`   Konten: ${doc.pageContent}`)
      console.log(`   Metadata:`, doc.metadata)
    })

    // Maximum marginal relevance search
    console.log("\n4. Maximum Marginal Relevance Search:")
    try {
      const mmrResults = await loadedFaissStore.maxMarginalRelevanceSearch?.(
        query,
        {
          k: 3,
          fetchK: 10, // Ambil 10 dokumen lalu pilih 3 yang paling relevan dan beragam
        },
        undefined
      )

      if (mmrResults) {
        console.log("Hasil MMR search:")
        mmrResults.forEach((doc, i) => {
          console.log(`${i + 1}. ${doc.pageContent}`)
          console.log(`   Metadata:`, doc.metadata)
        })
      } else {
        console.log("maxMarginalRelevanceSearch tidak tersedia untuk FaissStore")
      }
    } catch (error) {
      console.log("maxMarginalRelevanceSearch tidak didukung atau terjadi error:", error)
    }

    console.log("\n=== Chroma Vector Store Example ===")

    // 2. Chroma - Vector store dengan persistensi
    console.log("\n1. Membuat Chroma Vector Store...")

    // Membuat collection Chroma
    const chromaCollectionName = "programming_docs"
    const chromaStore = await Chroma.fromDocuments(documents, embeddings, {
      collectionName: chromaCollectionName,
      url: "http://localhost:8000", // URL Chroma server (jika running)
    })

    // Alternative: menggunakan Chroma secara lokal tanpa server
    // const chromaStore = await Chroma.fromDocuments(
    //   documents,
    //   embeddings,
    //   {
    //     collectionName: chromaCollectionName,
    //     path: "./chroma_db", // Path untuk menyimpan database
    //   }
    // )

    console.log("Chroma Vector Store berhasil dibuat")

    // Similarity search dengan Chroma
    console.log("\n2. Similarity Search dengan Chroma:")
    const chromaResults = await chromaStore.similaritySearch(query, 3)

    console.log(`Query: "${query}"`)
    console.log("Hasil similarity search:")
    chromaResults.forEach((doc, i) => {
      console.log(`${i + 1}. ${doc.pageContent}`)
      console.log(`   Metadata:`, doc.metadata)
    })

    // Filter berdasarkan metadata
    console.log("\n3. Filter berdasarkan Metadata:")
    const filteredResults = await chromaStore.similaritySearch("JavaScript", 2, {
      category: "javascript",
    })

    console.log("Hasil filter (category: javascript):")
    filteredResults.forEach((doc, i) => {
      console.log(`${i + 1}. ${doc.pageContent}`)
      console.log(`   Metadata:`, doc.metadata)
    })

    console.log("\n=== Advanced Vector Store Operations ===")

    // 3. Advanced operations
    console.log("\n1. Menambahkan dokumen baru ke vector store:")

    const newDoc = new Document({
      pageContent: "Vue.js adalah framework JavaScript progresif untuk membangun UI.",
      metadata: { source: "web_development", category: "vuejs" },
    })

    await loadedFaissStore.addDocuments([newDoc])
    console.log("Dokumen baru berhasil ditambahkan")

    // Verifikasi dengan search
    const newResults = await loadedFaissStore.similaritySearch("Vue.js framework", 1)
    console.log("Hasil search untuk dokumen baru:")
    newResults.forEach((doc, i) => {
      console.log(`${i + 1}. ${doc.pageContent}`)
      console.log(`   Metadata:`, doc.metadata)
    })

    // 4. Menghapus dokumen (jika didukung)
    console.log("\n2. Menghapus dokumen dari vector store:")

    // Note: FaissStore tidak mendukung penghapusan dokumen individual
    // Chroma mendukung penghapusan dengan ID
    console.log("Penghapusan dokumen tersedia di Chroma tapi tidak di FaissStore")

    // 5. Embedding dan search manual
    console.log("\n3. Manual Embedding dan Search:")

    const queryText = "backend development dengan JavaScript"
    const queryEmbedding = await embeddings.embedQuery(queryText)

    console.log(`Query: "${queryText}"`)
    console.log(`Dimensi embedding: ${queryEmbedding.length}`)
    console.log(
      `5 nilai pertama: [${queryEmbedding
        .slice(0, 5)
        .map((x) => x.toFixed(6))
        .join(", ")}...]`
    )

    // 6. Performance comparison
    console.log("\n4. Performance Comparison:")

    const testQueries = ["JavaScript programming", "web development framework", "server-side JavaScript", "data science programming"]

    console.log("Membandingkan performa search...")

    for (const testQuery of testQueries) {
      const startTime = Date.now()
      await loadedFaissStore.similaritySearch(testQuery, 2)
      const endTime = Date.now()

      console.log(`Query: "${testQuery}" - Waktu: ${endTime - startTime}ms`)
    }

    // Cleanup
    console.log("\n5. Cleanup:")

    // Hapus file yang dibuat
    if (fs.existsSync(faissStorePath)) {
      fs.rmSync(faissStorePath, { recursive: true, force: true })
      console.log("FaissStore files deleted")
    }
  } catch (error) {
    console.error("Error:", error)
  }
}

main().catch((e) => console.error(e))
