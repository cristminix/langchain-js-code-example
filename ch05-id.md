# 4. Output Parser

## 4.1. Pendahuluan

Baiklah, mari kita selami seluk-beluk output parser di LangChain.

Mengapa kita membutuhkannya? Nah, saat bekerja dengan LLM, Anda akan menyadari bahwa responsnya mungkin tidak sama jika Anda mengajukan pertanyaan yang sama dua kali. Juga, format outputnya bisa bervariasi.

Misalnya, jika kita meminta resep suatu hidangan, terkadang LLM akan mengembalikan Bahan sebagai langkah pertama, terkadang Persiapan. Ini normal karena LLM bersifat generatif, bukan deterministik. Variabilitas ini mungkin baik-baik saja untuk pembaca manusia, tetapi menjadi bermasalah jika kita ingin titik akhir API memproses respons tersebut.

Dan ketika Anda mengubah jenis model LLM yang mendasari, itu hanya akan menjadi lebih buruk.

Anggap output parser sebagai asisten pemformatan Anda. Mereka dapat:

1. menyesuaikan prompt Anda dengan menambahkan hal-hal seperti awalan atau akhiran untuk mengarahkan output ke arah tertentu. Ingin array JavaScript? Ingin string sederhana atau struktur bersarang JSON? Output parser LangChain siap membantu Anda;
2. setelah output siap, fungsi JavaScript dapat masuk untuk merapikan semuanya. Fungsi ini bahkan mungkin menggunakan LLM lain untuk memoles output ke format yang sempurna.

## 4.2. Contoh pengaturan

LangChain memiliki beberapa output parser yang telah ditentukan sebelumnya yang dapat digunakan secara langsung. Kita akan menggunakan beberapa di antaranya dalam contoh berikut.

Anda ditugaskan untuk membuat game trivia menggunakan ChatGPT. Pengguna akan meminta pertanyaan trivia dengan empat kemungkinan jawaban. Hanya satu dari jawaban ini yang benar. Setelah kemungkinan jawaban diklik, popup yang menunjukkan apakah jawaban itu benar atau salah akan ditampilkan. Kapan saja, pengguna akan dapat meminta pertanyaan baru.

Beginilah tampilan versi akhir aplikasi:

Kita akan mulai dari keadaan yang sangat sederhana.

Di backend, kita akan membuat model OpenAI dan memintanya untuk pertanyaan trivia:

```javascript
// code/trivia-game/src/app/api/route.js

import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "@langchain/core/prompts"

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
})

const prompt = PromptTemplate.fromTemplate(`Ajukan pertanyaan trivia tentang geografi.`)

const chain = prompt.pipe(model)

export async function GET() {
  const gptResponse = await chain.invoke()

  return Response.json({ question: gptResponse.text })
}
```

Perhatikan bahwa kali ini kita menggunakan permintaan GET karena kita tidak perlu mengirimkan badan permintaan apa pun. Kita hanya perlu mendapatkan pertanyaan kembali.

Di frontend, kita memiliki tombol sederhana yang melakukan panggilan ke backend. Menggunakan variabel status React, pertanyaan ditampilkan setelah kita mendapatkan respons:

```javascript
// code/trivia-game/src/app/page.js

import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "@langchain/core/prompts"

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
})

const prompt = PromptTemplate.fromTemplate(`Ajukan pertanyaan trivia tentang geografi.`)

const chain = new prompt.pipe(model)

export async function GET() {
  const gptResponse = await chain.invoke()
  return Response.json({ question: gptResponse.text })
}
```

Beginilah tampilan proyek pada fase pertamanya.

## 4.3. StringOutputParser

Output parser dari LangChain.js dimaksudkan untuk mengubah respons AI menjadi struktur umum, seperti JSON, Array, String, dan lainnya.

StringOutputParser mengambil output model dan mengubahnya menjadi string sederhana. Ini mungkin parser yang paling mudah digunakan.

Mari kita lihat seperti apa respons sebenarnya dari panggilan ChatGPT:

```javascript
const prompt = PromptTemplate.fromTemplate(`Ajukan pertanyaan trivia tentang geografi.`)

const chain = prompt.pipe(model)
const gptResponse = await chain.invoke()
console.log(gptResponse)
```

Jika kita mencetak konstanta `gptResponse`, itu akan terlihat seperti ini:

Ini adalah struktur yang berasal dari model ChatGPT tanpa output parser tambahan.

Namun, jika kita menggunakan jenis model lain, seperti Llama (dibuat oleh Meta) atau Claude (dibuat oleh Anthropic), strukturnya bisa berbeda. Setiap model dapat memberikan jawaban yang dibungkus dalam struktur yang berbeda.

Ini berarti baris yang mengekstrak respons string akhir mungkin gagal karena properti `text` mungkin tidak ada:

```javascript
question: gptResponse.text
```

Pada akhirnya, kita hanya membutuhkan string sederhana yang berisi pertanyaan.

Di sinilah `StringOutputParser` berperan. Anda dapat menambahkan parser ke chain, dan itu akan memastikan berbagai jenis respons dari LLM yang berbeda diubah menjadi string sederhana.

Mari kita lihat bagaimana ini terlihat dalam kode:

```javascript
// code/trivia-game/src/app/api/route.js

import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "@langchain/core/prompts"
// mengimpor parser
import { StringOutputParser } from "@langchain/core/output_parsers"

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
})

// membuat prompt dan memanggil chain
const makeQuestion = async () => {
  const prompt = PromptTemplate.fromTemplate(`Ajukan pertanyaan trivia tentang geografi.`)
  // menambahkan parser ke chain LCEL sehingga kita mendapatkan
  // hanya output string sederhana alih-alih objek
  const chain = prompt.pipe(model).pipe(new StringOutputParser())

  return await chain.invoke()
}

export async function GET() {
  // mengekstrak bagian pembuatan pertanyaan ke dalam metodenya
  const question = await makeQuestion()

  return Response.json({ question })
}
```

Ingatlah bahwa dalam sebuah chain, kita dapat mengatur beberapa operasi berurutan, termasuk output parser.

Perhatikan bahwa setelah kita menambahkan output parser ke chain, kita tidak perlu secara manual mengurai properti `.text`:

```javascript
// sebelum menggunakan parser
return Response.json({ question: gptResponse.text })

// setelah menambahkan output parser ke chain
return Response.json({ question })
```

Ini akan berfungsi bahkan jika kita mengubah jenis model.

Selanjutnya, mari kita lihat bagaimana kita dapat menggunakan jenis parser lain untuk membuat array respons.

## 4.4. CommaSeparatedListOutputParser

Ada kasus di mana kita perlu mendapatkan beberapa item dari respons LLM.

Mari kita minta ChatGPT untuk juga membantu kita dengan beberapa kemungkinan jawaban untuk pertanyaan trivia. Beginilah tampilan promptnya:

`Berikan 4 kemungkinan jawaban untuk {question}, dipisahkan oleh koma, 3 salah dan 1 benar, dalam urutan acak.`

Tanpa output parser apa pun, respons standar dari ChatGPT akan terlihat seperti ini:

```javascript
AIMessage {
 lc_serializable: true,
 lc_kwargs: {
   content: 'Amerika Utara, Afrika, Australia, Asia',
   additional_kwargs: { function_call: undefined, tool_calls: undefined },
   response_metadata: {}
 },
 lc_namespace: [ 'langchain_core', 'messages' ],
 content: 'Amerika Utara, Afrika, Australia, Asia',
 name: undefined,
 additional_kwargs: { function_call: undefined, tool_calls: undefined },
 response_metadata: {
   tokenUsage: { completionTokens: 8, promptTokens: 47, totalTokens: 55 },
   finish_reason: 'stop'
 }
}
```

Objek JavaScript yang panjang dan kompleks yang perlu kita uraikan secara manual.

Ngomong-ngomong, kita akan membahas lebih detail tentang kelas `AIMessage` selama bab memori obrolan.

Untuk situasi seperti ini, LangChain dapat membantu kita dengan CommaSeparatedListOutputParser.

`CommaSeparatedListOutputParser` mengambil jawaban kompleks yang diberikan oleh LLM dan memformat ulang sebagai array string standar. Misalnya, `AIMessage` dari contoh di atas akan menjadi:

```javascript
;["Amerika Utara", "Afrika", "Australia", "Asia"]
```

Jauh, jauh lebih bersih!

Mari kita lihat bagaimana kode backend kita akan terlihat setelah kita menambahkan `CommaSeparatedListOutputParser` ini untuk menangani kemungkinan jawaban untuk pertanyaan:

```javascript
// code/trivia-game/src/app/api/route.js

import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "@langchain/core/prompts"
import { StringOutputParser } from "@langchain/core/output_parsers"
// mengimpor CommaSeparatedListOutputParser
import { CommaSeparatedListOutputParser } from "@langchain/core/output_parsers"

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  // meningkatkan suhu model
  temperature: 0.9,
})

// meminta model untuk kemungkinan jawaban
const makePossibileAnswers = async (question) => {
  const prompt = PromptTemplate.fromTemplate(
    `Berikan 4 kemungkinan jawaban untuk {question}, dipisahkan oleh
 koma,
        3 salah dan 1 benar, dalam urutan acak.`
  )
  // menerapkan CommaSeparatedListOutputParser ke chain
  const chain = prompt.pipe(model).pipe(new CommaSeparatedListOutputParser())

  return await chain.invoke({ question: question })
}

const makeQuestion = async () => {
  const prompt = PromptTemplate.fromTemplate(`Ajukan pertanyaan trivia tentang geografi.`)

  const chain = prompt.pipe(model).pipe(new StringOutputParser())

  return await chain.invoke()
}

export async function GET() {
  const question = await makeQuestion()
  // setelah kita memiliki pertanyaan, ambil beberapa kemungkinan jawaban
  const answers = await makePossibileAnswers(question)

  return Response.json({ question, answers })
}
```

Perhatikan bahwa kita telah meningkatkan suhu model, mengingat bahwa ia perlu menjadi kreatif saat menghasilkan kemungkinan jawaban.

Meskipun Anda mungkin tergoda untuk menggunakan metode `split()` string JavaScript, pikirkan lagi! Apa yang akan terjadi jika kita mengubah LLM dan struktur respons berubah? Inilah mengapa LangChain sangat kuat! Ini menstandardisasi cara kita berinteraksi dengan model AI.

Pada titik ini, kita menggunakan dua output parser:

- `StringOutputParser` untuk pertanyaan trivia utama
- `CommaSeparatedListOutputParser` untuk mengurai daftar kemungkinan jawaban

Di frontend, kita akan membaca kemungkinan jawaban dan menampilkannya sebagai tombol:

```javascript
// code/trivia-game/src/app/page.js

"use client"

import { useState } from "react"

export default function Home() {
  const [question, setQuestion] = useState()
  // menambahkan variabel status array kosong untuk menyimpan jawaban

  const [answers, setAnswers] = useState([])

  const getTriviaQuestion = async () => {
    const response = await fetch("api")
    const data = await response.json()
    console.log(data)
    setQuestion(data.question)
    // setelah kita memiliki jawaban, perbarui status
    setAnswers(data.answers)
  }

  return (
    <>
      <h1>' Trivia Geografi</h1>
      <button onClick={getTriviaQuestion}>Ajukan pertanyaan geografi kepada saya</button>

      <p>{question}</p>
      {/* ulangi dan tampilkan setiap jawaban sebagai tombol */}
      {answers.map((answ, i) => (
        <button key={i}>{answ}</button>
      ))}
    </>
  )
}
```

Beginilah tampilan UI aplikasi pada tahap ini:

Ngomong-ngomong, jika daftar tidak dipisahkan oleh karakter koma, Anda dapat menggunakan `CustomListOutputParser`.

Proyek tambahan yang menyenangkan adalah menambahkan memori ke aplikasi ini sehingga tidak akan mengulang pertanyaannya. Kita akan melihat di bab-bab berikutnya bagaimana menggunakan fitur memori obrolan LangChain.

Langkah selanjutnya adalah menentukan apakah pengguna mengklik jawaban yang benar.

## 4.5. Metode getFormatInstructions() dan parser kustom

Sebelum kita melanjutkan, mari kita sedikit menyimpang untuk berbicara tentang metode `getFormatInstructions()` dan bagaimana output parser bekerja di balik layar.

Ada banyak output parser di LangChain. Dokumentasi menyediakan tabel ini untuk meringkas jenis-jenis utamanya:

Semua parser ini memiliki metode `getFormatInstructions()` yang sama.

Mari kita buat `CommaSeparatedListOutputParser` dan panggil metode ini:

```javascript
const parser = new CommaSeparatedListOutputParser()
console.log(parser.getFormatInstructions()) // Respons Anda harus berupa daftar nilai yang dipisahkan koma, mis: `foo, bar, baz`
```

Pada dasarnya, ini hanyalah bagian tambahan yang dapat kita tambahkan ke prompt.

Misalnya, kita bisa membuat `RunnableSequence` dan meneruskan hasil metode `getFormatInstructions()`:

```javascript
const commaListOutputParser = new CommaSeparatedListOutputParser()
const chain = RunnableSequence.from([PromptTemplate.fromTemplate(`Berikan saya 3 {topic}.\n{formatInstructions}`), new OpenAI({}), parser])
return await chain.invoke({
  topic: "merek mobil",
  formatInstructions: commaListOutputParser.getFormatInstructions(),
})
```

Jika kita mencetak `commaListOutputParser.getFormatInstructions()`, kita akan mendapatkan yang berikut:

Respons Anda harus berupa daftar nilai yang dipisahkan koma, mis: `foo, bar, baz`

Agak lucu jika kita memikirkannya. Kita menggunakan LLM untuk mengurai output dari ... LLM (.

Ini akan melakukan hal yang sama seperti menambahkan parser langsung ke chain, dan akan menghasilkan sesuatu yang mirip dengan ini:

```javascript
;["Audi", "Ford", "Doge"]
```

Kita bahkan dapat membuat output parser kustom kita sendiri. Tautan dokumentasi di sini.

Ada dua metode utama yang harus diimplementasikan oleh output parser:

- `getFormatInstructions()` mengembalikan string yang berisi instruksi tentang bagaimana output model bahasa harus diformat. Anda dapat menyuntikkannya ke dalam prompt Anda jika perlu.
- `parse()`: mengambil string (dianggap sebagai respons dari model bahasa) dan menguraikannya ke dalam struktur tertentu.

## 4.6. StructuredOutputParser

Model Bahasa Besar suka memiliki struktur! Output mereka jauh lebih akurat ketika kita mendefinisikan struktur yang diharapkan yang jelas untuk input dan output. Info lebih lanjut tentang ini di sini.

Meskipun `CommaSeparatedListOutputParser` atau `StringOutputParser` adalah alat yang hebat untuk respons langsung yang lebih sederhana, ketika kita harus berurusan dengan output yang lebih kompleks, kita akan membutuhkan jenis parser lain seperti StructuredOutputParser atau JsonOutputParser.

Untuk aplikasi trivia kecil kita, peningkatan besar adalah menerima output dalam format berikut:

```javascript
{
 question: 'teks pertanyaan di sini',
 answers: [
   'foo',
   'bar',
   'qux',
   'baz',
 ],
 correct: 2 // 'qux' benar
}
```

Untuk mencapai ini, kita akan menggunakan `StructuredOutputParser` dengan skema Zod. Alasan untuk ini adalah bahwa `StructuredOutputParser` lebih serbaguna dan mencakup lebih banyak kasus penggunaan daripada `JsonOutputParser`.

Zod adalah pustaka validasi skema untuk mendefinisikan struktur data yang kompleks.

Mari kita lihat bagaimana menambahkan `StructuredOutputParser` akan mengubah kode backend kita:

```javascript
// code/trivia-game/src/app/api/route.js

import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "@langchain/core/prompts"
// hapus impor StringOutputParser & CommaSeparatedListOutputParser
// kita akan membutuhkan ini untuk membangun struktur chain baru
import { RunnableSequence } from "@langchain/core/runnables"
// menambahkan StructuredOutputParser untuk menggantikan parser lain

import { StructuredOutputParser } from "langchain/output_parsers"
// kita akan menggunakan skema Zod untuk mendefinisikan jenis data yang dikembalikan

import { z } from "zod"

const model = new ChatOpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.9,
})

// Zod digunakan untuk mendefinisikan apakah suatu bidang adalah string, angka, array, dll
const parser = StructuredOutputParser.fromZodSchema(
  z.object({
    question: z.string().describe(`berikan saya pertanyaan trivia geografi acak`),
    answers: z.array(z.string()).describe(`
                berikan 4 kemungkinan jawaban, dalam urutan acak,
                di mana hanya satu yang benar.`),
    correctIndex: z.number().describe(`nomor jawaban yang benar, indeks nol`),
  })
)

// definisikan chain baru dengan RunnableSequence
const chain = RunnableSequence.from([
  PromptTemplate.fromTemplate(
    `Jawab pertanyaan pengguna sebaik mungkin.\n

    {format_instructions}`
  ),

  model,

  parser,
])

// menggunakan StructuredOutputParser kita sekarang dapat membungkus semua
// data ke dalam satu struktur tunggal

const makeQuestionAndAnswers = async () => {
  // mengembalikan JSON struktur yang ditentukan
  return await chain.invoke({
    format_instructions: parser.getFormatInstructions(),
  })
}

export async function GET() {
  // makeQuestion() & makePossbileAnswers() digabungkan dalam satu fungsi

  const data = await makeQuestionAndAnswers()

  return Response.json({ data })
}
```

Meskipun terlihat seperti kita telah membuat banyak perubahan, jika kita menghapus komentar baris baru, Anda akan melihat bahwa kode kita sekarang lebih sederhana.

Dari LLM, kita mengembalikan satu struktur JSON yang berisi semua info yang dibutuhkan aplikasi kita.

Juga, metode `makeQuestion()` dan `makePossibleAnswers()` sekarang digabungkan menjadi satu panggilan, membuat aplikasi sedikit lebih cepat.

Dengan perubahan ini ditambahkan, kita sekarang dapat menunjukkan apakah pengguna mengklik jawaban yang benar atau salah.

Mari kita lihat perubahan di frontend:

// code/trivia-game/src/app/page.js

```javascript
"use client"

import { useState } from "react"

export default function Home() {
  const [question, setQuestion] = useState()

  const [answers, setAnswers] = useState([])
  // menambahkan variabel status ketiga untuk menyimpan jawaban yang benar
  const [correctIndex, setCorrectIndex] = useState()

  const getTriviaQuestion = async () => {
    const response = await fetch("api")

    const { data } = await response.json()

    setQuestion(data.question)

    setAnswers(data.answers)
    // setelah kita memiliki indeks jawaban yang benar, perbarui status
    setCorrectIndex(data.correctIndex)
  }

  // gunakan indeks jawaban yang benar untuk melihat apakah jawaban yang tepat dipilih

  const checkAnswer = async (selectedIndex) => {
    correctIndex === selectedIndex ? alert("Benar!") : alert("Coba lagi!")
  }

  return (
    <>
      <h1>' Trivia Geografi</h1>
      <button onClick={getTriviaQuestion}>Ajukan pertanyaan geografi kepada saya</button>

      <p>{question}</p>
      {/* onClick periksa apakah pengguna menjawab dengan benar */}
      {answers.map((answ, i) => (
        <button key={i} onClick={() => checkAnswer(i)}>
          {answ}
        </button>
      ))}
    </>
  )
}
```

Tidak ada yang terlalu istimewa di sini. Kita telah menambahkan pendengar klik ke setiap tombol jawaban dan kita akan memeriksa apakah indeks tombol yang diklik itu cocok dengan indeks jawaban yang benar.

Dan beginilah tampilan versi akhir UI:

Perhatikan bahwa meskipun model yang lebih baru seperti ChatGpt 4 dapat melakukan sebagian dari manipulasi data ini secara langsung, mereka lebih mahal untuk digunakan. Oleh karena itu, kita dapat memanfaatkan output parser untuk menghemat biaya dan juga mendefinisikan format output yang sangat jelas, sehingga mengurangi perilaku yang tidak terduga.

Aplikasi akhir kita hanya sedikit lebih dari 80 baris kode. Baik backend maupun frontend.

Kita berbicara tentang game trivia yang berfungsi penuh dengan aliran pertanyaan tanpa akhir. Ditambah lagi, ini sangat fleksibel dan mudah disesuaikan. Satu lagi bukti betapa banyak kekuatan yang diberikan oleh kemampuan baru LLM kepada kita sebagai pengembang web. Keren sekali!
