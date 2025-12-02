import { createChatModel } from "@/app/global/fn/createChatModel"
import { ChatPromptTemplate, MessagesPlaceholder } from "langchain/prompts"
import { HumanMessage } from "langchain/schema"
import { StringOutputParser } from "langchain/schema/output_parser"

const model = createChatModel()

const chatHistory = [new HumanMessage(`Minuman favorit saya adalah teh.`)]

const prompt = ChatPromptTemplate.fromMessages([
  // Kita perlu memberi tahu prompt bahwa ia akan memiliki memori
  new MessagesPlaceholder("chat_history"),

  ["human", "{input}"],
])
const outputParser = new StringOutputParser()

const chain = prompt.pipe(model).pipe(outputParser)

export async function POST() {
  const question = `Beritahu fakta tentang minuman favorit saya dalam 250 karakter.`

  const fact = await chain.invoke({
    input: question,
    // Hubungkan array chatHistory dengan prompt
    chat_history: chatHistory,
  })

  return Response.json({ data: fact })
}
