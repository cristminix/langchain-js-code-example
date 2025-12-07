import { createChatModel } from "../../app/global/fn/createChatModel"
import * as dotenv from "dotenv"
import { PromptTemplate } from "@langchain/core/prompts"
dotenv.config()
const main = async () => {
  const model = createChatModel({ temperature: 0.1 })
  const template = "What is the capital city of {country}?"
  const prompt = new PromptTemplate({
    inputVariables: ["country"],
    template,
  })
  const inputPrompt = await prompt.format({
    country: "France",
  })
  let res = await model.invoke(inputPrompt)
  console.log(res.content)
}

main().catch((e) => console.error(e))
