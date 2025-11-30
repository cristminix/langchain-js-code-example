## 2.6. Chain

Chain mengacu pada urutan panggilan - baik ke LLM, alat, atau langkah pra-pemrosesan data.

Mereka adalah konsep inti yang vital dari LangChain dan dapat dilihat sebagai program pendek yang ditulis di sekitar LLM untuk menjalankan tugas-tugas kompleks.

Berbicara tentang chain, berikut adalah fakta menarik tentang logo LangChain: Burung beo dan tautan rantai terinspirasi oleh orang-orang yang menyebut LLM "burung beo stokastik". Model-model ini dapat meniru tulisan manusia tetapi tidak benar-benar memahami apa yang mereka katakan. Pustaka ini bertujuan untuk "merantai" "burung beo" ini bersama-sama untuk menghasilkan output yang lebih bermakna dan berguna.

Output dari satu tautan dari chain menjadi input untuk tautan berikutnya.

Misalkan kita perlu membuat artikel untuk majalah. Kita akan mengikuti langkah-langkah ini:

1. Gunakan ChatGPT untuk menghasilkan judul artikel.

2. Teruskan judul ini ke LLM lokal untuk menyusun artikel sebenarnya, menggunakan dokumen internal.

3. Teruskan artikel ke Midjourney, LLM lain, untuk menghasilkan gambar untuk artikel.

Mari kita lihat bagaimana menambahkan chain ke kode backend kita:

```javascript
import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "@langchain/core/prompts"

// menggunakan LLMChain; mungkin chain yang paling mudah
import { LLMChain } from "langchain/chains"

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,

  temperature: 0.9,
})

const prompt = new PromptTemplate({
  inputVariables: ["subject"],

  template: "Beritahu saya judul cerita tentang {subject}",
})

// sebuah chain yang menghubungkan model, prompt, dan opsi verbose
const chain = new LLMChain({
  llm: model,

  prompt,

  // gunakan verbose untuk men-debug chain
  verbose: true,
})

export async function POST(req) {
  const { subject } = await req.json()

  // memanggil chain
  const gptResponse = await chain.invoke({ subject })

  return Response.json({ data: gptResponse.text })
}
```

Anda mungkin menemukan beberapa contoh online yang menggunakan metode `chain.call()` alih-alih `chain.invoke()`. Harap dicatat bahwa `.call()` sudah tidak digunakan lagi dan akan dihapus.

Opsi `verbose: true` bersifat opsional. Jika diaktifkan, itu akan memberikan detail tambahan tentang chain di konsol backend. Informasi ini meliputi:

- input dan output untuk setiap langkah chain
- berapa lama setiap langkah berlangsung
- variabel `tokenUsage`

Poin terakhir ini penting karena kita membayar untuk menggunakan API LLM dengan token. Rata-rata, 100 kata kira-kira 130 token. Alat yang berguna untuk mengelola token adalah OpenAI Tokenizer. `tokenUsage` dibagi menjadi berapa banyak yang digunakan prompt input dan berapa banyak yang digunakan respons sebenarnya:

```
"llmOutput": {
  "tokenUsage": {
    "completionTokens": 14,
    "promptTokens": 14,
    "totalTokens": 28
  }
}
```

Dalam kode frontend, kita hanya akan mengganti input teks dengan kotak pilihan untuk memfasilitasi entri data:

```javascript
export default function Home() {
  // sisanya tetap sama
  // ...
  return (
    <>
      <h1>The Story Maker</h1>
      <em>
        Aplikasi ini menggunakan Model GPT untuk menghasilkan cerita untuk
        anak-anak.
      </em>
      {/* menambahkan kotak pilihan untuk mempercepat entri data */}

      <form onSubmit={onSubmitHandler}>
        Subjek utama cerita:
        <select name="subject">
          <option value="kucing">Kucing</option>
          <option value="unicorn">Unicorn</option>
          <option value="peri">Peri</option>
        </select>
        <button>Tanya Model AI</button>
      </form>

      <p>{storyTitle}</p>
    </>
  )
}
```

## 2.7. LCEL - LangChain Expression Language

LangChain Expression Language, atau LCEL, menyediakan cara yang lebih sederhana untuk merangkai beberapa komponen kustom.

Singkatnya, menggunakan LCEL, kita dapat mengganti kelas lain, seperti `LLMChain`, dengan metode `.pipe()` untuk membentuk chain.

Mari kita lihat lagi chain untuk contoh di atas:

```javascript
const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
})

const prompt = new PromptTemplate({
  inputVariables: ["subject"],
  template: "Beritahu saya judul cerita tentang {subject}",
})

const chain = new LLMChain({
  llm: model,
  prompt,
})

await chain.invoke({ subject })
```

Kita dapat mengganti pembungkus `LLMChain` dengan menggunakan metode `.pipe()`. Sisa kode tetap sama:

```javascript
// SEBELUM
const chain = new LLMChain({
  llm: model,
  prompt,
})

await chain.invoke({ subject })

// SESUDAH
const chain = prompt.pipe(model)

await chain.invoke({ subject })
```

Nanti, kita akan melihat bahwa kita dapat membangun chain yang lebih kompleks dengan menambahkan jenis node lain, seperti output parser.

Output dari sebuah node dalam chain menjadi input dari node berikutnya. Elemen kunci dari LCEL adalah RunnableInterface. Ini memastikan bahwa node dalam chain memiliki pola komunikasi yang umum.

LCEL menstandardisasi komunikasi dan memungkinkan pertukaran komponen yang mudah dalam kerangka kerja LangChain. Semua komponen bersifat modular. Jika sesuatu perlu diubah, hanya bagian kode itu yang harus diganti daripada seluruh pipeline.

Ini juga membuat kode lebih bersih.

Banyak contoh dalam buku ini akan dibuat menggunakan chain LCEL.

Jika Anda ingin menjelajahi lebih lanjut tentang topik ini, pastikan untuk memeriksa dokumen resmi LCEL dan saya juga telah menulis beberapa artikel di blog saya:

- Nested Chains in LangChain JS – Meneruskan Output dari Satu Chain ke Chain Lain
- Custom Functions with RunnableLambda in LangChain JS
- RunnableMap and RunnableParallel in LangChain JS
- Routing in LangChain JS – Menggunakan Klasifikasi LLM untuk Memanggil Prompt yang Berbeda
- Menggunakan RunnableBranch untuk Mengarahkan Eksekusi ke Prompt yang Berbeda di LangChain.js

Ini mengakhiri aplikasi kecil pertama kita dengan JavaScript, LangChain, dan ChatGPT.

Kita telah belajar bagaimana:

- bootstrap dan menghubungkan aplikasi web ke LLM.
- memanfaatkan template prompt LangChain untuk mencegah pengulangan
- dan membuat chain pertama kita.

Di bab berikutnya, kita akan memperluas aplikasi ini untuk menghasilkan isi cerita yang sebenarnya dan mengintegrasikan aliran data.
