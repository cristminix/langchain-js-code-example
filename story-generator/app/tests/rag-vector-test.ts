import { ChatOpenAI } from "@langchain/openai"

import { ChatPromptTemplate } from "@langchain/core/prompts"
//! kita membutuhkan ini untuk membuat dokumen lokal
import { Document } from "@langchain/core/documents"
//! createStuffDocumentsChain menggantikan LLMChain
import { createStuffDocumentsChain } from "@langchain/classic/chains/combine_documents"

import * as dotenv from "dotenv"
import { createChatModel } from "../global/fn/createChatModel"
dotenv.config()

// pemuat dokumen yang dapat mengambil konten halaman web
import { CheerioWebBaseLoader } from "@langchain/community/document_loaders/web/cheerio"
// alat untuk membuat vektor dan embedding
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters"

import { OpenAIEmbeddings } from "@langchain/openai"

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
async function loadDocumentsFromUrl(url: string, model: any) {
  // pemuat dokumen
  const loader = new CheerioWebBaseLoader(url)

  const docs = await loader.load()

  // transformer dokumen
  const splitter = new RecursiveCharacterTextSplitter({
    chunkSize: 100,

    chunkOverlap: 20,
  })

  splitDocs = await splitter.splitDocuments(docs)

  //! mengatur embedding
  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_API_KEY,
    configuration: {
      baseURL: process.env.OPENAI_BASE_URL,
    },
    modelName: process.env.OPENAI_MODEL,
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
async function main() {
  const model = createChatModel()

  const question = "Apa itu LangSmith?"

  const url = "https://docs.langchain.com/langsmith/home"

  //! jika pengguna mengirim URL, atur RAG dan kembalikan
  if (url) {
    await loadDocumentsFromUrl(url, model)

    // Test the retrieval chain after loading
    const data = await retrievalChain.invoke({
      input: question,
    })
    console.log("RAG Result:", data)
    return
  }

  // This section won't run because url is always truthy
  console.log("No URL provided, skipping RAG setup")
}

main().catch((e) => console.error(e))
