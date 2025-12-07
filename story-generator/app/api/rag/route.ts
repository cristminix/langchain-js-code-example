import { ChatPromptTemplate } from "@langchain/core/prompts"
//! kita membutuhkan ini untuk membuat dokumen lokal
import { Document } from "@langchain/core/documents"
//! createStuffDocumentsChain menggantikan LLMChain
import { createStuffDocumentsChain } from "@langchain/classic/chains/combine_documents"
import { createChatModel } from "@/app/global/fn/createChatModel"
import { NextRequest } from "next/server"

export async function POST(req: NextRequest) {
  const model = createChatModel()
  const prompt = ChatPromptTemplate.fromTemplate(
    `Jawab pertanyaan pengguna berdasarkan konteks yang diberikan:
    
    {context}
    
    Pertanyaan: {input}`
  )
  //! membuat dokumen statis secara manual
  const documentA = new Document({
    pageContent: `LangSmith adalah platform DevOps terpadu untuk mengembangkan,
     berkolaborasi, menguji, menyebarkan, dan memantau
     aplikasi LLM.`,
  })

  const documentB = new Document({
    pageContent: `LangSmith pertama kali diluncurkan dalam beta tertutup pada Juli 2023`,
  })
  const chain = await createStuffDocumentsChain({
    llm: model,
    prompt,
  })

  const { question } = await req.json()

  const data = await chain.invoke({
    input: question,
    context: [documentA, documentB],
  })
  return Response.json({ data })
}
