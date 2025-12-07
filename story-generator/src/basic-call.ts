import { createChatModel } from "@/app/global/fn/createChatModel"
import * as dotenv from "dotenv"
dotenv.config()
const run = async () => {
  const model = createChatModel({ temperature: 0.1 })
  const res = await model.invoke("What is the capital of France?")
  console.log({ res: res.content })
}

run().catch((e) => console.error(e))
