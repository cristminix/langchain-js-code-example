import { createChatModel } from "@/app/global/fn/createChatModel"
import dotenv from "dotenv"
import { LLMChain } from "langchain/chains"
import { PromptTemplate } from "langchain/prompts"
dotenv.config()
const run = async () => {
  const model = createChatModel({ temperature: 0.1 })
  const template = "What is the capital city of {country}?"
  const prompt = new PromptTemplate({
    inputVariables: ["country"],
    template,
  })
  const chain = prompt.pipe(model)
  let res = await chain.invoke({
    country: "France",
  })
  console.log(res.content)
}

run().catch((e) => console.error(e))
