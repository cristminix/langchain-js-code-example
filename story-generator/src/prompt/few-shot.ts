import { createChatModel } from "@/app/global/fn/createChatModel"
import * as dotenv from "dotenv"
import { FewShotPromptTemplate, PromptTemplate } from "@langchain/core/prompts"
dotenv.config()
const main = async () => {
  const model = createChatModel({ temperature: 0.1 })
  const examples = [
    { country: "United States", capital: "Washiton, D.C." },
    { country: "Canada", capital: "Ottawa" },
  ]
  const exampleFormatterTemplate = "Country: {country}\nCapital: {capital}"
  const examplePrompt = new PromptTemplate({
    inputVariables: ["country", "capital"],
    template: exampleFormatterTemplate,
  })
  // let res = await examplePrompt.format(examples[0])
  // console.log(res)

  const fewShotPrompt = new FewShotPromptTemplate({
    examples,
    examplePrompt,
    prefix: "What is the capital city of country below?",
    suffix: "Country: {country}\nCapital:",
    inputVariables: ["country"],
    exampleSeparator: "\n\n",
  })

  let prompt = await fewShotPrompt.format({ country: "France" })
  let res = await model.invoke(prompt)
  console.log(res.content)
}

main().catch((e) => console.error(e))
