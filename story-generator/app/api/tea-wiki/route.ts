import { createChatModel } from "@/app/global/fn/createChatModel"
import { ChatPromptTemplate } from "langchain/prompts"
import { StringOutputParser } from "langchain/schema/output_parser"

const model = createChatModel()

const prompt = ChatPromptTemplate.fromMessages([["human", "{input}"]])

const outputParser = new StringOutputParser()

const chain = prompt.pipe(model).pipe(outputParser)

export async function POST() {
  const question = `Beritahu fakta tentang minuman favorit saya.`

  const fact = await chain.invoke({
    input: question,
  })

  return Response.json({ data: fact })
}
