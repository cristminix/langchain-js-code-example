import { ConversationChain } from "@langchain/classic/chains"
import { BufferMemory } from "@langchain/classic/memory"
import * as dotenv from "dotenv"
import { createChatModel } from "@/app/global/fn/createChatModel"

dotenv.config()
export const run = async () => {
  const model = createChatModel()

  //buffer memory remembers previous conversational back and forth directly
  const memory = new BufferMemory()
  const chain = new ConversationChain({ llm: model, memory: memory })

  const firstResponse = await chain.call({ input: "Halo, Saya John." })
  console.log(firstResponse)
  // {response: " Hi John! It's nice to meet you. My name is AI. What can I help you with?"}

  const secondResponse = await chain.call({ input: "Siapa nama saya?" })
  console.log(secondResponse)

  // {response: ' You said your name is John. Is there anything else you would like to talk about?'}
}

run().catch((e) => console.error(e))
