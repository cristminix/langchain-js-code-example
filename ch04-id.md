# Stream di LangChain

## 3.1. Pendahuluan dan pengaturan proyek

Beberapa jawaban mungkin membutuhkan waktu lama untuk dihasilkan oleh LLM. Misalnya, jika Anda meminta model untuk membuat respons yang kompleks seperti puisi atau meringkas dokumen.

Mengingat cara kerja LLM, kita tidak perlu menunggu jawaban lengkap selesai. Pernahkah Anda memperhatikan bahwa ketika Anda bertanya sesuatu kepada ChatGPT, Anda akan melihat efek mesin tik, di mana setiap kata muncul secara bertahap di layar?

Model Bahasa Besar tidak bernalar seperti manusia. Ia tidak membangun respons lengkap terlebih dahulu lalu menjelaskannya. Ia juga tidak memetakan jawaban ke grafik pengetahuan atau semacamnya. Ia hanya menambahkan satu token pada satu waktu ke jawaban.

Ini bagus karena kita dapat menggunakan perilaku streaming ini untuk memperbarui UI segera setelah kita memiliki informasi baru untuk ditampilkan kepada pengguna.

Kembali ke contoh generator cerita, katakanlah kita ingin membuat cerita berjudul "Rahasia Peri Perak". Alih-alih menunggu cerita lengkap dihasilkan, kita dapat mengalirkan cerita saat ditulis:

Dahulu kala

...

...

Dahulu kala, di hutan mistis

...

...

Dahulu kala, di hutan mistis yang tersembunyi jauh di dalam pegunungan

...

...

Dahulu kala, di hutan mistis yang tersembunyi jauh di dalam pegunungan, hiduplah klan peri perak.

Dalam bab ini, kita akan mengimplementasikan fitur streaming. Beginilah tampilan UI aplikasi pada akhirnya:

## 3.2. Refaktor proyek

Sebelum kita melangkah lebih jauh, kita perlu melakukan sedikit refaktor pada proyek kita.

Di frontend, kita akan melakukan hal berikut:

1. setelah kita memiliki judul cerita, kita akan menampilkannya sebagai tombol dengan teks "Ceritakan kisah <<nama cerita di sini>>"
2. ketika tombol ini ditekan, kita akan melakukan panggilan ke backend, meneruskan nama cerita dan mencetak respons

Beginilah tampilan kodenya:

```javascript
// code/streaming/src/app/page.js

"use client"

import { useState } from "react"

export default function Home() {
  const [storyTitle, setStoryTitle] = useState()
  // variabel status baru untuk storyBody
  const [storyBody, setStoryBody] = useState()

  const onSubmitHandler = async (e) => {
    e.preventDefault()

    const subject = e.target.subject.value

    const response = await fetch("api", {
      method: "POST",
      body: JSON.stringify({ subject }),
    })

    const { data } = await response.json()

    setStoryTitle(data)
  }

  // panggil metode ini ketika tombol mulai cerita ditekan
  const startStoryStream = async () => {
    // reset story body, panggil backend
    // dan tampilkan respons di story body

    setStoryBody("")

    const response = await fetch("api", {
      method: "POST",
      body: JSON.stringify({ storyTitle }),
    })

    const { data } = await response.json()

    setStoryBody(data)
  }

  return (
    <>
      <h1>" Pembuat Cerita</h1>
      <em>
        Aplikasi ini menggunakan Model GPT untuk menghasilkan cerita untuk
        anak-anak.
      </em>

      <form onSubmit={onSubmitHandler}>
        Subjek utama cerita:
        <select name="subject">
          <option value="cats">Kucing</option>
          <option value="unicorns">Unicorn</option>
          <option value="elfs">Peri</option>
        </select>
        <button>Tanya Model AI</button>
      </form>
      {/* jika kita memiliki judul cerita, tampilkan
      tombol mulai cerita dan story body */}

      {storyTitle && (
        <div>
          <button onClick={startStoryStream}>
            Ceritakan kisah {storyTitle}
          </button>

          <p>{storyBody}</p>
        </div>
      )}
    </>
  )
}
```

Di backend, kita akan menambahkan perubahan ini:

- tambahkan metode `makeStoryTitle()` yang akan berisi semua logika sebelumnya
- tambahkan metode `streamStory()`. Kita akan menggunakan metode ini nanti untuk mengimplementasikan mekanisme streaming. Untuk saat ini, ia akan mengembalikan beberapa teks statis
- periksa apakah permintaan dari frontend meminta judul cerita atau isi cerita. Panggil salah satu metode di atas.

Beginilah tampilan kode backend:

```javascript
import { ChatOpenAI } from "@langchain/openai"
import { PromptTemplate } from "@langchain/core/prompts"
// kita akan menggunakan NextResponse untuk mengirim story body
import { NextResponse } from "next/server"

// semua logika sebelumnya masuk ke sini
const makeStoryTitle = async (subject)=> {

    const model = new ChatOpenAI({
        openAIApiKey: process.env.OPENAI_API_KEY,
        temperature: 0.9
    })

    const prompt = new PromptTemplate({
        inputVariables: [ "subject"],
        template: "Beritahu saya judul cerita tentang {subject}",
    })

    const chain = prompt.pipe(model)

    return await chain.invoke({subject})
}

// kita akan memperbarui ini nanti untuk menambahkan streaming
const streamStory = async (storyTitle)=> {
    return new NextResponse(
        JSON.stringify( { data: "Dan di sinilah cerita dimulai..."}
),
       { headers: { 'content-type': 'application/json' },
    })
}

    return new NextResponse(
        JSON.stringify( { data: "Dan di sinilah cerita dimulai..."}
),
       { headers: { 'content-type': 'application/json' },
    })
}

export async function POST(req) {
    const { subject, storyTitle } = await req.json()
    // jika permintaan memiliki storyTitle maka kembalikan streamStory()

    if (storyTitle) {
        return streamStory(storyTitle)
    }
    // jika kita tidak memiliki storyTitle maka kembalikan satu
    const gptResponse = await makeStoryTitle(subject)

    return Response.json({data: gptResponse.text})
}
```

Dan beginilah tampilan aplikasi pada tahap ini:

## 3.3. Streaming respons

Dalam beberapa kasus, model AI dapat membutuhkan beberapa detik untuk menghasilkan respons lengkap terhadap prompt. Ini lebih lambat dari ambang batas ~200-300 ms di mana aplikasi terasa responsif bagi pengguna akhir.

Untuk membuat aplikasi terasa lebih responsif, kita perlu menunjukkan kemajuan perantara dan mengalirkan output akhir dalam potongan-potongan, menghasilkan setiap potongan segera setelah tersedia.

Tidak semua model mendukung streaming, jadi pastikan untuk memeriksa apakah model yang Anda gunakan mendukung fitur ini.

Saatnya menambahkan fitur streaming ke aplikasi generator cerita kita.

Perhatikan bahwa ini bukan interaksi permintaan-respons tunggal. Ini akan lebih seperti obrolan yang sedang berlangsung. Frontend akan terus meminta potongan respons LLM baru dan memperbarui hasil yang sedang berlangsung, sementara backend mengirimkan kembali potongan respons atau menunjukkan kapan aliran selesai.

Kita akan mulai dengan backend. Semua perubahan akan dilakukan di metode `streamStory()` yang telah kita definisikan pada langkah sebelumnya:

```javascript
// code/streaming/src/app/api/route.js

// sisanya tetap sama

// ...
const streamStory = async (storyTitle) => {
  const encoder = new TextEncoder()

  const stream = new TransformStream()
  const writer = stream.writable.getWriter()

  const model = new ChatOpenAI({
    openAIApiKey: process.env.OPENAI_API_KEY,
    temperature: 0.9,
    streaming: true,
    callbacks: [
      {
        handleLLMNewToken: async (token) => {
          await writer.ready
          await writer.write(encoder.encode(`${token}`))
        },
        handleLLMEnd: async () => {
          await writer.ready
          await writer.close()
        },
      },
    ],
  })

  const prompt = new PromptTemplate({
    inputVariables: ["storyTitle"],
    template: "Ceritakan kisah berjudul {storyTitle}",
  })

  const chain = prompt.pipe(model)
  chain.invoke({ storyTitle })

  return new NextResponse(stream.readable, {
    headers: { "Content-Type": "text/event-stream" },
  })
}
```

Pertama, kita perlu membuat chain baru yang menghasilkan isi cerita.

Instance model yang diteruskan ke chain ini memiliki dua pembaruan:

- flag `streaming` diaktifkan
- callback `handleLLMNewToken()` dan `handleLLMEnd()` diimplementasikan.

Untuk menjaga saluran komunikasi tetap terbuka setelah permintaan awal, tipe konten respons yang dikembalikan diatur ke `text/event-stream` alih-alih `application/json` standar.

Selain itu, di frontend, kita akan memodifikasi satu metode: `startStoryStream()`:

```javascript
// code/streaming/src/app/page.js

const startStoryStream = async () => {
  setStoryBody("")

  const response = await fetch("api", {
    method: "POST",
    body: JSON.stringify({ storyTitle }),
  })
  // pembaca akan bertindak sebagai "pipa" komunikasi data
  const reader = response.body.getReader()

  const decoder = new TextDecoder()
  // jaga koneksi tetap terbuka selama kita terus menerima potongan respons baru

  while (true) {
    const { value, done } = await reader.read()

    if (done) break

    const chunkValue = decoder.decode(value)
    // cara untuk menambahkan teks ke nilai string status React
    setStoryBody((prev) => prev + chunkValue)
  }
}

// sisanya tetap sama
// ...
```

Dengan perubahan UI terakhir ini, kita dapat menyaksikan cerita terungkap saat dihasilkan oleh LLM:

Jika Anda ingin melihat lebih dalam topik ini, dokumentasi LangChain memiliki panduan bagus tentang streaming, termasuk bagian ini tentang cara menghentikan proses streaming jika respons tidak sesuai dengan yang Anda inginkan.
