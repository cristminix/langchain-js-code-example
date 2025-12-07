import { Calculator } from "@langchain/community/tools/calculator"
import { GoogleCustomSearch } from "@langchain/community/tools/google_custom_search"
import { initializeAgentExecutorWithOptions } from "@langchain/classic/agents"
import * as dotenv from "dotenv"
import { createChatModel } from "@/app/global/fn/createChatModel"

dotenv.config()

const main = async () => {
  const model = createChatModel({ temperature: 0.1 })
  try {
    // Inisialisasi tools
    const tools = [
      new GoogleCustomSearch({
        apiKey: process.env.GOOGLE_API_KEY,
        googleCSEId: process.env.GOOGLE_CSE_ID,
      }),
      new Calculator(),
    ]

    // Inisialisasi agent dengan tools
    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: "zero-shot-react-description",
      verbose: true,
    })

    console.log("Loaded agent.")

    const input = "Berapa total jumlah negara di Afrika pangkat tiga?"

    console.log(`Mengeksekusi dengan input "${input}"...`)

    const result = await executor.invoke({ input })

    console.log(`Hasil akhir: ${result.output}`)
  } catch (error) {
    console.error("Error:", error)
  }
}

main().catch((e) => console.error(e))
