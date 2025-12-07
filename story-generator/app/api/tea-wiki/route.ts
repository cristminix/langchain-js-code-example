import { createChatModel } from "@/app/global/fn/createChatModel"
import { ChatPromptTemplate } from "@langchain/core/prompts"
import { AIMessage, HumanMessage } from "@langchain/core/messages"
import { StringOutputParser } from "@langchain/core/output_parsers"

const model = createChatModel()

const chatHistory: (HumanMessage | AIMessage)[] = [new HumanMessage(`tanaman favorit saya adalah jarak.`)]

const prompt = ChatPromptTemplate.fromMessages([
  // Kita perlu memberi tahu prompt bahwa ia akan memiliki memori
  ["placeholder", "chat_history"],

  ["human", "{input}"],
])
const outputParser = new StringOutputParser()

const chain = prompt.pipe(model).pipe(outputParser)

export async function POST() {
  const question = `Beritahu fakta manfaat tanaman favorit saya dalam 250 karakter. Jangan ulangi fakta sebelumnya.`
  chatHistory.push(new HumanMessage(question))
  console.log(chatHistory)
  const fact = await chain.invoke({
    // configurable: {
    //   sessionId: "123456",
    // },
    input: question,
    // Hubungkan array chatHistory dengan prompt
    chat_history: chatHistory,
  })
  // Simpan setiap fakta agar LLM tahu apa yang tidak boleh diulang

  chatHistory.push(new AIMessage(fact))

  return Response.json({ data: fact })
}
