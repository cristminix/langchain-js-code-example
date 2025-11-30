# 6.4. Komponen proses RAG

Mari kita lihat berbagai jenis komponen yang terlibat dalam proses RAG:

1. Pemuat Dokumen - anggap ini sebagai pengumpul data Anda. Mereka menarik info eksternal dan memuatnya, baik itu file .txt biasa, teks halaman web, atau bahkan transkrip video YouTube.

2. Transformer - Anda telah memuat dokumen Anda, tetapi terkadang mereka membutuhkan sedikit perubahan agar sesuai dengan aplikasi Anda. Transformer bawaan LangChain membantu Anda menyesuaikan dokumen. Contoh dasar dapat menggunakan transformer untuk memecah dokumen besar menjadi segmen yang lebih kecil yang sesuai dengan jendela kontekstual model Anda.

3. Embedding - ini semua tentang mengubah data menjadi vektor. Kelas Embedding adalah pilihan Anda untuk bekerja dengan model embedding seperti yang dari OpenAI, Meta, atau yang ada di Hugging Face. Anggap embedding teks sebagai cara untuk merepresentasikan teks atau data dalam ruang vektor, membuat hal-hal seperti pencarian semantik lebih cepat.

4. Database Vektor - saatnya menyimpan embedding teks yang telah kita hasilkan pada langkah sebelumnya. Database khusus ini dibangun untuk menyimpan dan mengambil data vektor secara efisien. Mereka membuat pencarian semantik mudah dan cepat. Kita dapat menarik teks yang paling relevan dalam sekejap. Kita akan menyelami lebih dalam database vektor nanti.

5. Retriever - terakhir tetapi tidak kalah pentingnya, temui asisten pengambilan info Anda: retriever. Tidak seperti penyimpanan vektor yang hanya menyimpan data, retriever keluar dan mengambil dokumen yang Anda butuhkan. Meskipun beberapa retriever mungkin menggunakan penyimpanan vektor, ada semua jenis retriever yang disesuaikan untuk tugas-tugas tertentu.

# 6.5. Vektor, Embedding, dan Database Vektor

Sebelum kita melanjutkan, kita perlu sedikit menyimpang dan membahas beberapa konsep fundamental yang terlibat dalam proses RAG.

Kita akan mulai dengan vektor. Vektor hanyalah sebuah array angka.

```javascript
// beginilah tampilan sebuah vektor

let vec = [2.5, 1.3, 7.0, 9.2]
```

Yang keren dari vektor adalah mereka dapat merepresentasikan objek yang lebih kompleks seperti kata-kata, kalimat, file audio, atau bahkan gambar dalam ruang berdimensi tinggi yang disebut embedding.

Misalnya, mari kita ambil entri berikut: "siput", "pesawat", "kereta cepat", dan "kura-kura".

Kita dapat menyimpan entri ini dalam ruang embedding dua dimensi berdasarkan:

- seberapa besar mereka
- seberapa cepat mereka

Representasi visual mungkin terlihat seperti ini:

Setiap titik adalah vektor dengan format berikut:

```javascript
;[
  x, // seberapa besar objeknya
  y, // seberapa cepat objeknya
]
```

Setiap sumbu ruang embedding juga dikenal sebagai dimensi atau fitur.

Perlu diingat bahwa representasi ini sangat disederhanakan. Secara umum, setiap entri memiliki lebih banyak dimensi, mulai dari puluhan hingga ribuan, tergantung pada kompleksitas dan granularitas data.

Mengingat sekumpulan dimensi, objek serupa dikelompokkan bersama, memungkinkan kita untuk memetakan makna semantik kata-kata atau fitur serupa di hampir semua jenis data lainnya.

Menggunakan embedding ini kita dapat melakukan hal-hal seperti sistem rekomendasi, mesin pencari, dan bahkan pembuatan teks seperti yang ada di Chat GPT.

Tetapi setelah kita memiliki entri vektor yang dipetakan ke dimensi embedding, di mana kita menyimpannya? Dan bagaimana kita bisa menanyakannya dengan cepat?

Nah, di situlah database vektor berperan. Dalam database relasional klasik, kita memiliki baris dan kolom; dalam database vektor, kita memiliki array angka (vektor) yang dikelompokkan berdasarkan kesamaan.

Mengatur data dengan cara ini memungkinkan kita untuk membuat kueri serupa dengan latensi ultra-rendah.

Kita dapat dengan mudah mengambil jarak antara entri-entri ini. Ini membuat pencarian semantik lebih cepat karena kita dapat dengan mudah menghubungkan antara konsep yang berbeda berdasarkan satu atau beberapa dimensi.

Beberapa database vektor utama yang dapat kita gunakan saat ini:

- Chroma
- Pinecone
- Weaviate
- Redis Vector Database

# 6.6. Menggunakan CheerioWebBaseLoader dan MemoryVectorStore

Dalam contoh sebelumnya, kita hanya menggunakan pemuat dokumen dan retriever. Sekarang, saatnya untuk memperluas contoh kita dan membuat komponen RAG lainnya bekerja.

Kita ingin menambahkan fitur-fitur berikut ke aplikasi:

- membaca URL yang diberikan oleh pengguna
- memuat konten halaman dari URL
- membuat embedding dan menyimpan hasilnya di database vektor lokal
- mengambil dan menjawab pertanyaan dari data baru

Beginilah tampilan contoh akhirnya:

Kita akan mulai dengan frontend. Kita akan menambahkan tombol baru yang meminta URL dan mengirimkannya ke backend:

```javascript
// code/rag/src/app/page.js

"use client"

import { useState } from "react"

export default function Home() {
  const [answer, setAnswer] = useState()
  //! tambahkan variabel status baru
  const [docStatus, setDocStatus] = useState(false)

  const askQuestion = async (e) => {
    e.preventDefault()
    const question = e.target.question.value

    const response = await fetch("api", {
      method: "POST",
      body: JSON.stringify({ question }),
    })

    const { data } = await response.json()

    setAnswer(data)
  }

  //! minta URL, teruskan ke backend, perbarui docStatus

  const loadUrl = async (e) => {
    const url = prompt("Silakan masukkan URL untuk konteks dokumen:")

    const response = await fetch("api", {
      method: "POST",
      body: JSON.stringify({ url }),
    })

    const { loaded } = await response.json()
    setDocStatus(loaded ? `✅ Dimuat: ${url}` : false)
  }

  return (
    <>
      <h1>Chatbot Dokumen</h1>
      {/*! minta URL dan tampilkan docStatus */}
      <p>
        <button onClick={loadUrl}>Muat URL</button>
        {docStatus}
      </p>

      <form onSubmit={askQuestion}>
        <input name="question" />
        {/*! dinonaktifkan sampai kita memiliki status dokumen */}
        <button disabled={!docStatus}>Tanya chatbot</button>
      </form>

      <p>{answer}</p>
    </>
  )
}
```

Secara default, formulir pertanyaan akan dinonaktifkan. Setelah backend selesai memuat data dari URL, ia akan mengaktifkan formulir pertanyaan:

Perbedaan utamanya ada di backend, di mana model menjawab pertanyaan.

Pertama, kita perlu menginstal `CheerioWebBaseLoader`:

```bash
npm install --save cheerio
```

Sekarang, mari kita lihat dulu kode lengkapnya, dan kita akan membahas penjelasan lebih lanjut setelahnya:

```javascript
import { ChatOpenAI } from "@langchain/openai"

import { ChatPromptTemplate } from "@langchain/core/prompts"

import { createStuffDocumentsChain } from "langchain/chains/combine_documents"
// pemuat dokumen yang dapat mengambil konten halaman web
import { CheerioWebBaseLoader } from "langchain/document_loaders/web/cheerio"
// alat untuk membuat vektor dan embedding
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

import { OpenAIEmbeddings } from "@langchain/openai"

import { MemoryVectorStore } from "langchain/vectorstores/memory"
// alat pengambilan
import { createRetrievalChain } from "langchain/chains/retrieval"

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,

  temperature: 0,
})

const prompt = ChatPromptTemplate.fromTemplate(
  `Jawab pertanyaan pengguna dari konteks berikut:

    {context}

    Pertanyaan: {input}`
)

let retrievalChain, splitDocs

// proses RAG
async function loadDocumentsFromUrl(url) {
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
  const embeddings = new OpenAIEmbeddings()

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

export async function POST(req) {
  const { question, url } = await req.json()
  //! jika pengguna mengirim URL, atur RAG dan kembalikan
  if (url) {
    await loadDocumentsFromUrl(url)

    return Response.json({ loaded: true })
  }

  const data = await retrievalChain.invoke({
    input: question,

    context: splitDocs,
  })

  return Response.json({ data: data.answer })
}
```

Dalam kode ini, kita melihat komponen RAG beraksi yang dijelaskan di bab sebelumnya.

Pertama, kita memuat teks mentah dari URL yang diberikan oleh pengguna:

```javascript
const loader = new CheerioWebBaseLoader(url)

const docs = await loader.load()
```

Ini hanyalah salah satu jenis pemuat yang disediakan LangChain. Anda dapat melihat daftar lengkap pemuat di sini.

Kita memiliki akses ke dua jenis pemuat:

pemuat file, seperti CVS, PDF, EPUB, dll.

dan pemuat web, seperti Figma, Amazon S3, transkrip Youtube, dll.

Setelah teks mentah dimuat, kita memulai proses mengubah teks (yang dapat dipahami manusia) menjadi vektor angka (yang dapat dipahami AI):

Splitter ini disesuaikan untuk memproses teks umum. Ia mencoba membagi teks pada karakter-karakter ini secara berurutan hingga potongan-potongan yang dihasilkan mencapai ukuran optimal.

Secara default, ia menggunakan daftar yang terdiri dari `["\n\n", "\n", " ", ""]`. Konfigurasi ini bertujuan untuk menjaga integritas paragraf terlebih dahulu, kemudian kalimat, dan akhirnya kata-kata, karena segmen-segmen ini biasanya menunjukkan kohesi semantik tertinggi.
Teks dibagi berdasarkan daftar karakter, dan ukuran potongan diukur dengan jumlah karakter:

```javascript
const splitter = new RecursiveCharacterTextSplitter({
  chunkSize: 100,

  chunkOverlap: 20,
})

splitDocs = await splitter.splitDocuments(docs)

const embeddings = new OpenAIEmbeddings()
```

Selanjutnya, kita menyimpan semua embedding ini dalam database vektor. Untuk contoh kecil ini, kita menggunakan database lokal. Untuk produksi, kita dapat menggunakan layanan DB vektor nyata seperti Chroma atau Pinecone.

```javascript
const vectorstore = await MemoryVectorStore.fromDocuments(
  splitDocs,

  embeddings
)
```

Apakah kita harus membuat ulang embedding setiap kali kita menjalankan kueri RAG? Ini mungkin berfungsi untuk file kecil, tetapi untuk file yang lebih besar, proses pembuatan embedding bisa sangat memakan waktu.

Misalnya, kita dapat mengatur parameter selama pembuatan objek Chroma DB, seperti `persist_directory`, yang menentukan jalur lokal yang valid. Dengan cara ini, ketika Anda membuat DB Vektor Anda menggunakan file, itu akan disimpan di lokasi yang ditentukan. Selanjutnya, itu akan dimuat dari lokasi itu di lain waktu, secara signifikan mengurangi waktu pemrosesan.

`createRetrievalChain()` mengambil pertanyaan pengguna, yang kemudian diteruskan ke retriever untuk mengambil dokumen yang relevan. Dokumen-dokumen tersebut (dan input asli) kemudian diteruskan ke LLM untuk menghasilkan respons.

Akhirnya, kita akan membangun retriever yang dapat digunakan oleh chain untuk mengambil informasi dari database vektor.

```javascript
const retriever = vectorstore.asRetriever()

const chain = await createStuffDocumentsChain({
  llm: model,

  prompt,
})

retrievalChain = await createRetrievalChain({
  combineDocsChain: chain,

  retriever,
})
```

Sebagai catatan samping, model Gemini 1.5 Google memiliki konteks satu juta token dan sedang meneliti 10 juta token. Ini sangat besar sehingga Anda dapat menyertakan seluruh basis pengetahuan, buku, atau film tanpa khawatir tentang batasan konteks. Beberapa orang berpikir ini akan membuat RAG usang. Namun, ini tidak mungkin karena:

1. Biaya - Anda masih membayar per token. Google sangat senang membiarkan Anda
   membayar satu juta token setiap kali Anda melakukan panggilan API. Jadi, semoga berhasil

   memiliki panggilan API $100.

2. Lambat - panggilan API akan sangat besar, dan responsnya akan lambat juga.

3. Pemecahan masalah - konteks yang sangat besar tidak dapat di-debug. Jika sesuatu
   salah, Anda tidak dapat melakukan dekomposisi RAG untuk melihat sumber
   kesalahan.

Satu eksperimen yang menyenangkan adalah mengambil buku seperti ini, dan menggunakan RAG
memberi makan konten ke model LLM. Pengguna kemudian dapat datang dan berinteraksi dengan
LLM itu untuk belajar tentang LangChain menggunakan pendekatan dari buku ini. Atau
cukup tanyakan model untuk pertanyaan rekap.

Mungkin ini akan menjadi masa depan bagaimana kita mengonsumsi buku-buku teknis.
