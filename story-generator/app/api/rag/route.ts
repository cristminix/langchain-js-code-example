import { ChatPromptTemplate } from "@langchain/core/prompts"
//! kita membutuhkan ini untuk membuat dokumen lokal
import { Document } from "@langchain/core/documents"
//! createStuffDocumentsChain menggantikan LLMChain
import { createStuffDocumentsChain } from "@langchain/classic/chains/combine_documents"
import { createChatModel } from "@/app/global/fn/createChatModel"
import { NextRequest } from "next/server"
import type { BaseLanguageModel } from "@langchain/core/language_models/base"

//! createStuffDocumentsChain menggantikan LLMChain

// pemuat dokumen yang dapat mengambil konten halaman web
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio"
// alat untuk membuat vektor dan embedding
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"

import { OllamaEmbeddings } from "@langchain/ollama"

import { MemoryVectorStore } from "@langchain/classic/vectorstores/memory"
// alat pengambilan
import { createRetrievalChain } from "@langchain/classic/chains/retrieval"

const prompt = ChatPromptTemplate.fromTemplate(
  `Jawab pertanyaan pengguna dari konteks berikut:

    {context}

    Pertanyaan: {input}`
)

let retrievalChain, splitDocs

// proses RAG
async function loadDocumentsFromUrl(url: string, model: BaseLanguageModel) {
  // pemuat dokumen
  const loader = new CheerioWebBaseLoader(url)

  const docs = await loader.load()

  // transformer dokumen
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 250,

    chunkOverlap: 20,
  })

  splitDocs = await splitter.splitDocuments(docs)
  console.log(splitDocs)
  //! mengatur embedding
  const embeddings = new OllamaEmbeddings({
    // model: "nomic-embed-text",
    model: "all-minilm:l6-v2",

    // You can also specify other options like baseUrl if needed, e.g.,
    baseUrl: "http://localhost:11434",
  })

  //! membuat DB vektor lokal
  const vectorstore = await MemoryVectorStore.fromDocuments(
    splitDocs,

    embeddings
  )

  //! apa yang kita gunakan untuk mengambil data dari DB vektor
  const retriever = vectorstore.asRetriever()

  const chain = await createStuffDocumentsChain({
    llm: model,

    prompt,
  })

  retrievalChain = await createRetrievalChain({
    combineDocsChain: chain,

    retriever,
  })
}
export async function POST(req: NextRequest) {
  const model = createChatModel()

  const { question, url } = await req.json()

  //! jika pengguna mengirim URL, atur RAG dan kembalikan
  if (url) {
    await loadDocumentsFromUrl(url, model)
    return Response.json({ loaded: true })
  }
  // Test the retrieval chain after loading
  const data = await retrievalChain.invoke({
    input: question,
    // context: splitDocs,
  })
  return Response.json({ data })
}
