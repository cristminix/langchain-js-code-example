// src/text-splitting-example.ts
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"
import { CharacterTextSplitter } from "@langchain/textsplitters"

async function main() {
  try {
    // Contoh teks panjang
    const longText = `
    Jakarta adalah ibu kota Indonesia dan kota terbesar di Indonesia. Jakarta terletak di pesisir bagian barat laut Pulau Jawa.
    Jakarta memiliki luas sekitar 662 kilometer persegi dan penduduknya berjumlah lebih dari 10 juta orang pada siang hari dan lebih dari 17 juta orang pada malam hari.
    
    Sebagai pusat bisnis, politik, dan kebudayaan, Jakarta menarik banyak pendatang dari seluruh Indonesia. Jakarta juga merupakan kota dengan tingkat urbanisasi tertinggi di Indonesia.
    
    Sejarah Jakarta dimulai pada abad ke-4 ketika kota ini dikenal sebagai Sunda Kelapa. Pada abad ke-16, Portugis datang dan mengubah nama kota menjadi Jayakarta.
    
    Pada abad ke-17, VOC Belanda merebut kota ini dan mengubah namanya menjadi Batavia. Setelah kemerdekaan Indonesia, nama kota ini diubah kembali menjadi Jakarta.
    
    Saat ini, Jakarta dibagi menjadi enam kota administratif dan satu kabupaten administratif, yaitu Jakarta Pusat, Jakarta Utara, Jakarta Barat, Jakarta Selatan, Jakarta Timur, Kepulauan Seribu, dan Kabupaten Administrasi Kepulauan Seribu.
    `

    // Membuat text splitter dengan RecursiveCharacterTextSplitter
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 200, // Ukuran setiap chunk dalam karakter
      chunkOverlap: 20, // Jumlah karakter yang tumpang tindih antar chunk
      separators: ["\n\n", "\n", " ", ""], // Pemisah yang digunakan
    })

    // Memecah teks menjadi chunks
    const chunks = await splitter.createDocuments([longText])

    console.log(`Teks asli memiliki ${longText.length} karakter`)
    console.log(`Teks dibagi menjadi ${chunks.length} chunks:\n`)

    chunks.forEach((chunk, i) => {
      console.log(`Chunk ${i + 1}:`)
      console.log(`Panjang: ${chunk.pageContent.length} karakter`)
      console.log(`Isi: "${chunk.pageContent.trim()}"`)
      console.log("---")
    })

    // Contoh dengan CharacterTextSplitter

    const characterSplitter = new CharacterTextSplitter({
      separator: "\n", // Memisahkan berdasarkan baris baru
      chunkSize: 100,
      chunkOverlap: 0,
    })

    const characterChunks = await characterSplitter.createDocuments([longText])

    console.log("\nMenggunakan CharacterTextSplitter:")
    console.log(`Teks dibagi menjadi ${characterChunks.length} chunks:\n`)

    characterChunks.forEach((chunk, i) => {
      console.log(`Chunk ${i + 1}:`)
      console.log(`Isi: "${chunk.pageContent.trim()}"`)
      console.log("---")
    })
  } catch (error) {
    console.error("Error:", error)
  }
}

main().catch((e) => console.error(e))
