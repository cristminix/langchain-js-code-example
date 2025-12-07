import * as dotenv from "dotenv"
import { createChatModel } from "../../app/global/fn/createChatModel"
import { BufferMemory, ChatMessageHistory, EntityMemory, BufferWindowMemory, ConversationSummaryMemory } from "@langchain/classic/memory"
import { ConversationChain } from "@langchain/classic/chains"
import { AIMessage, HumanMessage } from "@langchain/core/messages"

dotenv.config()

const main = async () => {
  try {
    // Inisialisasi model
    const model = createChatModel({
      temperature: 0.7,
    })

    // 1. Buffer Memory - Menyimpan seluruh percakapan
    console.log("=== Buffer Memory Example ===")

    const bufferMemory = new BufferMemory()
    const bufferChain = new ConversationChain({
      llm: model,
      memory: bufferMemory,
      verbose: true,
    })

    // Simulasi percakapan
    const response1 = await bufferChain.call({
      input: "Hai! Nama saya Budi. Saya sedang belajar tentang AI.",
    })
    console.log("AI:", response1.response)

    const response2 = await bufferChain.call({
      input: "Bisakah kamu ingat nama saya?",
    })
    console.log("AI:", response2.response)

    const response3 = await bufferChain.call({
      input: "Apa yang sedang saya pelajari?",
    })
    console.log("AI:", response3.response)

    // Melihat konten memory
    console.log("\nBuffer Memory Contents:")
    const bufferMemoryContents = await bufferMemory.loadMemoryVariables({})
    console.log(bufferMemoryContents)

    // 2. Conversation Buffer Window Memory - Menyimpan percakapan terakhir
    console.log("\n=== Conversation Buffer Window Memory Example ===")

    const windowMemory = new BufferWindowMemory({
      k: 2, // Menyimpan 2 percakapan terakhir
    })

    const windowChain = new ConversationChain({
      llm: model,
      memory: windowMemory,
      verbose: true,
    })
    process.exit()
    // Simulasi percakapan panjang
    await windowChain.call({ input: "Hai, saya Andi." })
    await windowChain.call({ input: "Saya tinggal di Jakarta." })
    await windowChain.call({ input: "Saya bekerja sebagai programmer." })
    await windowChain.call({ input: "Apakah kamu ingat nama saya?" }) // Hanya akan ingat 2 percakapan terakhir

    // Melihat konten window memory
    console.log("\nWindow Memory Contents:")
    const windowMemoryContents = await windowMemory.loadMemoryVariables({})
    console.log(windowMemoryContents)

    // 3. Conversation Summary Memory - Meringkas percakapan lama
    console.log("\n=== Conversation Summary Memory Example ===")
    const summaryMemory = new ConversationSummaryMemory({
      llm: model,
      memoryKey: "chat_history",
    })

    const summaryChain = new ConversationChain({
      llm: model,
      memory: summaryMemory,
      verbose: true,
    })

    // Simulasi percakapan
    await summaryChain.call({
      input: "Saya sedang merencanakan liburan ke Bali. Ada tempat menarik apa yang harus dikunjungi?",
    })
    await summaryChain.call({
      input: "Saya suka pantai dan aktivitas air. Apa ada rekomendasi?",
    })
    await summaryChain.call({
      input: "Bagaimana dengan kuliner di Bali? Ada makanan khas apa yang harus dicoba?",
    })

    // Melihat ringkasan percakapan
    console.log("\nSummary Memory Contents:")
    const summaryMemoryContents = await summaryMemory.loadMemoryVariables({})
    console.log(summaryMemoryContents)

    // 4. Custom Memory dengan ChatMessageHistory
    console.log("\n=== Custom Memory with ChatMessageHistory Example ===")

    const messageHistory = new ChatMessageHistory([
      new HumanMessage("Hai, saya Citra. Saya adalah desainer grafis."),
      new AIMessage("Hai Citra! Senang bertemu dengan Anda. Sebagai desainer grafis, bidang apa yang paling Anda sukai?"),
      new HumanMessage("Saya lebih fokus pada desain UI/UX untuk aplikasi mobile."),
      new AIMessage("Menarik! UI/UX untuk mobile adalah bidang yang sangat relevan saat ini. Apakah Anda sedang mengerjakan proyek tertentu?"),
    ])

    const customMemory = new BufferMemory({
      chatHistory: messageHistory,
    })

    const customChain = new ConversationChain({
      llm: model,
      memory: customMemory,
      verbose: true,
    })

    const customResponse = await customChain.call({
      input: "Bisakah kamu ingat profesi saya dan bidang fokus saya?",
    })
    console.log("AI:", customResponse.response)

    // 5. Entity Memory - Mengingat entitas spesifik
    console.log("\n=== Entity Memory Example ===")

    const entityMemory = new EntityMemory({
      llm: model,
    })

    const entityChain = new ConversationChain({
      llm: model,
      memory: entityMemory,
      verbose: true,
    })

    // Simulasi percakapan dengan entitas
    await entityChain.call({
      input: "Saya Rina dan saya bekerja di perusahaan teknologi bernama TechInnovate.",
    })
    await entityChain.call({
      input: "Perusahaan saya berlokasi di Jakarta dan memiliki 500 karyawan.",
    })
    await entityChain.call({
      input: "Di mana saya bekerja dan berapa banyak karyawan di sana?",
    })

    // Melihat entitas yang diingat
    console.log("\nEntity Memory Contents:")
    const entityMemoryContents = await entityMemory.loadMemoryVariables({})
    console.log(entityMemoryContents)
  } catch (error) {
    console.error("Error:", error)
  }
}
main().catch((e) => console.error(e))
