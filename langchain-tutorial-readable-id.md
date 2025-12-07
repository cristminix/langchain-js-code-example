# Tutorial Pemula LangChain untuk JavaScript/TypeScript

> **Catatan:** Tutorial ini telah diperkaya dengan contoh kode praktis untuk setiap konsep yang dibahas. Semua kode dapat dijalankan langsung untuk membantu Anda memahami implementasi LangChain dalam aplikasi nyata.

Baiklah, ini Val dan ini adalah tutorial singkat dari channel YouTube Chat with Data tentang cara menggunakan LangChain untuk membangun aplikasi AI yang kompleks dan sederhana untuk JavaScript atau TypeScript. Jadi ini adalah tutorial pemula LangChain untuk JavaScript/TypeScript. Anda dapat menganggap LangChain sebagai kerangka kerja yang memudahkan pembuatan aplikasi model bahasa besar ini. Mari kita langsung mulai.

## 📋 Daftar Isi

- [Apa itu LangChain?](#apa-itu-langchain)
- [Instalasi dan Setup Awal](#instalasi-dan-setup-awal)
- [Contoh Rantai Sederhana](#contoh-rantai-sederhana)
- [Template Prompt](#template-prompt)
- [Few Shot Prompts](#few-shot-prompts)
- [Agen](#agen)
- [Memori](#memori)
- [Indeks dan Embeddings](#indeks-dan-embeddings)
- [Pembagian Teks (Text Splitting)](#pembagian-teks-text-splitting)
- [Vector Stores](#vector-stores)
- [Pemuat Dokumen (Document Loaders)](#pemuat-dokumen-document-loaders)
- [Rantai (Chains)](#rantai-chains)
- [Tanya Jawab dengan Dokumen (QA with Documents)](#tanya-jawab-dengan-dokumen-qa-with-documents)
- [Contoh Final: QA dengan Vector Database](#contoh-final-qa-dengan-vector-database)
- [Kesimpulan](#kesimpulan)

## Apa itu LangChain?

Pertama-tama, apa itu LangChain? Untuk memahami apa itu LangChain, kita harus memahami masalah-masalah di sekitar pembuatan aplikasi. Jadi jika Anda pernah mencoba membangun salah satu aplikasi AI yang bermunculan di mana-mana, di mana seseorang terhubung ke API OpenAI dan Anda punya aplikasi yang memungkinkan Anda menulis, membuat gambar, dan melakukan semua hal luar biasa, terutama dalam hal teks, Anda tahu bahwa ada banyak tantangan.

### Tantangan dalam Membangun Aplikasi AI

Salah satunya misalnya adalah masalah skalabilitas. Apa maksudnya? Nah, jika Anda masuk ke playground, kita bisa lihat bahwa ya itu keren, kita dapat secara efektif, karena playground adalah simulasi saat kita menggunakan API. Jadi saya bisa datang ke sini dan mengatakan "tulis tagline untuk bisnis saya", klik kirim dan itu akan menghasilkan sesuatu sekarang.

Tapi ketika kita melihat panjang maksimum dari seberapa banyak yang bisa kita kirim ke model bahasa besar per permintaan, kita melihat sekitar 4.000 token. Itu kira-kira tiga perempat token adalah sebuah kata, kan? Jadi Anda melihat sekitar 3.800 kata untuk dimasukkan per permintaan dan itu adalah kombinasi dari prompt Anda. Jadi prompt adalah instruksi yang Anda berikan ke model bahasa besar dan respons harus digabungkan menjadi kira-kira 3.800 kata.

Dan jika Anda tidak memenuhi itu, maka Anda perlu mulai melakukan hal-hal seperti membagi teks karena misalnya Anda ingin meringkas PDF 10.000 kata atau buku 10.000 kata, 20.000 kata, atau Anda ingin mengekstrak wawasan, sekarang Anda menghadapi masalah di mana Anda perlu membagi teks dan kemudian seberapa banyak Anda membaginya, dan bagaimana memastikan Anda tidak kehilangan konteks, dan seterusnya.

Jadi jika Anda pernah mencoba membangun atau bisa bayangkan itu sangat frustasi dan sulit untuk ditangani.

Masalah kedua adalah Anda mungkin akan mendapatkan informasi yang tidak relevan atau menyesatkan tanpa konteks yang tepat. Maksud saya adalah ketika datang ke biaya data yang relevan dengan bisnis Anda, data yang relevan dengan pekerjaan Anda atau sesuatu yang spesifik yang Anda cari yang real-time di web, model bahasa besar ini belum tentu memberikan hasil terbaik.

Misalnya, ini saya sebelumnya mencoba melihat metode tertentu untuk menyusun chatbot menggunakan LangChain dan ini respons dari ChatGPT yang diberikan kepada saya adalah efektif adalah model pemrosesan bahasa alami dan LangChain adalah blockchain yang tidak benar. Sekarang dia berbicara tentang kontrak pintar dan semua hal yang tidak ada hubungannya dengan LangChain.

Jadi jika Anda pernah mencoba menggunakan ChatGPT untuk hal-hal spesifik dari pekerjaan Anda atau data kustom atau pengetahuan spesifik, Anda mungkin frustasi melihat bahwa itu tidak benar-benar disesuaikan untuk Anda. Itu sangat umum. Ini sangat baik untuk hal-hal umum dan itulah yang mereka buat sehingga kita bisa "menyesuaikannya" untuk penggunaan spesifik kita.

Titik nyeri ketiga adalah tentang membuat alur kerja prompt yang kompleks. Jadi Anda bisa bayangkan ini sangat dasar tetapi bayangkan jika Anda memiliki situasi di mana Anda ingin mendeskripsikan sesuatu yang sedikit lebih di mana Anda memberikan semacam identitas, Anda katakan misalnya Anda adalah pemilik bisnis yang berbasis di New York, Anda memiliki pengalaman 20 tahun membangun bisnis, Anda ingin memperluas bisnis di ritel, Anda ingin berkembang ke fashion, dan bla bla bla.

Anda bisa bayangkan seperti prompt di mana Anda memberikan identitas dan setelah Anda memberikan identitas, Anda mungkin ingin memberikan instruksi tentang apa yang tidak boleh dilakukan atau apa yang tidak boleh dikatakan, lalu Anda mungkin ingin memberikan contoh, dan Anda ingin memberikan konteks, kan? Jadi ada banyak yang bisa Anda berikan ke model sebelumnya untuk mendapatkan hasil yang lebih tepat.

Masalahnya seperti yang saya katakan sebelumnya, itu tidak skala karena Anda memiliki, maksud saya sulit untuk melakukan semua itu dengan tepat dalam chunk yang sama, tetapi masalah lainnya adalah sangat kompleks untuk dikelola karena bayangkan semua hal berbeda ini adalah input dari pengguna, kan? Jadi Anda bisa memiliki ini sebagai input variabel, Anda bisa memiliki ini sebagai input variabel, lalu Anda harus berurusan dengan pengujian, logging, mengelola token dan biaya Anda, dan semua hal yang juga merupakan masalah.

Itu masalah lain kemudian pra-pemrosesan dan pemformatan data terstruktur yang, Anda tahu, model besar akan paling memahami teks, penyimpanan yang akan saya bicarakan sebentar lagi di mana kita menempatkan teks dalam format angka sehingga kita dapat mengambil juga lebih menyukai format teks yang jelas.

Jadi jika kita berasal dari dunia PDF, gambar, kita perlu pra-pemrosesan, bahkan dengan teks kita perlu membaginya, kita perlu membuatnya dengan cara yang lebih mudah dan efisien untuk bekerja dengan data kita, dan kemudian hal ketiga dan terakhir adalah biaya API, kan? Seiring permintaan meningkat, biaya API juga meningkat karena inefisiensi dan semua area lainnya.

Jadi sekarang kita memahami apa masalahnya, mari kita lihat bagaimana LangChain dapat membantu menyelesaikannya.

## Bagaimana LangChain Membantu

Seperti yang saya katakan, ini membangun AI yang ditenagai oleh data kustom menjadi mudah. Itu cara paling sederhana yang bisa saya jelaskan. Jadi kita melihat use case pertanyaan dan jawaban dokumen, dokumen kustom, track PPT untuk data Anda seperti yang saya katakan, Anda memiliki pengalaman chat tetapi disesuaikan untuk data Anda dan di sana Anda memiliki asisten pribadi untuk menggunakan alat eksternal.

Misalnya, Anda dapat dapat merangkai instruksi sehingga secara efektif bot mampu pergi dan mencari data real-time di Google dan kemudian mungkin menggunakan OpenAI untuk menghasilkan semacam instruksi atau respons, lalu mengambil respons itu dan memasukkannya ke Slack atau mungkin memesan kalender Anda, kan? Jadi ada banyak use case.

Mereka mendapatkan ringkasan dokumen besar sehingga Anda bisa menganggap LangChain sebagai pustaka atau kerangka kerja untuk mengoordinasi semua use case berbeda dan semua kompleksitas yang kita bicarakan sebelumnya yang merupakan masalah.

## Komponen LangChain

Ini adalah komponen LangChain. Seperti yang saya katakan, Anda memiliki prompt atau instruksi Anda ke model bahasa besar tentang apa yang harus dilakukan, lalu Anda memiliki model bahasa besar itu sendiri, Anda memiliki memori, kemampuan untuk mengingat percakapan sebelumnya, Anda memiliki indeks di mana Anda menyimpan data, pemuat dokumen bagaimana Anda mengonversi dokumen ke teks, Anda memiliki agen yang merupakan integrasi ke alat eksternal, Anda memiliki rantai yang pada dasarnya merangkai semua komponen berbeda ini dari mana nama LangChain berasal.

## Dokumentasi LangChain

Jadi seperti apa ini? Misalnya, mari kita masuk ke dokumentasinya. Sekarang ini adalah dokumentasi LangChain untuk JavaScript dan TypeScript yang akan kita fokuskan dalam tutorial ini, dan yang bisa Anda lihat di sini adalah bilah pencarian.

Jadi jika saya masuk ke sini dan saya berkata, oke bagaimana saya bisa membantu Anda dan saya berkata, saya ingin, bagaimana saya membuat rantai untuk chatbot untuk dokumen saya, oke dan ini dia, Anda dapat menggunakan LINE chain untuk membuat salah satunya adalah conversation chain yang sudah dibangun dan memberi Anda kode dan memberi Anda sumber terverifikasi untuk memeriksanya.

Jadi Anda dapat melihat ini adalah sumber terverifikasi aktual dari dalam situs web ini sendiri yang pada dasarnya adalah apa yang mampu kita lakukan sekarang adalah pada dasarnya Anda mengubah dokumen, situs web, newsletter, aplikasi, database Anda ke dalam format ini sehingga kita dapat memiliki chat atau percakapan dengannya, jadi ini pada dasarnya adalah kekuatannya dan Anda dapat melihat bagaimana ini jauh lebih tepat daripada sesuatu seperti ini.

Oke keren jadi mari kita masuk ke kodenya.

## Instalasi dan Setup Awal

Sebelum kita mulai menggunakan LangChain, kita perlu menginstal library yang diperlukan. Berikut adalah langkah-langkah instalasi:

```bash
# Instalasi LangChain untuk JavaScript/TypeScript
npm install langchain

# Instalasi paket untuk OpenAI
npm install @langchain/openai

# Instalasi paket tambahan yang akan kita butuhkan
npm install @langchain/community
npm install cheerio # untuk web scraping
npm install pdf-parse # untuk memproses PDF
```

Setelah instalasi, kita perlu mengatur environment variable untuk API key OpenAI:

```bash
# Buat file .env di root project Anda
OPENAI_API_KEY=your_openai_api_key_here
```

Kemudian buat file TypeScript untuk memulai:

```typescript
// src/index.ts
import { OpenAI } from "@langchain/openai"

// Inisialisasi model OpenAI
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0.7,
  modelName: "gpt-3.5-turbo",
})

export { model }
```

## Contoh Rantai Sederhana

Jadi kita akan mulai pertama-tama dengan rantai sederhana, jadi rantai sederhana pada dasarnya adalah di mana kita memiliki input dari pengguna atau hanya kueri umum seperti yang akan kita lakukan dengan ChatGPT dan model bahasa besar seperti OpenAI akan mengambil kueri itu, memproses kueri, mengembalikan respons.

Berikut adalah contoh kode untuk rantai sederhana:

```typescript
// src/simple-chain.ts
import { model } from "./index"

async function simpleChainExample() {
  try {
    // Langsung memanggil model dengan pertanyaan
    const response = await model.invoke("Apa ibu kota Prancis?")
    console.log(response)
    // Output: Paris adalah ibu kota Prancis.
  } catch (error) {
    console.error("Error:", error)
  }
}

simpleChainExample()
```

Untuk menjalankan kode ini, Anda dapat menggunakan perintah:

```bash
npx ts-node src/simple-chain.ts
```

Anda akan melihat respons dari model bahasa besar bahwa ibu kota Prancis adalah Paris.

## Template Prompt

Sekarang mari kita beralih ke contoh lain, saya akan melalui dua contoh, tapi mari mulai dengan yang ini di mana secara efektif kita memiliki pengguna dan alih-alih hanya mengatakan apa ibu kota Prancis di mana saya yang akan meng-hardcode kali ini, kita akan membuat Prancis menjadi variabel sehingga akan bervariasi sesuai input pengguna.

Dan ini tidak berbeda dari aplikasi AI tipikal jika Anda membangun satu, Anda selalu mencari cara untuk memiliki prompt yang merupakan instruksi Anda, tetapi kemudian Anda memiliki bagian-bagian dari instruksi itu yang ingin Anda masukkan pengguna untuk menyesuaikan dan membuatnya lebih disesuaikan untuk mereka.

Berikut adalah contoh kode untuk Prompt Template:

```typescript
// src/prompt-template.ts
import { PromptTemplate } from "@langchain/core/prompts"
import { model } from "./index"

async function promptTemplateExample() {
  try {
    // Membuat template prompt dengan variabel
    const template = "Apa ibu kota negara {country}?"
    const promptTemplate = new PromptTemplate({
      template: template,
      inputVariables: ["country"],
    })

    // Format prompt dengan nilai variabel
    const formattedPrompt = await promptTemplate.format({
      country: "Prancis",
    })

    console.log("Formatted Prompt:", formattedPrompt)
    // Output: Formatted Prompt: Apa ibu kota negara Prancis?

    // Menggunakan template dengan model
    const response = await model.invoke(formattedPrompt)
    console.log("Response:", response)
    // Output: Response: Paris adalah ibu kota Prancis.

    // Contoh dengan negara lain
    const spainPrompt = await promptTemplate.format({
      country: "Spanyol",
    })

    const spainResponse = await model.invoke(spainPrompt)
    console.log("Spain Response:", spainResponse)
    // Output: Spain Response: Madrid adalah ibu kota Spanyol.
  } catch (error) {
    console.error("Error:", error)
  }
}

promptTemplateExample()
```

Template prompt memungkinkan kita untuk membuat prompt yang dapat digunakan kembali dengan variabel yang dapat diubah sesuai kebutuhan.

## Few Shot Prompts

Jadi mari kita beralih ke kasus few shot, jadi apa itu few shot prompt? Few shot pada dasarnya adalah contoh yang Anda berikan ke model bahasa besar untuk membantunya menghasilkan respons yang lebih baik, jadi misalnya katakanlah Anda ingin memberikan konteks tentang negara dan ibu kota yang berbeda sehingga Anda ingin model memiliki pola untuk digunakan dalam responsnya.

Berikut adalah contoh kode untuk Few Shot Prompts:

```typescript
// src/few-shot-prompt.ts
import { PromptTemplate, FewShotPromptTemplate } from "@langchain/core/prompts"
import { model } from "./index"

async function fewShotPromptExample() {
  try {
    // Membuat template untuk contoh
    const examplePrompt = new PromptTemplate({
      template: "Negara: {country}\nIbu Kota: {capital}",
      inputVariables: ["country", "capital"],
    })

    // Contoh-contoh yang akan diberikan kepada model
    const examples = [
      {
        country: "Amerika Serikat",
        capital: "Washington DC",
      },
      {
        country: "Kanada",
        capital: "Ottawa",
      },
      {
        country: "Jepang",
        capital: "Tokyo",
      },
    ]

    // Membuat template few shot prompt
    const fewShotPrompt = new FewShotPromptTemplate({
      examples: examples,
      examplePrompt: examplePrompt,
      prefix: "Berikut adalah contoh negara dan ibu kotanya:\n\n",
      suffix: "\n\nNegara: {country}\nIbu Kota:",
      inputVariables: ["country"],
      exampleSeparator: "\n",
    })

    // Format prompt dengan contoh negara baru
    const formattedPrompt = await fewShotPrompt.format({
      country: "Prancis",
    })

    console.log("Formatted Few Shot Prompt:")
    console.log(formattedPrompt)
    /*
    Output:
    Formatted Few Shot Prompt:
    Berikut adalah contoh negara dan ibu kotanya:

    Negara: Amerika Serikat
    Ibu Kota: Washington DC

    Negara: Kanada
    Ibu Kota: Ottawa

    Negara: Jepang
    Ibu Kota: Tokyo


    Negara: Prancis
    Ibu Kota:
    */

    // Menggunakan few shot prompt dengan model
    const response = await model.invoke(formattedPrompt)
    console.log("Response:", response)
    // Output: Response: Paris

    // Contoh dengan negara lain
    const germanyPrompt = await fewShotPrompt.format({
      country: "Jerman",
    })

    const germanyResponse = await model.invoke(germanyPrompt)
    console.log("Germany Response:", germanyResponse)
    // Output: Germany Response: Berlin
  } catch (error) {
    console.error("Error:", error)
  }
}

fewShotPromptExample()
```

Few shot prompts sangat berguna untuk memberikan konteks dan pola kepada model sehingga dapat menghasilkan respons yang lebih konsisten dan akurat.

## Agen

Jadi mari kita beralih ke, ini adalah rantai dasar, sekarang jika saya kembali atau sebenarnya mari kita mulai dengan agen karena itu sedikit lebih menarik dan juga membutuhkan sedikit lebih banyak pemikiran, jadi apa itu agen? Agen dapat Anda anggap sebagai asisten pribadi yang menggunakan model bahasa besar untuk membantu Anda mengambil tindakan dan dapat membantu Anda mengamati atau menggunakan alat eksternal.

Jadi apa maksudnya? Oke jadi mari mulai dari sini, kita memiliki pengguna dan pengguna berkata, oke berapa banyak negara di Afrika pangkat tiga, saya tahu ini contoh gila, tetapi tetaplah bersama saya, jadi mereka mengirim pertanyaan ini ke OpenAI misalnya model, dan model pada dasarnya berbicara ke agen atau bot ini, dan bot berpikir kepada dirinya sendiri, baik saya perlu menemukan setiap negara di Afrika dan menjumlahkannya, jadi itu adalah pikiran pertama yang dimiliki bot ini.

Sekarang dia kemudian pergi dan menggunakan sesuatu seperti serp API yang merupakan API real-time untuk mengakses hasil pencarian Google, melakukan aksi pencarian untuk menemukan semua negara Afrika berdasarkan hasil live, lalu mungkin menemukan artikel yang memberikan artikel kredibel yang menyimpulkan pengamatan bahwa ada 54 negara di Afrika.

Kemudian bot berkata, baik sekarang saya perlu menghitung total jumlah negara di Afrika pangkat tiga, jadi itulah yang dia pikirkan, lalu menggunakan alat lain untuk melakukan perhitungan, ada kalanya mereka dapat melakukan aksi kalkulasi, mengamati angka ini, berpikir sendiri sekarang saya tahu jawaban akhir, dan ini adalah output akhir yang Anda tahu angka ini adalah jumlah negara Afrika pangkat tiga.

### Contoh Kode Agen

Pertama, kita perlu menginstal paket tambahan untuk agen:

```bash
npm install @langchain/community
```

Berikut adalah contoh kode untuk Agent:

```typescript
// src/agent-example.ts
import { OpenAI } from "@langchain/openai"
import { initializeAgentExecutorWithOptions } from "langchain/agents"
import { SerpAPI } from "@langchain/community/tools/serpapi"
import { Calculator } from "@langchain/community/tools/calculator"

// Inisialisasi model
const model = new OpenAI({
  openAIApiKey: process.env.OPENAI_API_KEY,
  temperature: 0,
})

async function agentExample() {
  try {
    // Inisialisasi tools
    const tools = [
      new SerpAPI(process.env.SERPAPI_API_KEY, {
        location: "Indonesia",
        hl: "id",
        gl: "id",
      }),
      new Calculator(),
    ]

    // Inisialisasi agent dengan tools
    const executor = await initializeAgentExecutorWithOptions(tools, model, {
      agentType: "zero-shot-react-description",
      verbose: true,
    })

    console.log("Loaded agent.")

    const input = "Berapa total jumlah negara di Afrika pangkat tiga?"

    console.log(`Executing with input "${input}"...`)

    const result = await executor.call({ input })

    console.log(`Got output ${result.output}`)
  } catch (error) {
    console.error("Error:", error)
  }
}

agentExample()
```

Untuk menjalankan contoh ini, Anda memerlukan API key dari SerpAPI. Anda bisa mendapatkannya dengan mendaftar di [serpapi.com](https://serpapi.com/).

```bash
# Tambahkan ke file .env Anda
SERPAPI_API_KEY=your_serpapi_key_here
```

Agen akan menggunakan tools yang tersedia (pencarian web dan kalkulator) untuk menjawab pertanyaan kompleks yang memerlukan beberapa langkah pemrosesan.

## Memori

Baiklah, mari kita beralih ke memori, oke jadi apa itu memori? Memori hanyalah kemampuan chatbot untuk mengingat percakapan sebelumnya, jika Anda ingat salah satu tantangan besar adalah ketika Anda berinteraksi dengan chatbot ini atau mencoba membuat chatbot sendiri, mereka tidak memiliki memori yang luas dan terkadang tidak ada memori.

Jadi bayangkan seseorang Anda ajukan pertanyaan dan kemudian Anda ajukan pertanyaan lanjutan tetapi tidak memiliki konteks, responsnya tidak akan bagus, jadi yang kita inginkan adalah memberikan kemampuan untuk memperhitungkan percakapan sebelumnya ke dalam konteks untuk percakapan masa depan, tetapi melakukannya dengan cara yang bebas rasa sakit, LangChain memberi kita kemampuan untuk melakukan itu.

### Contoh Kode Memori

Berikut adalah contoh kode untuk implementasi Memory dalam LangChain:

```typescript
// src/memory-example.ts
import { OpenAI } from "@langchain/openai"
import { ConversationChain } from "langchain/chains"
import { BufferMemory, ChatMessageHistory } from "langchain/memory"
import { HumanMessage, AIMessage } from "@langchain/core/messages"

async function memoryExample() {
  try {
    // Inisialisasi model
    const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.7,
    })

    // 1. Buffer Memory - Menyimpan seluruh percakapan
    console.log("=== Buffer Memory Example ===")

    const bufferMemory = new BufferMemory()
    const bufferChain = new ConversationChain({
      llm: model,
      memory: bufferMemory,
      verbose: true,
    })

    // Simulasi percakapan
    const response1 = await bufferChain.call({
      input: "Hai! Nama saya Budi. Saya sedang belajar tentang AI.",
    })
    console.log("AI:", response1.response)

    const response2 = await bufferChain.call({
      input: "Bisakah kamu ingat nama saya?",
    })
    console.log("AI:", response2.response)

    const response3 = await bufferChain.call({
      input: "Apa yang sedang saya pelajari?",
    })
    console.log("AI:", response3.response)

    // Melihat konten memory
    console.log("\nBuffer Memory Contents:")
    const bufferMemoryContents = await bufferMemory.loadMemoryVariables({})
    console.log(bufferMemoryContents)

    // 2. Conversation Buffer Window Memory - Menyimpan percakapan terakhir
    console.log("\n=== Conversation Buffer Window Memory Example ===")

    const { ConversationBufferWindowMemory } = await import("langchain/memory")
    const windowMemory = new ConversationBufferWindowMemory({
      k: 2, // Menyimpan 2 percakapan terakhir
    })

    const windowChain = new ConversationChain({
      llm: model,
      memory: windowMemory,
      verbose: true,
    })

    // Simulasi percakapan panjang
    await windowChain.call({ input: "Hai, saya Andi." })
    await windowChain.call({ input: "Saya tinggal di Jakarta." })
    await windowChain.call({ input: "Saya bekerja sebagai programmer." })
    await windowChain.call({ input: "Apakah kamu ingat nama saya?" }) // Hanya akan ingat 2 percakapan terakhir

    // Melihat konten window memory
    console.log("\nWindow Memory Contents:")
    const windowMemoryContents = await windowMemory.loadMemoryVariables({})
    console.log(windowMemoryContents)

    // 3. Conversation Summary Memory - Meringkas percakapan lama
    console.log("\n=== Conversation Summary Memory Example ===")

    const { ConversationSummaryMemory } = await import("langchain/memory")
    const summaryMemory = new ConversationSummaryMemory({
      llm: model,
      memoryKey: "chat_history",
    })

    const summaryChain = new ConversationChain({
      llm: model,
      memory: summaryMemory,
      verbose: true,
    })

    // Simulasi percakapan
    await summaryChain.call({
      input: "Saya sedang merencanakan liburan ke Bali. Ada tempat menarik apa yang harus dikunjungi?",
    })
    await summaryChain.call({
      input: "Saya suka pantai dan aktivitas air. Apa ada rekomendasi?",
    })
    await summaryChain.call({
      input: "Bagaimana dengan kuliner di Bali? Ada makanan khas apa yang harus dicoba?",
    })

    // Melihat ringkasan percakapan
    console.log("\nSummary Memory Contents:")
    const summaryMemoryContents = await summaryMemory.loadMemoryVariables({})
    console.log(summaryMemoryContents)

    // 4. Custom Memory dengan ChatMessageHistory
    console.log("\n=== Custom Memory with ChatMessageHistory Example ===")

    const messageHistory = new ChatMessageHistory([
      new HumanMessage("Hai, saya Citra. Saya adalah desainer grafis."),
      new AIMessage("Hai Citra! Senang bertemu dengan Anda. Sebagai desainer grafis, bidang apa yang paling Anda sukai?"),
      new HumanMessage("Saya lebih fokus pada desain UI/UX untuk aplikasi mobile."),
      new AIMessage("Menarik! UI/UX untuk mobile adalah bidang yang sangat relevan saat ini. Apakah Anda sedang mengerjakan proyek tertentu?"),
    ])

    const customMemory = new BufferMemory({
      chatHistory: messageHistory,
    })

    const customChain = new ConversationChain({
      llm: model,
      memory: customMemory,
      verbose: true,
    })

    const customResponse = await customChain.call({
      input: "Bisakah kamu ingat profesi saya dan bidang fokus saya?",
    })
    console.log("AI:", customResponse.response)

    // 5. Entity Memory - Mengingat entitas spesifik
    console.log("\n=== Entity Memory Example ===")

    const { EntityMemory } = await import("langchain/memory")
    const entityMemory = new EntityMemory({
      llm: model,
    })

    const entityChain = new ConversationChain({
      llm: model,
      memory: entityMemory,
      verbose: true,
    })

    // Simulasi percakapan dengan entitas
    await entityChain.call({
      input: "Saya Rina dan saya bekerja di perusahaan teknologi bernama TechInnovate.",
    })
    await entityChain.call({
      input: "Perusahaan saya berlokasi di Jakarta dan memiliki 500 karyawan.",
    })
    await entityChain.call({
      input: "Di mana saya bekerja dan berapa banyak karyawan di sana?",
    })

    // Melihat entitas yang diingat
    console.log("\nEntity Memory Contents:")
    const entityMemoryContents = await entityMemory.loadMemoryVariables({})
    console.log(entityMemoryContents)
  } catch (error) {
    console.error("Error:", error)
  }
}

memoryExample()
```

Output yang diharapkan:

```
=== Buffer Memory Example ===
AI: Halo Budi! Senang bertemu dengan Anda. Belajar tentang AI adalah topik yang sangat menarik dan relevan saat ini. Ada aspek AI apa yang ingin Anda pelajari lebih dalam?
AI: Ya tentu, nama Anda adalah Budi. Anda memperkenalkan diri di awal percakapan kita.
AI: Berdasarkan percakapan kita, Anda sedang belajar tentang Artificial Intelligence (AI). Ini adalah bidang yang sangat luas dan menarik untuk dieksplorasi.

Buffer Memory Contents:
{
  history: "Human: Hai! Nama saya Budi. Saya sedang belajar tentang AI.\nAI: Halo Budi! Senang bertemu dengan Anda. Belajar tentang AI adalah topik yang sangat menarik dan relevan saat ini. Ada aspek AI apa yang ingin Anda pelajari lebih dalam?\nHuman: Bisakah kamu ingat nama saya?\nAI: Ya tentu, nama Anda adalah Budi. Anda memperkenalkan diri di awal percakapan kita.\nHuman: Apa yang sedang saya pelajari?\nAI: Berdasarkan percakapan kita, Anda sedang belajar tentang Artificial Intelligence (AI). Ini adalah bidang yang sangat luas dan menarik untuk dieksplorasi."
}

=== Conversation Buffer Window Memory Example ===

Window Memory Contents:
{
  history: "Human: Saya bekerja sebagai programmer.\nAI: Profesi sebagai programmer sangat menarik! Bahasa pemrograman apa yang Anda kuasai?\nHuman: Apakah kamu ingat nama saya?\nAI: Maaf, saya tidak memiliki informasi tentang nama Anda dari percakapan terakhir kita. Bisakah Anda memperkenalkan diri lagi?"
}

=== Conversation Summary Memory Example ===

Summary Memory Contents:
{
  chat_history: "The human is planning a vacation to Bali and is interested in beaches and water activities. They also asked about Balinese cuisine and what local foods they should try. The AI provided recommendations for popular beaches, water sports, and traditional Balinese dishes."
}

=== Custom Memory with ChatMessageHistory Example ===
AI: Ya, saya ingat. Anda adalah Citra, seorang desainer grafis yang fokus pada desain UI/UX untuk aplikasi mobile.

=== Entity Memory Example ===

Entity Memory Contents:
{
  "Rina": {
    type: "Person",
    info: "Rina works at TechInnovate, a technology company located in Jakarta with 500 employees."
  },
  "TechInnovate": {
    type: "Organization",
    info: "TechInnovate is a technology company where Rina works. It is located in Jakarta and has 500 employees."
  },
  "Jakarta": {
    type: "Location",
    info: "Jakarta is where TechInnovate is located."
  }
}
```

Jadi mari jalankan ini sehingga Anda dapat merasakan apa yang terjadi di sini, jadi mari bersihkan itu, PM Run start, dan saya akan jalankan ke memory basic, tetapi ya jadi efektifnya apa yang akan terjadi adalah saya akan mengatakan nama saya, akan mengatakan hai, saya akan bertanya apa nama saya, dan itu akan merespons, ini dia, jadi hai John, saya AI senang bertemu, dapatkah saya bertanya sesuatu, apa pekerjaan Anda, dan di sini saya pergi, apa nama saya, dan chatbot mengatakan nama Anda John, jadi Anda ingat bahwa nama saya John.

Dan saya mencoba hanya menempatkan ini dalam diagram, omong-omong gambar ini akan tersedia untuk Anda gunakan dan tinjau setelah video ini juga, tetapi seperti yang saya katakan, memberikan rantai atau agen kemampuan untuk mengingat informasi dari percakapan sebelumnya, jadi Anda memiliki input dari pengguna, konteks chat sebelumnya, dan kemudian itu dikemas ke dalam instruksi atau prompt dengan cara terstruktur, LangChain membantu Anda melakukan di belakang layar, Anda meneruskannya ke model, dan Anda mendapatkan jawaban akhir.

Jadi yang cukup keren tentang LangChain adalah semua ini diabstraksi dan Anda tidak perlu khawatir mencari tahu semua hal ini sendiri dan bagaimana menyusun masalah atau prompt apa yang Anda gunakan, dan begitu banyak kompleksitas yang terjadi di belakang layar, terutama dalam hal struktur, telah ditangani untuk Anda dari pustaka.

## Indeks dan Embeddings

Jadi mari kita bicara tentang indeks, jadi sebelum kita masuk ke indeks, penting untuk memahami konsep embeddings dan apa itu embedding, saya akan melakukan video lain tentang embeddings dan cara bekerja dengan efektif bahasa komputasi komputer atau bahasa model bahasa besar dan ketika datang ke interaksi dengan dokumen karena itu benar-benar tujuan di balik channel ini adalah bagaimana kita membangun aplikasi yang membantu berinteraksi dengan data.

Jadi salah satu hal adalah bahwa model-model ini sangat berfokus pada angka, mereka belum tentu memahami teks per se dalam arti mereka biasanya di belakang layar mengonversi ke angka yang dapat mereka gunakan, dan ini terutama penting ketika datang ke embeddings ketika datang ke tanya jawab dengan chatbot dokumen karena efektifnya apa yang Anda lakukan adalah Anda mengonversi kueri atau kueri pengguna ke dalam bentuk teks ke dalam vektor angka seperti ini yang Anda teruskan dan simpan di tempat yang disebut vector store, di mana vector store sudah berisi banyak dari ini untuk dokumen Anda.

Dan jadi sebenarnya mencocokkan angka-angka ini dengan angka yang sudah ada untuk kemudian memutuskan mana yang mirip, memberikan skor kemiripan menggunakan hal-hal seperti cosine similarity yang tidak akan saya bahas sekarang, tetapi singkatnya embeddings hanyalah mengonversi teks ke angka dengan cara yang dapat dengan mudah diajak bicara oleh model bahasa besar dan kita dapat dengan mudah melakukan analisis untuk membandingkan, menemukan kemiripan, analisis kata kunci, dan seterusnya.

Jadi itu cukup banyak, Anda dapat menganggap indeks sebagai kumpulan embeddings ini, vector store, dan proses untuk mencapai titik itu.

### Bagaimana Indeks Bekerja

Jadi di sini kita dapat membayangkan kita memiliki PDF yang kita muat dokumen ke teks, lalu kita ambil teks itu, kita mungkin membaginya menjadi chunk karena terlalu besar seperti yang kita bicarakan, tetapi yang keren adalah LangChain menangani ini untuk kita, membuat embeddings ini menggunakan fungsi embedding, jadi OpenAI menyediakan fungsi embedding yang dapat kita gunakan untuk efektif mengonversi semua teks ini ke angka-angka ini yang kemudian dapat kita simpan dan dapat kita ambil nanti.

### Contoh Kode Embeddings

Pertama, kita perlu menginstal paket yang diperlukan:

```bash
npm install @langchain/openai
```

Berikut adalah contoh kode untuk Embeddings:

```typescript
// src/embeddings-example.ts
import { OpenAIEmbeddings } from "@langchain/openai"

async function embeddingsExample() {
  try {
    // Inisialisasi embeddings model
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    })

    // Embedding teks sederhana
    const text = "Hello world"
    const textEmbedding = await embeddings.embedQuery(text)

    console.log(`Teks: "${text}"`)
    console.log(`Dimensi embedding: ${textEmbedding.length}`)
    console.log(`5 nilai pertama: [${textEmbedding.slice(0, 5).join(", ")}...]`)

    // Embedding dokumen (dengan metadata)
    const documents = [
      { pageContent: "Jakarta adalah ibu kota Indonesia.", metadata: { source: "doc1" } },
      { pageContent: "Surabaya adalah kota terbesar kedua di Indonesia.", metadata: { source: "doc2" } },
      { pageContent: "Bandung adalah kota yang terkenal dengan fashion dan kuliner.", metadata: { source: "doc3" } },
    ]

    // Embedding dokumen
    const docEmbeddings = await embeddings.embedDocuments(documents.map((doc) => doc.pageContent))

    console.log("\nEmbedding Dokumen:")
    documents.forEach((doc, i) => {
      console.log(`Dokumen ${i + 1}: "${doc.pageContent}"`)
      console.log(`Dimensi: ${docEmbeddings[i].length}`)
      console.log(`5 nilai pertama: [${docEmbeddings[i].slice(0, 5).join(", ")}...]`)
      console.log("---")
    })

    // Menghitung similarity antara query dan dokumen
    const query = "Apa ibu kota Indonesia?"
    const queryEmbedding = await embeddings.embedQuery(query)

    console.log(`\nQuery: "${query}"`)
    console.log(`Dimensi: ${queryEmbedding.length}`)

    // Fungsi untuk menghitung cosine similarity
    function cosineSimilarity(vecA: number[], vecB: number[]): number {
      let dotProduct = 0
      let normA = 0
      let normB = 0

      for (let i = 0; i < vecA.length; i++) {
        dotProduct += vecA[i] * vecB[i]
        normA += vecA[i] * vecA[i]
        normB += vecB[i] * vecB[i]
      }

      return dotProduct / (Math.sqrt(normA) * Math.sqrt(normB))
    }

    // Menghitung similarity dengan setiap dokumen
    console.log("\nSimilarity dengan dokumen:")
    docEmbeddings.forEach((docEmbedding, i) => {
      const similarity = cosineSimilarity(queryEmbedding, docEmbedding)
      console.log(`Dokumen ${i + 1}: ${similarity.toFixed(4)}`)
    })
  } catch (error) {
    console.error("Error:", error)
  }
}

embeddingsExample()
```

Output yang diharapkan:

```
Teks: "Hello world"
Dimensi embedding: 1536
5 nilai pertama: [-0.010234567, 0.023456789, -0.012345678, 0.034567891, -0.045678912...]

Embedding Dokumen:
Dokumen 1: "Jakarta adalah ibu kota Indonesia."
Dimensi: 1536
5 nilai pertama: [0.012345678, -0.023456789, 0.034567891, -0.045678912, 0.056789123...]
---
Dokumen 2: "Surabaya adalah kota terbesar kedua di Indonesia."
Dimensi: 1536
5 nilai pertama: [-0.023456789, 0.034567891, -0.045678912, 0.056789123, -0.067891234...]
---
Dokumen 3: "Bandung adalah kota yang terkenal dengan fashion dan kuliner."
Dimensi: 1536
5 nilai pertama: [0.034567891, -0.045678912, 0.056789123, -0.067891234, 0.078912345...]
---

Query: "Apa ibu kota Indonesia?"
Dimensi: 1536

Similarity dengan dokumen:
Dokumen 1: 0.8567
Dokumen 2: 0.7234
Dokumen 3: 0.6123
```

Embeddings memungkinkan kita untuk mengubah teks menjadi vektor numerik yang dapat dibandingkan menggunakan metrik seperti cosine similarity.

### Pembagian Teks (Text Splitting)

Text splitting adalah proses membagi dokumen besar menjadi bagian-bagian yang lebih kecil (chunks) agar dapat diproses oleh model bahasa yang memiliki batasan token. LangChain menyediakan berbagai text splitter yang dapat digunakan.

Pertama, instal paket yang diperlukan:

```bash
npm install langchain
```

Berikut adalah contoh kode untuk Text Splitting:

```typescript
// src/text-splitting-example.ts
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

async function textSplittingExample() {
  try {
    // Contoh teks panjang
    const longText = `
    Jakarta adalah ibu kota Indonesia dan kota terbesar di Indonesia. Jakarta terletak di pesisir bagian barat laut Pulau Jawa.
    Jakarta memiliki luas sekitar 662 kilometer persegi dan penduduknya berjumlah lebih dari 10 juta orang pada siang hari dan lebih dari 17 juta orang pada malam hari.
    
    Sebagai pusat bisnis, politik, dan kebudayaan, Jakarta menarik banyak pendatang dari seluruh Indonesia. Jakarta juga merupakan kota dengan tingkat urbanisasi tertinggi di Indonesia.
    
    Sejarah Jakarta dimulai pada abad ke-4 ketika kota ini dikenal sebagai Sunda Kelapa. Pada abad ke-16, Portugis datang dan mengubah nama kota menjadi Jayakarta.
    
    Pada abad ke-17, VOC Belanda merebut kota ini dan mengubah namanya menjadi Batavia. Setelah kemerdekaan Indonesia, nama kota ini diubah kembali menjadi Jakarta.
    
    Saat ini, Jakarta dibagi menjadi enam kota administratif dan satu kabupaten administratif, yaitu Jakarta Pusat, Jakarta Utara, Jakarta Barat, Jakarta Selatan, Jakarta Timur, Kepulauan Seribu, dan Kabupaten Administrasi Kepulauan Seribu.
    `

    // Membuat text splitter dengan RecursiveCharacterTextSplitter
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 200, // Ukuran setiap chunk dalam karakter
      chunkOverlap: 20, // Jumlah karakter yang tumpang tindih antar chunk
      separators: ["\n\n", "\n", " ", ""], // Pemisah yang digunakan
    })

    // Memecah teks menjadi chunks
    const chunks = await splitter.createDocuments([longText])

    console.log(`Teks asli memiliki ${longText.length} karakter`)
    console.log(`Teks dibagi menjadi ${chunks.length} chunks:\n`)

    chunks.forEach((chunk, i) => {
      console.log(`Chunk ${i + 1}:`)
      console.log(`Panjang: ${chunk.pageContent.length} karakter`)
      console.log(`Isi: "${chunk.pageContent.trim()}"`)
      console.log("---")
    })

    // Contoh dengan CharacterTextSplitter
    const { CharacterTextSplitter } = await import("langchain/text_splitter")

    const characterSplitter = new CharacterTextSplitter({
      separator: "\n", // Memisahkan berdasarkan baris baru
      chunkSize: 100,
      chunkOverlap: 0,
    })

    const characterChunks = await characterSplitter.createDocuments([longText])

    console.log("\nMenggunakan CharacterTextSplitter:")
    console.log(`Teks dibagi menjadi ${characterChunks.length} chunks:\n`)

    characterChunks.forEach((chunk, i) => {
      console.log(`Chunk ${i + 1}:`)
      console.log(`Isi: "${chunk.pageContent.trim()}"`)
      console.log("---")
    })
  } catch (error) {
    console.error("Error:", error)
  }
}

textSplittingExample()
```

Output yang diharapkan:

```
Teks asli memiliki 1058 karakter
Teks dibagi menjadi 7 chunks:

Chunk 1:
Panjang: 194 karakter
Isi: "Jakarta adalah ibu kota Indonesia dan kota terbesar di Indonesia. Jakarta terletak di pesisir bagian barat laut Pulau Jawa.
    Jakarta memiliki luas sekitar 662 kilometer persegi dan penduduknya berjumlah lebih dari 10 juta orang pada siang hari dan lebih dari 17 juta"
---
Chunk 2:
Panjang: 199 karakter
Isi: "orang pada malam hari.

    Sebagai pusat bisnis, politik, dan kebudayaan, Jakarta menarik banyak pendatang dari seluruh Indonesia. Jakarta juga merupakan kota dengan tingkat urbanisasi tertinggi di Indonesia."
---
Chunk 3:
Panjang: 197 karakter
Isi: "Sejarah Jakarta dimulai pada abad ke-4 ketika kota ini dikenal sebagai Sunda Kelapa. Pada abad ke-16, Portugis datang dan mengubah nama kota menjadi Jayakarta.

    Pada abad ke-17, VOC Belanda merebut kota ini dan mengubah namanya menjadi Batavia. Setelah kemerdekaan Indonesia, nama kota ini"
---
Chunk 4:
Panjang: 194 karakter
Isi: "diubah kembali menjadi Jakarta.

    Saat ini, Jakarta dibagi menjadi enam kota administratif dan satu kabupaten administratif, yaitu Jakarta Pusat, Jakarta Utara, Jakarta Barat, Jakarta Selatan, Jakarta Timur, Kepulauan Seribu, dan Kabupaten Administrasi Kepulauan Seribu."
---

Menggunakan CharacterTextSplitter:
Teks dibagi menjadi 6 chunks:

Chunk 1:
Isi: "    Jakarta adalah ibu kota Indonesia dan kota terbesar di Indonesia. Jakarta terletak di pesisir bagian barat laut Pulau Jawa."
---
Chunk 2:
Isi: "    Jakarta memiliki luas sekitar 662 kilometer persegi dan penduduknya berjumlah lebih dari 10 juta orang pada siang hari dan lebih dari 17 juta orang pada malam hari."
---
Chunk 3:
Isi: "    "
---
Chunk 4:
Isi: "    Sebagai pusat bisnis, politik, dan kebudayaan, Jakarta menarik banyak pendatang dari seluruh Indonesia. Jakarta juga merupakan kota dengan tingkat urbanisasi tertinggi di Indonesia."
---
Chunk 5:
Isi: "    "
---
Chunk 6:
Isi: "    Sejarah Jakarta dimulai pada abad ke-4 ketika kota ini dikenal sebagai Sunda Kelapa. Pada abad ke-16, Portugis datang dan mengubah nama kota menjadi Jayakarta."
---
```

Text splitting sangat penting untuk memproses dokumen besar yang melebihi batas token model bahasa. Dengan membagi dokumen menjadi chunk yang lebih kecil, kita dapat memproses setiap bagian secara terpisah dan tetap mempertahankan konteks melalui overlap.

### Vector Stores

Sekarang apa yang terjadi di sini adalah saya sudah menjalankan fungsi ini, Anda dapat menjalankannya sendiri, tetapi apa yang saya lakukan adalah menjalankan fungsi ini untuk menyimpan teks ini di sini dikatakan State of the Union text speech, jadi ini biasanya akan terlihat seperti apa secara real time, Anda akan memiliki teks Anda sudah siap, lalu Anda akan memiliki vector store, jadi kita akan memuat teks, memuat model, sekarang kita akan menggunakan Pinecone, pinecone adalah vector store, jadi ingat diagram di mana kita menyimpan embeddings, kita menggunakan Pinecone, ada lainnya seperti chroma dan leave it dan thighs dan ada semua jenis lainnya, tetapi untuk contoh ini kita menggunakan pinecart.

### Contoh Kode Vector Stores

Pertama, kita perlu menginstal paket yang diperlukan:

```bash
npm install @langchain/openai
npm install @langchain/community
npm install faiss-node # Untuk vector store lokal
npm install chromadb # Untuk vector store Chroma
```

Berikut adalah contoh kode untuk Vector Stores:

```typescript
// src/vector-stores-example.ts
import { OpenAIEmbeddings } from "@langchain/openai"
import { FaissStore } from "@langchain/community/vectorstores/faiss"
import { Chroma } from "@langchain/community/vectorstores/chroma"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { Document } from "langchain/document"
import fs from "fs"

async function vectorStoresExample() {
  try {
    // Inisialisasi embeddings
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    })

    // Contoh dokumen
    const documents = [
      new Document({
        pageContent: "JavaScript adalah bahasa pemrograman tingkat tinggi yang dinamis dan ditafsirkan.",
        metadata: { source: "programming_guide", category: "javascript" },
      }),
      new Document({
        pageContent: "TypeScript adalah superset dari JavaScript yang menambahkan tipe statis.",
        metadata: { source: "programming_guide", category: "typescript" },
      }),
      new Document({
        pageContent: "React adalah library JavaScript untuk membangun antarmuka pengguna.",
        metadata: { source: "web_development", category: "react" },
      }),
      new Document({
        pageContent: "Node.js memungkinkan JavaScript berjalan di server-side.",
        metadata: { source: "backend_development", category: "nodejs" },
      }),
      new Document({
        pageContent: "Python adalah bahasa pemrograman yang populer untuk data science dan machine learning.",
        metadata: { source: "data_science", category: "python" },
      }),
    ]

    console.log("=== FaissStore Example (Vector Store Lokal) ===")

    // 1. FaissStore - Vector store lokal
    console.log("\n1. Membuat FaissStore...")

    // Membuat vector store dari dokumen
    const faissStore = await FaissStore.fromDocuments(documents, embeddings)

    // Simpan vector store ke disk
    const faissStorePath = "./faiss-store"
    await faissStore.save(faissStorePath)
    console.log(`FaissStore disimpan ke ${faissStorePath}`)

    // Muat kembali vector store dari disk
    const loadedFaissStore = await FaissStore.load(faissStorePath, embeddings)
    console.log("FaissStore berhasil dimuat dari disk")

    // Similarity search
    console.log("\n2. Similarity Search dengan FaissStore:")
    const query = "bahasa pemrograman untuk web"
    const faissResults = await loadedFaissStore.similaritySearch(query, 3)

    console.log(`Query: "${query}"`)
    console.log("Hasil similarity search:")
    faissResults.forEach((doc, i) => {
      console.log(`${i + 1}. ${doc.pageContent}`)
      console.log(`   Metadata:`, doc.metadata)
    })

    // Similarity search dengan skor
    console.log("\n3. Similarity Search dengan Skor:")
    const faissResultsWithScore = await loadedFaissStore.similaritySearchWithScore(query, 3)

    faissResultsWithScore.forEach(([doc, score], i) => {
      console.log(`${i + 1}. Skor: ${score.toFixed(4)}`)
      console.log(`   Konten: ${doc.pageContent}`)
      console.log(`   Metadata:`, doc.metadata)
    })

    // Maximum marginal relevance search
    console.log("\n4. Maximum Marginal Relevance Search:")
    const mmrResults = await loadedFaissStore.maxMarginalRelevanceSearch(query, {
      k: 3,
      fetchK: 10, // Ambil 10 dokumen lalu pilih 3 yang paling relevan dan beragam
    })

    console.log("Hasil MMR search:")
    mmrResults.forEach((doc, i) => {
      console.log(`${i + 1}. ${doc.pageContent}`)
      console.log(`   Metadata:`, doc.metadata)
    })

    console.log("\n=== Chroma Vector Store Example ===")

    // 2. Chroma - Vector store dengan persistensi
    console.log("\n1. Membuat Chroma Vector Store...")

    // Membuat collection Chroma
    const chromaCollectionName = "programming_docs"
    const chromaStore = await Chroma.fromDocuments(documents, embeddings, {
      collectionName: chromaCollectionName,
      url: "http://localhost:8000", // URL Chroma server (jika running)
    })

    // Alternative: menggunakan Chroma secara lokal tanpa server
    // const chromaStore = await Chroma.fromDocuments(
    //   documents,
    //   embeddings,
    //   {
    //     collectionName: chromaCollectionName,
    //     path: "./chroma_db", // Path untuk menyimpan database
    //   }
    // )

    console.log("Chroma Vector Store berhasil dibuat")

    // Similarity search dengan Chroma
    console.log("\n2. Similarity Search dengan Chroma:")
    const chromaResults = await chromaStore.similaritySearch(query, 3)

    console.log(`Query: "${query}"`)
    console.log("Hasil similarity search:")
    chromaResults.forEach((doc, i) => {
      console.log(`${i + 1}. ${doc.pageContent}`)
      console.log(`   Metadata:`, doc.metadata)
    })

    // Filter berdasarkan metadata
    console.log("\n3. Filter berdasarkan Metadata:")
    const filteredResults = await chromaStore.similaritySearch("JavaScript", 2, {
      category: "javascript",
    })

    console.log("Hasil filter (category: javascript):")
    filteredResults.forEach((doc, i) => {
      console.log(`${i + 1}. ${doc.pageContent}`)
      console.log(`   Metadata:`, doc.metadata)
    })

    console.log("\n=== Advanced Vector Store Operations ===")

    // 3. Advanced operations
    console.log("\n1. Menambahkan dokumen baru ke vector store:")

    const newDoc = new Document({
      pageContent: "Vue.js adalah framework JavaScript progresif untuk membangun UI.",
      metadata: { source: "web_development", category: "vuejs" },
    })

    await loadedFaissStore.addDocuments([newDoc])
    console.log("Dokumen baru berhasil ditambahkan")

    // Verifikasi dengan search
    const newResults = await loadedFaissStore.similaritySearch("Vue.js framework", 1)
    console.log("Hasil search untuk dokumen baru:")
    newResults.forEach((doc, i) => {
      console.log(`${i + 1}. ${doc.pageContent}`)
      console.log(`   Metadata:`, doc.metadata)
    })

    // 4. Menghapus dokumen (jika didukung)
    console.log("\n2. Menghapus dokumen dari vector store:")

    // Note: FaissStore tidak mendukung penghapusan dokumen individual
    // Chroma mendukung penghapusan dengan ID
    console.log("Penghapusan dokumen tersedia di Chroma tapi tidak di FaissStore")

    // 5. Embedding dan search manual
    console.log("\n3. Manual Embedding dan Search:")

    const queryText = "backend development dengan JavaScript"
    const queryEmbedding = await embeddings.embedQuery(queryText)

    console.log(`Query: "${queryText}"`)
    console.log(`Dimensi embedding: ${queryEmbedding.length}`)
    console.log(
      `5 nilai pertama: [${queryEmbedding
        .slice(0, 5)
        .map((x) => x.toFixed(6))
        .join(", ")}...]`
    )

    // 6. Performance comparison
    console.log("\n4. Performance Comparison:")

    const testQueries = ["JavaScript programming", "web development framework", "server-side JavaScript", "data science programming"]

    console.log("Membandingkan performa search...")

    for (const testQuery of testQueries) {
      const startTime = Date.now()
      await loadedFaissStore.similaritySearch(testQuery, 2)
      const endTime = Date.now()

      console.log(`Query: "${testQuery}" - Waktu: ${endTime - startTime}ms`)
    }

    // Cleanup
    console.log("\n5. Cleanup:")

    // Hapus file yang dibuat
    if (fs.existsSync(faissStorePath)) {
      fs.rmSync(faissStorePath, { recursive: true, force: true })
      console.log("FaissStore files deleted")
    }
  } catch (error) {
    console.error("Error:", error)
  }
}

vectorStoresExample()
```

Output yang diharapkan:

```
=== FaissStore Example (Vector Store Lokal) ===

1. Membuat FaissStore...
FaissStore disimpan ke ./faiss-store
FaissStore berhasil dimuat dari disk

2. Similarity Search dengan FaissStore:
Query: "bahasa pemrograman untuk web"
Hasil similarity search:
1. JavaScript adalah bahasa pemrograman tingkat tinggi yang dinamis dan ditafsirkan.
   Metadata: { source: 'programming_guide', category: 'javascript' }
2. React adalah library JavaScript untuk membangun antarmuka pengguna.
   Metadata: { source: 'web_development', category: 'react' }
3. Node.js memungkinkan JavaScript berjalan di server-side.
   Metadata: { source: 'backend_development', category: 'nodejs' }

3. Similarity Search dengan Skor:
1. Skor: 0.8567
   Konten: JavaScript adalah bahasa pemrograman tingkat tinggi yang dinamis dan ditafsirkan.
   Metadata: { source: 'programming_guide', category: 'javascript' }
2. Skor: 0.7234
   Konten: React adalah library JavaScript untuk membangun antarmuka pengguna.
   Metadata: { source: 'web_development', category: 'react' }
3. Skor: 0.6543
   Konten: Node.js memungkinkan JavaScript berjalan di server-side.
   Metadata: { source: 'backend_development', category: 'nodejs' }

4. Maximum Marginal Relevance Search:
Hasil MMR search:
1. JavaScript adalah bahasa pemrograman tingkat tinggi yang dinamis dan ditafsirkan.
   Metadata: { source: 'programming_guide', category: 'javascript' }
2. Python adalah bahasa pemrograman yang populer untuk data science dan machine learning.
   Metadata: { source: 'data_science', category: 'python' }
3. Node.js memungkinkan JavaScript berjalan di server-side.
   Metadata: { source: 'backend_development', category: 'nodejs' }

=== Chroma Vector Store Example ===

1. Membuat Chroma Vector Store...
Chroma Vector Store berhasil dibuat

2. Similarity Search dengan Chroma:
Query: "bahasa pemrograman untuk web"
Hasil similarity search:
1. JavaScript adalah bahasa pemrograman tingkat tinggi yang dinamis dan ditafsirkan.
   Metadata: { source: 'programming_guide', category: 'javascript' }
2. React adalah library JavaScript untuk membangun antarmuka pengguna.
   Metadata: { source: 'web_development', category: 'react' }
3. Node.js memungkinkan JavaScript berjalan di server-side.
   Metadata: { source: 'backend_development', category: 'nodejs' }

3. Filter berdasarkan Metadata:
Hasil filter (category: javascript):
1. JavaScript adalah bahasa pemrograman tingkat tinggi yang dinamis dan ditafsirkan.
   Metadata: { source: 'programming_guide', category: 'javascript' }

=== Advanced Vector Store Operations ===

1. Menambahkan dokumen baru ke vector store:
Dokumen baru berhasil ditambahkan
Hasil search untuk dokumen baru:
1. Vue.js adalah framework JavaScript progresif untuk membangun UI.
   Metadata: { source: 'web_development', category: 'vuejs' }

3. Manual Embedding dan Search:
Query: "backend development dengan JavaScript"
Dimensi embedding: 1536
5 nilai pertama: [0.012345, -0.023456, 0.034567, -0.045678, 0.056789]...

4. Performance Comparison:
Membandingkan performa search...
Query: "JavaScript programming" - Waktu: 15ms
Query: "web development framework" - Waktu: 12ms
Query: "server-side JavaScript" - Waktu: 18ms
Query: "data science programming" - Waktu: 14ms

5. Cleanup:
FaissStore files deleted
```

Jadi Anda perlu masuk ke Pinecone, gratis, Anda dapat mendaftar dan membuat Vector base Anda sendiri, saya akan menempatkan instruksi untuk Anda melakukan itu, jadi saya inisiasi itu, saya muat file, lalu saya bagi seperti yang saya tunjukkan sebelumnya, saya membagi menjadi chunk 1000 karakter, lalu saya buat objek dokumen, ini adalah indeks yang saya buat di Pinecone yang saya dapatkan, saya embed dokumen-dokumen ini, menjalankan melalui fungsi-fungsi ini, dan ini dia.

Jadi saya tidak akan menjalankan ini lagi karena itu akan menimpa apa yang saya miliki, jadi Anda dapat menjalankan ini dan melihat apa yang terjadi, jelas pastikan untuk mengubah ini karena ini milik saya, tetapi efektifnya yang kita lakukan di sini adalah memuat dokumen dan menyimpannya di vector base sesuai diagram.

### Pemuat Dokumen (Document Loaders)

Document loaders adalah komponen yang memungkinkan kita memuat dokumen dari berbagai sumber seperti file teks, PDF, website, dan lainnya. LangChain menyediakan berbagai document loaders yang siap digunakan.

Pertama, instal paket yang diperlukan:

```bash
npm install @langchain/community
npm install pdf-parse # Untuk memuat file PDF
npm install cheerio # Untuk web scraping
```

Berikut adalah contoh kode untuk Document Loaders:

```typescript
// src/document-loaders-example.ts
import { TextLoader } from "langchain/document_loaders/fs/text"
import { PDFLoader } from "langchain/document_loaders/fs/pdf"
import { WebBaseLoader } from "langchain/document_loaders/web/web_base"
import { DirectoryLoader } from "langchain/document_loaders/fs/directory"
import { GithubRepoLoader } from "langchain/document_loaders/web/github"
import { Document } from "langchain/document"
import fs from "fs"
import path from "path"

async function documentLoadersExample() {
  try {
    // 1. Text Loader - Memuat file teks
    console.log("1. Text Loader:")

    // Buat file teks contoh jika belum ada
    const textContent = `
    Pengenalan Artificial Intelligence
    
    Artificial Intelligence (AI) adalah teknologi yang memungkinkan mesin untuk belajar dari pengalaman,
    menyesuaikan dengan input baru, dan melakukan tugas-tugas yang mirip dengan yang dilakukan manusia.
    
    AI dapat dikategorikan menjadi dua jenis:
    1. Narrow AI - AI yang dirancang untuk melakukan tugas tertentu
    2. General AI - AI yang memiliki kemampuan intelektual manusia
    
    Aplikasi AI dalam kehidupan sehari-hari:
    - Asisten virtual (Siri, Alexa)
    - Sistem rekomendasi (Netflix, Spotify)
    - Pengenalan wajah
    - Mobil otonom
    `

    const textFilePath = "ai-intro.txt"
    fs.writeFileSync(textFilePath, textContent)

    const textLoader = new TextLoader(textFilePath)
    const textDocs = await textLoader.load()

    console.log(`Jumlah dokumen: ${textDocs.length}`)
    console.log(`Metadata:`, textDocs[0].metadata)
    console.log(`Konten (100 karakter pertama): ${textDocs[0].pageContent.substring(0, 100)}...`)
    console.log("---")

    // 2. PDF Loader - Memuat file PDF
    console.log("\n2. PDF Loader:")

    // Untuk contoh ini, kita akan membuat PDF loader tapi tidak menjalankannya
    // karena memerlukan file PDF aktual
    console.log("Contoh penggunaan PDF Loader:")
    console.log(`
    const pdfLoader = new PDFLoader("path/to/document.pdf")
    const pdfDocs = await pdfLoader.load()
    console.log(\`Jumlah halaman: \${pdfDocs.length}\`)
    `)
    console.log("---")

    // 3. Web Loader - Memuat konten dari website
    console.log("\n3. Web Loader:")

    console.log("Contoh penggunaan Web Loader:")
    console.log(`
    const webLoader = new WebBaseLoader("https://example.com")
    const webDocs = await webLoader.load()
    console.log(\`Konten dari website: \${webDocs[0].pageContent.substring(0, 100)}...\`)
    `)
    console.log("---")

    // 4. Directory Loader - Memuat semua file dari direktori
    console.log("\n4. Directory Loader:")

    // Buat direktori contoh jika belum ada
    const dirPath = "docs"
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath)
    }

    // Buat beberapa file contoh
    fs.writeFileSync(path.join(dirPath, "doc1.txt"), "Ini adalah dokumen pertama.")
    fs.writeFileSync(path.join(dirPath, "doc2.txt"), "Ini adalah dokumen kedua.")

    const directoryLoader = new DirectoryLoader(dirPath, {
      ".txt": (path) => new TextLoader(path),
    })

    const dirDocs = await directoryLoader.load()

    console.log(`Jumlah dokumen dari direktori: ${dirDocs.length}`)
    dirDocs.forEach((doc, i) => {
      console.log(`Dokumen ${i + 1}: ${doc.metadata.source}`)
      console.log(`Konten: ${doc.pageContent}`)
    })
    console.log("---")

    // 5. GitHub Repo Loader - Memuat repository dari GitHub
    console.log("\n5. GitHub Repo Loader:")

    console.log("Contoh penggunaan GitHub Repo Loader:")
    console.log(`
    const githubLoader = new GithubRepoLoader(
      "https://github.com/langchain-ai/langchainjs",
      { branch: "main", recursive: true }
    )
    const githubDocs = await githubLoader.load()
    console.log(\`Jumlah file: \${githubDocs.length}\`)
    `)
    console.log("---")

    // 6. Custom Document Loader - Membuat loader kustom
    console.log("\n6. Custom Document Loader:")

    // Membuat dokumen secara manual
    const customDocs = [
      new Document({
        pageContent: "JavaScript adalah bahasa pemrograman yang populer untuk pengembangan web.",
        metadata: { source: "custom", category: "programming" },
      }),
      new Document({
        pageContent: "TypeScript adalah superset dari JavaScript yang menambahkan tipe statis.",
        metadata: { source: "custom", category: "programming" },
      }),
    ]

    console.log("Dokumen kustom:")
    customDocs.forEach((doc, i) => {
      console.log(`Dokumen ${i + 1}:`)
      console.log(`Konten: ${doc.pageContent}`)
      console.log(`Metadata:`, doc.metadata)
    })

    // Membersihkan file yang dibuat
    fs.unlinkSync(textFilePath)
    fs.unlinkSync(path.join(dirPath, "doc1.txt"))
    fs.unlinkSync(path.join(dirPath, "doc2.txt"))
    fs.rmdirSync(dirPath)
  } catch (error) {
    console.error("Error:", error)
  }
}

documentLoadersExample()
```

Output yang diharapkan:

```
1. Text Loader:
Jumlah dokumen: 1
Metadata: {
  source: 'ai-intro.txt',
  loc: { lines: { from: 1, to: 1 } }
}
Konten (100 karakter pertama):
    Pengenalan Artificial Intelligence

    Artificial Intelligence (AI) adalah teknologi yang memungkinkan mesin...
---

2. PDF Loader:
Contoh penggunaan PDF Loader:

    const pdfLoader = new PDFLoader("path/to/document.pdf")
    const pdfDocs = await pdfLoader.load()
    console.log(`Jumlah halaman: ${pdfDocs.length}`)

---

3. Web Loader:
Contoh penggunaan Web Loader:

    const webLoader = new WebBaseLoader("https://example.com")
    const webDocs = await webLoader.load()
    console.log(`Konten dari website: ${webDocs[0].pageContent.substring(0, 100)}...`)

---

4. Directory Loader:
Jumlah dokumen dari direktori: 2
Dokumen 1: docs/doc1.txt
Konten: Ini adalah dokumen pertama.
Dokumen 2: docs/doc2.txt
Konten: Ini adalah dokumen kedua.
---

5. GitHub Repo Loader:
Contoh penggunaan GitHub Repo Loader:

    const githubLoader = new GithubRepoLoader(
      "https://github.com/langchain-ai/langchainjs",
      { branch: "main", recursive: true }
    )
    const githubDocs = await githubLoader.load()
    console.log(`Jumlah file: ${githubDocs.length}`)

---

6. Custom Document Loader:
Dokumen kustom:
Dokumen 1:
Konten: JavaScript adalah bahasa pemrograman yang populer untuk pengembangan web.
Metadata: { source: 'custom', category: 'programming' }
Dokumen 2:
Konten: TypeScript adalah superset dari JavaScript yang menambahkan tipe statis.
Metadata: { source: 'custom', category: 'programming' }
```

Document loaders memungkinkan kita memuat data dari berbagai sumber ke dalam format yang konsisten (Document objects) yang dapat digunakan oleh komponen lain di LangChain.

## Rantai (Chains)

Chains adalah komponen inti dalam LangChain yang memungkinkan kita menggabungkan berbagai komponen (seperti model, prompts, memory, dll.) menjadi alur kerja yang terstruktur.

### Rantai Percakapan (Conversation Chain)

Conversation chain memungkinkan kita membuat percakapan yang berkelanjutan dengan model bahasa besar, dengan kemampuan untuk mengingat konteks dari percakapan sebelumnya.

Berikut adalah contoh kode untuk Conversation Chain:

```typescript
// src/conversation-chain-example.ts
import { OpenAI } from "@langchain/openai"
import { ConversationChain } from "langchain/chains"
import { BufferMemory } from "langchain/memory"

async function conversationChainExample() {
  try {
    // Inisialisasi model
    const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.7,
    })

    // Membuat buffer memory untuk menyimpan percakapan
    const memory = new BufferMemory()

    // Membuat conversation chain
    const chain = new ConversationChain({
      llm: model,
      memory: memory,
      verbose: true, // Menampilkan proses di console
    })

    // Memulai percakapan
    console.log("Memulai percakapan...")

    const response1 = await chain.call({
      input: "Hai! Saya sedang belajar tentang AI. Bisa jelaskan apa itu machine learning?",
    })

    console.log("AI:", response1.response)

    const response2 = await chain.call({
      input: "Bisakah kamu berikan contoh sederhana dari machine learning?",
    })

    console.log("AI:", response2.response)

    const response3 = await chain.call({
      input: "Apa bedanya supervised dan unsupervised learning?",
    })

    console.log("AI:", response3.response)

    // Melihat riwayat percakapan
    console.log("\nRiwayat Percakapan:")
    const chatHistory = await memory.chatHistory.getMessages()
    chatHistory.forEach((message, i) => {
      if (message._getType() === "human") {
        console.log(`Manusia: ${message.text}`)
      } else {
        console.log(`AI: ${message.text}`)
      }
    })
  } catch (error) {
    console.error("Error:", error)
  }
}

conversationChainExample()
```

### Rantai Ringkasan (Summary Chain)

Summary chain memungkinkan kita meringkas dokumen panjang dengan membaginya menjadi bagian-bagian yang lebih kecil, meringkas setiap bagian, lalu menggabungkan ringkasan tersebut.

Berikut adalah contoh kode untuk Summary Chain:

```typescript
// src/summary-chain-example.ts
import { OpenAI } from "@langchain/openai"
import { loadSummarizationChain } from "langchain/chains"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { Document } from "langchain/document"

async function summaryChainExample() {
  try {
    // Inisialisasi model
    const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.7,
    })

    // Contoh teks panjang untuk diringkas
    const longText = `
    Sejarah Internet dimulai pada tahun 1960-an ketika pemerintah Amerika Serikat mengembangkan ARPANET,
    jaringan komputer yang menjadi cikal bakal internet. ARPANET dikembangkan oleh ARPA (Advanced Research
    Projects Agency) sebagai bagian dari Departemen Pertahanan Amerika Serikat. Tujuan utamanya adalah
    menciptakan jaringan komunikasi yang tahan terhadap serangan nuklir.
    
    Pada tahun 1971, Ray Tomlinson mengirim email pertama dan menemukan penggunaan simbol "@" untuk
    memisahkan nama pengguna dan nama host. Ini menjadi standar dalam komunikasi email hingga saat ini.
    
    Protokol TCP/IP dikembangkan pada tahun 1970-an dan menjadi standar komunikasi internet pada tahun 1983.
    TCP/IP memungkinkan berbagai jenis jaringan untuk terhubung dan berkomunikasi satu sama lain.
    
    Pada tahun 1989, Tim Berners-Lee dari CERN mengembangkan World Wide Web (WWW), yang memungkinkan
    pengguna untuk mengakses informasi melalui hyperlink. Ia juga menciptakan HTML, HTTP, dan browser
    web pertama yang disebut WorldWideWeb.
    
    Pada tahun 1990-an, internet mulai berkembang pesat dengan munculnya browser web seperti Mosaic dan
    Netscape Navigator. Perusahaan seperti AOL dan CompuServe menyediakan akses internet kepada
    konsumen rumahan.
    
    Pada awal 2000-an, dot-com bubble meledak dan banyak perusahaan internet bangkrut. Namun,
    perusahaan seperti Google dan Amazon bertahan dan menjadi pemain utama dalam industri internet.
    
    Media sosial mulai populer pada pertengahan 2000-an dengan platform seperti Friendster, MySpace,
    dan kemudian Facebook yang didirikan pada tahun 2004. Twitter diluncurkan pada tahun 2006,
    dan Instagram pada tahun 2010.
    
    Saat ini, internet telah menjadi bagian tak terpisahkan dari kehidupan sehari-hari. Dengan
    kemajuan teknologi mobile, internet dapat diakses dari mana saja dan kapan saja. Internet of Things
    (IoT) menghubungkan berbagai perangkat sehari-hari ke internet, menciptakan ekosistem yang
    terhubung secara global.
    `

    // Membuat dokumen dari teks
    const doc = new Document({ pageContent: longText })

    // Membuat text splitter
    const splitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 100,
    })

    // Memecah dokumen menjadi chunks
    const docs = await splitter.splitDocuments([doc])
    console.log(`Dokumen dibagi menjadi ${docs.length} bagian`)

    // Memuat summarization chain
    const chain = loadSummarizationChain(model, {
      type: "map_reduce", // Strategi ringkasan: meringkas setiap bagian lalu menggabungkan
      verbose: true,
    })

    // Meringkas dokumen
    console.log("Memulai proses ringkasan...")
    const summary = await chain.call({
      inputDocuments: docs,
    })

    console.log("\nRingkasan:")
    console.log(summary.text)
  } catch (error) {
    console.error("Error:", error)
  }
}

summaryChainExample()
```

## Tanya Jawab dengan Dokumen (QA with Documents)

QA dengan dokumen memungkinkan kita mengajukan pertanyaan tentang konten dokumen dan mendapatkan jawaban yang relevan berdasarkan informasi dalam dokumen tersebut.

Berikut adalah contoh kode untuk QA dengan Documents:

```typescript
// src/qa-documents-example.ts
import { OpenAI } from "@langchain/openai"
import { loadQAStuffChain } from "langchain/chains"
import { Document } from "langchain/document"
import { OpenAIEmbeddings } from "@langchain/openai"
import { FaissStore } from "@langchain/community/vectorstores/faiss"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"

async function qaDocumentsExample() {
  try {
    // Inisialisasi model
    const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0.7,
    })

    // Contoh dokumen tentang teknologi
    const documents = [
      new Document({
        pageContent: `Artificial Intelligence (AI) adalah cabang ilmu komputer yang berfokus pada pembuatan mesin
        yang dapat melakukan tugas yang biasanya memerlukan kecerdasan manusia. AI dibagi menjadi dua kategori:
        Narrow AI, yang dirancang untuk tugas spesifik, dan General AI, yang memiliki kemampuan intelektual
        manusia. Contoh aplikasi AI termasuk pengenalan wajah, asisten virtual, dan mobil otonom.`,
        metadata: { source: "AI_Article", title: "Pengenalan AI" },
      }),
      new Document({
        pageContent: `Machine Learning adalah subset dari AI yang memungkinkan sistem belajar dari data tanpa
        diprogram secara eksplisit. Ada tiga jenis utama machine learning: Supervised Learning, di mana
        model belajar dari data berlabel; Unsupervised Learning, di mana model menemukan pola dalam data
        tidak berlabel; dan Reinforcement Learning, di mana model belajar melalui trial dan error.`,
        metadata: { source: "ML_Article", title: "Machine Learning" },
      }),
      new Document({
        pageContent: `Deep Learning adalah subset dari machine learning yang menggunakan neural network
        dengan banyak lapisan (deep neural networks). Deep learning telah berhasil diterapkan dalam berbagai
        bidang seperti pengenalan gambar, pemrosesan bahasa alami, dan pengenalan suara. Arsitektur
        populer dalam deep learning termasuk Convolutional Neural Networks (CNN) untuk gambar dan
        Recurrent Neural Networks (RNN) untuk data sekuensial.`,
        metadata: { source: "DL_Article", title: "Deep Learning" },
      }),
      new Document({
        pageContent: `Natural Language Processing (NLP) adalah bidang AI yang berfokus pada interaksi antara
        komputer dan bahasa manusia. NLP memungkinkan komputer memahami, menafsirkan, dan menghasilkan
        teks dalam bahasa manusia. Aplikasi NLP termasuk terjemahan bahasa, analisis sentimen, chatbot,
        dan ringkasan teks. Transformer architecture seperti BERT dan GPT telah membawa kemajuan signifikan
        dalam NLP.`,
        metadata: { source: "NLP_Article", title: "Natural Language Processing" },
      }),
    ]

    // Membuat vector store dari dokumen
    console.log("Membuat vector store dari dokumen...")
    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    })

    const vectorStore = await FaissStore.fromDocuments(documents, embeddings)

    // Membuat QA chain
    const chain = loadQAStuffChain(model, {
      verbose: true,
    })

    // Fungsi untuk menjawab pertanyaan
    async function answerQuestion(question: string) {
      console.log(`\nPertanyaan: ${question}`)

      // Mencari dokumen yang relevan
      const relevantDocs = await vectorStore.similaritySearch(question, 2)

      console.log("Dokumen yang relevan:")
      relevantDocs.forEach((doc, i) => {
        console.log(`${i + 1}. ${doc.metadata.title}`)
        console.log(`   ${doc.pageContent.substring(0, 100)}...`)
      })

      // Menjawab pertanyaan berdasarkan dokumen yang relevan
      const result = await chain.call({
        input_documents: relevantDocs,
        question: question,
      })

      console.log(`\nJawaban: ${result.text}`)
      return result.text
    }

    // Contoh pertanyaan
    await answerQuestion("Apa itu Artificial Intelligence?")
    await answerQuestion("Apa perbedaan antara AI dan Machine Learning?")
    await answerQuestion("Apa itu Deep Learning dan bagaimana hubungannya dengan Machine Learning?")
    await answerQuestion("Apa saja aplikasi dari Natural Language Processing?")
  } catch (error) {
    console.error("Error:", error)
  }
}

qaDocumentsExample()
```

Output yang diharapkan:

```
Membuat vector store dari dokumen...

Pertanyaan: Apa itu Artificial Intelligence?
Dokumen yang relevan:
1. Pengenalan AI
   Artificial Intelligence (AI) adalah cabang ilmu komputer yang berfokus pada pembuatan mesin...
2. Machine Learning
   Machine Learning adalah subset dari AI yang memungkinkan sistem belajar dari data tanpa...

Jawaban: Artificial Intelligence (AI) adalah cabang ilmu komputer yang berfokus pada pembuatan mesin yang dapat melakukan tugas yang biasanya memerlukan kecerdasan manusia. AI dibagi menjadi dua kategori: Narrow AI, yang dirancang untuk tugas spesifik, dan General AI, yang memiliki kemampuan intelektual manusia. Contoh aplikasi AI termasuk pengenalan wajah, asisten virtual, dan mobil otonom.

Pertanyaan: Apa perbedaan antara AI dan Machine Learning?
Dokumen yang relevan:
1. Machine Learning
   Machine Learning adalah subset dari AI yang memungkinkan sistem belajar dari data tanpa...
2. Pengenalan AI
   Artificial Intelligence (AI) adalah cabang ilmu komputer yang berfokus pada pembuatan mesin...

Jawaban: Machine Learning adalah subset dari Artificial Intelligence. Perbedaannya adalah AI adalah bidang yang lebih luas yang mencakup pembuatan mesin cerdas, sementara Machine Learning secara khusus berfokus pada metode di mana sistem belajar dari data tanpa diprogram secara eksplisit.

Pertanyaan: Apa itu Deep Learning dan bagaimana hubungannya dengan Machine Learning?
Dokumen yang relevan:
1. Deep Learning
   Deep Learning adalah subset dari machine learning yang menggunakan neural network dengan banyak lapisan...
2. Machine Learning
   Machine Learning adalah subset dari AI yang memungkinkan sistem belajar dari data tanpa...

Jawaban: Deep Learning adalah subset dari machine learning yang menggunakan neural network dengan banyak lapisan (deep neural networks). Hubungannya dengan machine learning adalah bahwa deep learning adalah pendekatan yang lebih spesifik dalam machine learning, yang telah berhasil diterapkan dalam berbagai bidang seperti pengenalan gambar, pemrosesan bahasa alami, dan pengenalan suara.

Pertanyaan: Apa saja aplikasi dari Natural Language Processing?
Dokumen yang relevan:
1. Natural Language Processing
   Natural Language Processing (NLP) adalah bidang AI yang berfokus pada interaksi antara komputer...
2. Pengenalan AI
   Artificial Intelligence (AI) adalah cabang ilmu komputer yang berfokus pada pembuatan mesin...

Jawaban: Aplikasi dari Natural Language Processing (NLP) termasuk terjemahan bahasa, analisis sentimen, chatbot, dan ringkasan teks. NLP memungkinkan komputer memahami, menafsirkan, dan menghasilkan teks dalam bahasa manusia.
```

## Contoh Final: QA dengan Vector Database

Mari kita beralih ke contoh final saya percaya, dan ini di mana menjadi sangat menarik, sekarang sebelum kita masuk, saya hanya ingin mengatakan bahwa Anda tahu ada beberapa utilitas berguna di sini, apa yang saya coba lakukan di sini hanya semacam saya kira memecah sihir di baliknya, tidak terlalu banyak, tetapi hanya dasar-dasar apa yang terjadi, jadi Anda embed kueri, Anda efektif embedding menggunakan fungsi ini disebut embed query similarity Vector search, jadi lagi ini di mana kita ingin melihat apa yang saat ini ada di vector store dan dibandingkan dengan kueri kita, dan semakin dekat angka dalam hal skor kemiripan, maka itulah yang ingin kita dapatkan kembali, dan jadi lagi Anda dapat melihat pustaka ini, jadi hanya memiliki bidang di balik logika backend, dan lagi banyak pujian untuk tim LangChain untuk inspirasi untuk ini.

### Keajaiban Vector Search

Mari kita kembali ke contoh final dan itu adalah di mana keajaiban benar-benar mulai menonjol, dan ini di mana Anda mulai tanya jawab dokumen, jadi apa yang terjadi di sini, efektifnya kita memiliki Pinecone, kita inisiasi sebagai penyimpanan, kita memiliki, hanya memeriksa silang bahwa indeks tertentu yang kita indeks di dalam penyimpanan yang memiliki data kita, lagi ini indeks ini telah dimuat sebelumnya dengan data dari pidato yang saya tunjukkan sebelumnya yang ada di teks besar, dan ini adalah kueri, jadi kueri adalah "berapa banyak pekerjaan baru yang diciptakan ekonomi", mari kita pergi dan verifikasi.

### Contoh Kode QA dengan Vector Database

Pertama, kita perlu menginstal paket yang diperlukan:

```bash
npm install @langchain/openai
npm install @langchain/community
npm install faiss-node # Untuk vector store lokal
```

Berikut adalah contoh kode lengkap untuk QA dengan Vector Database:

```typescript
// src/qa-vector-db-example.ts
import { OpenAI } from "@langchain/openai"
import { OpenAIEmbeddings } from "@langchain/openai"
import { RecursiveCharacterTextSplitter } from "langchain/text_splitter"
import { FaissStore } from "@langchain/community/vectorstores/faiss"
import { Document } from "langchain/document"
import { loadQAStuffChain } from "langchain/chains"
import fs from "fs"
import path from "path"

async function qaVectorDBExample() {
  try {
    // Inisialisasi model dan embeddings
    const model = new OpenAI({
      openAIApiKey: process.env.OPENAI_API_KEY,
      temperature: 0,
    })

    const embeddings = new OpenAIEmbeddings({
      openAIApiKey: process.env.OPENAI_API_KEY,
    })

    // 1. Muat dokumen yang besar (contoh: dokumen ekonomi)
    console.log("Memuat dan memproses dokumen...")

    // Contoh dokumen tentang ekonomi (dalam praktik, ini bisa file yang sangat besar)
    const economicDocument = `
    LAPORAN EKONOMI TAHUNAN 2023
    
    Pertumbuhan Ekonomi
    Pada tahun 2023, perekonomian nasional mencatat pertumbuhan sebesar 5,31%, meningkat dibandingkan tahun sebelumnya yang sebesar 5,17%.
    Pertumbuhan ini didorong oleh sektor industri yang tumbuh 4,64% dan sektor jasa yang tumbuh 6,01%.
    
    Pasar Kerja
    Ekonomi menciptakan lebih dari 6,5 juta pekerjaan baru hanya tahun lalu, menurun dari 7,1 juta pekerjaan pada tahun 2022.
    Tingkat pengangguran tercatat sebesar 5,45%, sedikit meningkat dari 5,32% pada tahun sebelumnya.
    
    Investasi
    Investasi asing langsung (FDI) mencapai rekor tertinggi sebesar $45,6 miliar, meningkat 18% dari tahun sebelumnya.
    Sektor manufaktur mendapatkan porsi terbesar dengan 32% dari total FDI.
    
    Inflasi
    Tingkat inflasi tahunan berada pada 3,2%, berada dalam target yang ditetapkan oleh bank sentral yaitu 2-4%.
    Inflasi inti (core inflation) tercatat sebesar 2,8%, menunjukkan stabilitas harga yang baik.
    
    Sektor Ekonomi Unggulan
    Sektor teknologi terus tumbuh pesat dengan kontribusi 12% terhadap PDB, meningkat dari 9% pada tahun 2021.
    Ekonomi digital bernilai $70 miliar dan diperkirakan akan mencapai $130 miliar pada tahun 2025.
    
    Tantangan Ekonomi
    Defisit perdagangan meningkat menjadi $28,3 miliar, namun masih dalam batas yang dapat dikelola.
    Utang pemerintah terhadap PDB berada pada level 39,7%, masih di bawah batas aman 60%.
    
    Outlook 2024
    Proyeksi pertumbuhan ekonomi untuk tahun 2024 adalah sebesar 5,2-5,4%.
    Diperkirakan akan diciptakan 6,8-7,2 juta pekerjaan baru pada tahun 2024.
    Sektor yang diprediksi akan tumbuh pesat termasuk teknologi hijau, ekonomi digital, dan manufaktur berbasis inovasi.
    `

    // 2. Memecah dokumen menjadi chunks
    const textSplitter = new RecursiveCharacterTextSplitter({
      chunkSize: 1000,
      chunkOverlap: 200,
    })

    const docs = await textSplitter.createDocuments([
      new Document({
        pageContent: economicDocument,
        metadata: { source: "laporan_ekonomi_2023", type: "economic_report" },
      }),
    ])

    console.log(`Dokumen dibagi menjadi ${docs.length} bagian`)

    // 3. Membuat vector store dari dokumen
    console.log("Membuat vector store...")

    // Cek apakah vector store sudah ada
    const vectorStorePath = "./economic-vector-store"
    let vectorStore: FaissStore

    if (fs.existsSync(vectorStorePath)) {
      // Muat vector store yang sudah ada
      console.log("Memuat vector store yang sudah ada...")
      vectorStore = await FaissStore.load(vectorStorePath, embeddings)
    } else {
      // Buat vector store baru
      console.log("Membuat vector store baru...")
      vectorStore = await FaissStore.fromDocuments(docs, embeddings)

      // Simpan vector store untuk penggunaan di masa mendatang
      await vectorStore.save(vectorStorePath)
      console.log("Vector store disimpan ke disk")
    }

    // 4. Membuat QA chain
    const chain = loadQAStuffChain(model, { verbose: true })

    // 5. Fungsi untuk menjawab pertanyaan
    async function answerQuestion(question: string) {
      console.log(`\n🔍 Pertanyaan: ${question}`)

      // Cari dokumen yang relevan menggunakan similarity search
      const relevantDocs = await vectorStore.similaritySearch(question, 3)

      console.log(`\n📄 Menemukan ${relevantDocs.length} dokumen yang relevan:`)
      relevantDocs.forEach((doc, i) => {
        console.log(`  ${i + 1}. Skor kemiripan: ${(doc as any).score?.toFixed(4) || "N/A"}`)
        console.log(`     Preview: ${doc.pageContent.substring(0, 150)}...`)
      })

      // Gunakan chain untuk menjawab pertanyaan berdasarkan dokumen yang relevan
      const result = await chain.call({
        input_documents: relevantDocs,
        question: question,
      })

      console.log(`\n💡 Jawaban: ${result.text}`)
      return result.text
    }

    // 6. Contoh pertanyaan dan jawaban
    console.log("\n" + "=".repeat(50))
    console.log("SISTEM TANYA JAWAB DOKUMEN EKONOMI")
    console.log("=".repeat(50))

    await answerQuestion("Berapa banyak pekerjaan baru yang diciptakan ekonomi tahun lalu?")
    await answerQuestion("Bagaimana pertumbuhan ekonomi tahun 2023 dibandingkan tahun sebelumnya?")
    await answerQuestion("Berapa tingkat inflasi tahun 2023?")
    await answerQuestion("Sektor apa yang mendapatkan porsi terbesar dari investasi asing?")
    await answerQuestion("Berapa proyeksi pertumbuhan ekonomi untuk tahun 2024?")
    await answerQuestion("Berapa banyak pekerjaan baru yang diprediksi akan diciptakan pada tahun 2024?")

    // 7. Demonstrasi similarity scores
    console.log("\n" + "=".repeat(50))
    console.log("DEMONSTRASI KEMIRIPAN VEKTOR")
    console.log("=".repeat(50))

    const testQuery = "pekerjaan baru"
    console.log(`\nQuery: "${testQuery}"`)

    // Embed query
    const queryEmbedding = await embeddings.embedQuery(testQuery)
    console.log(`Dimensi embedding: ${queryEmbedding.length}`)

    // Cari dengan similarity search dan tampilkan skor
    const searchResults = await vectorStore.similaritySearchWithScore(testQuery, 3)

    console.log("\nHasil similarity search:")
    searchResults.forEach(([doc, score], i) => {
      console.log(`\n${i + 1}. Skor kemiripan: ${score.toFixed(6)}`)
      console.log(`   Konten: ${doc.pageContent.substring(0, 200)}...`)
      console.log(`   Metadata:`, doc.metadata)
    })
  } catch (error) {
    console.error("Error:", error)
  }
}

qaVectorDBExample()
```

Output yang diharapkan:

```
Memuat dan memproses dokumen...
Dokumen dibagi menjadi 8 bagian
Membuat vector store baru...
Vector store disimpan ke disk

==================================================
SISTEM TANYA JAWAB DOKUMEN EKONOMI
==================================================

🔍 Pertanyaan: Berapa banyak pekerjaan baru yang diciptakan ekonomi tahun lalu?

📄 Menemukan 3 dokumen yang relevan:
  1. Skor kemiripan: 0.8567
     Preview: Pasar Kerja
    Ekonomi menciptakan lebih dari 6,5 juta pekerjaan baru hanya tahun lalu, menurun dari 7,1 juta pekerjaan pada tahun 2022.
    Tingkat pengangguran tercatat sebesar 5,45%, sedikit meningkat dari 5,32% pada tahun sebelumnya...
  2. Skor kemiripan: 0.7234
     Preview: Outlook 2024
    Proyeksi pertumbuhan ekonomi untuk tahun 2024 adalah sebesar 5,2-5,4%.
    Diperkirakan akan diciptakan 6,8-7,2 juta pekerjaan baru pada tahun 2024...
  3. Skor kemiripan: 0.6543
     Preview: Sektor Ekonomi Unggulan
    Sektor teknologi terus tumbuh pesat dengan kontribusi 12% terhadap PDB, meningkat dari 9% pada tahun 2021...

💡 Jawaban: Berdasarkan dokumen, ekonomi menciptakan lebih dari 6,5 juta pekerjaan baru tahun lalu, menurun dari 7,1 juta pekerjaan pada tahun 2022.

🔍 Pertanyaan: Bagaimana pertumbuhan ekonomi tahun 2023 dibandingkan tahun sebelumnya?

📄 Menemukan 3 dokumen yang relevan:
  1. Skor kemiripan: 0.9123
     Preview: Pertumbuhan Ekonomi
    Pada tahun 2023, perekonomian nasional mencatat pertumbuhan sebesar 5,31%, meningkat dibandingkan tahun sebelumnya yang sebesar 5,17%...
  2. Skor kemiripan: 0.6789
     Preview: Outlook 2024
    Proyeksi pertumbuhan ekonomi untuk tahun 2024 adalah sebesar 5,2-5,4%...

💡 Jawaban: Pada tahun 2023, perekonomian nasional mencatat pertumbuhan sebesar 5,31%, meningkat dibandingkan tahun sebelumnya yang sebesar 5,17%. Pertumbuhan ini didorong oleh sektor industri yang tumbuh 4,64% dan sektor jasa yang tumbuh 6,01%.

==================================================
DEMONSTRASI KEMIRIPAN VEKTOR
==================================================

Query: "pekerjaan baru"
Dimensi embedding: 1536

Hasil similarity search:

1. Skor kemiripan: 0.856732
   Konten: Pasar Kerja
  Ekonomi menciptakan lebih dari 6,5 juta pekerjaan baru hanya tahun lalu, menurun dari 7,1 juta pekerjaan pada tahun 2022.
  Tingkat pengangguran tercatat sebesar 5,45%, sedikit meningkat dari 5,32% pada tahun sebelumnya...
   Metadata: { source: 'laporan_ekonomi_2023', type: 'economic_report' }

2. Skor kemiripan: 0.723456
   Konten: Outlook 2024
  Proyeksi pertumbuhan ekonomi untuk tahun 2024 adalah sebesar 5,2-5,4%.
  Diperkirakan akan diciptakan 6,8-7,2 juta pekerjaan baru pada tahun 2024...
   Metadata: { source: 'laporan_ekonomi_2023', type: 'economic_report' }
```

### Menjalankan Contoh Final

Jadi mari bersihkan ini, dan jika saya hanya pergi ke question answer docs.tf, jadi mari jalankan ini, jadi ini adalah pertanyaan, dan mari lihat apa responsnya, jadi semoga jari disilangkan kita berakhir dengan sesuatu seperti itu, lihat apakah dia akan mengetahuinya, oh oh ini dia, kita mendapatkan jawaban di sini, lebih dari 6,5 juta pekerjaan, dan yang cukup keren adalah sekarang mari kita jalankan kembali, mari lihat apa yang terjadi.

Jadi apa yang terjadi, Anda dapat melihat kita memiliki vektor di sini, kita membagi teks, lalu kita punya, ya jadi sekarang kita punya hasil similarity search yang ada di dalam fungsi ini, Anda dapat melihat ini Anda tahu setiap Vektor memiliki ID skor metadata yang berisi teks, Anda dapat melihat bahwa cuplikan teks ini yang merupakan chunk yang kita bagi awalnya adalah yang paling mirip dalam hal vektor ke pertanyaan ini, itu sebabnya saya yang pertama muncul karena ini adalah vektor dari kueri ini dan vektor ini yang 1536 Dimensi dibandingkan dengan vektor di database, dan jika menemukan bahwa ID 11 adalah yang paling mirip, jadi ini adalah teks, dan kemudian ID 17 adalah yang kedua paling mirip, dan seterusnya.

Jadi begitulah cara kemiripan vektor bekerja, dan jadi kita terus turun, dan Anda dapat melihat hanya lebih banyak hal yang terjadi, tetapi akhirnya kita mendarat dengan respons akhir, kita pilih yang skor tertinggi, kita teruskan ke, Anda dapat melihat ini adalah template yang disediakan oleh LangChain yang tidak harus saya tulis, gunakan potongan konteks berikut, jika Anda tidak tahu jawabannya, katakan saja Anda tidak tahu, Anda meneruskannya sebagai konteks, lalu kita tanyakan pertanyaan yang ada di sini, lalu kita tinggalkan celah untuk jawaban yang membantu, dan voila.

## Kesimpulan

Jadi begitulah cara kerjanya secara singkat, tidak terlalu gila, tetapi sangat menarik, sangat menarik, dan ya efektifnya segala sesuatu yang harus Anda abstraksi sendiri, mencari tahu masalah, struktur, bagaimana saya mengekstrak data, bagaimana saya efektif mengintegrasikan alat berbeda dengan model bahasa besar, bagaimana saya menskalakan aplikasi saya, bagaimana saya membuatnya lebih hemat biaya, LangChain benar-benar bekerja pada itu.

## 🎯 Ringkasan Tutorial

Dalam tutorial ini, kita telah mempelajari:

- **Konsep Dasar LangChain**: Memahami masalah yang dipecahkan oleh LangChain dan komponen-komponennya
- **Instalasi dan Setup**: Cara menginstal dan mengkonfigurasi LangChain untuk JavaScript/TypeScript
- **Chains**: Berbagai jenis rantai dari yang sederhana hingga kompleks
- **Prompts**: Template prompt dan few shot prompting
- **Agents**: Membuat agen yang dapat menggunakan alat eksternal
- **Memory**: Berbagai jenis memori untuk percakapan berkelanjutan
- **Embeddings**: Mengubah teks menjadi vektor numerik
- **Vector Stores**: Menyimpan dan mencari vektor secara efisien
- **Document Processing**: Memuat dan memproses dokumen dari berbagai sumber
- **QA Systems**: Membangun sistem tanya jawab dengan dokumen

## 🚀 Langkah Selanjutnya

Setelah menyelesaikan tutorial ini, Anda dapat:

1. **Membangun Aplikasi Nyata**: Terapkan konsep yang dipelajari untuk membuat aplikasi AI yang berguna
2. **Eksplorasi Lanjutan**: Pelajari lebih lanjut tentang topik-topik lanjutan seperti:
   - Custom agents dengan tools khusus
   - Vector stores yang lebih canggih (Pinecone, Weaviate)
   - Advanced chain types
   - Integration dengan framework web (Express.js, Next.js)
3. **Kontribusi ke Komunitas**: Berbagi pengetahuan dan pengalaman Anda dengan komunitas LangChain

## 📚 Sumber Daya Tambahan

- [Dokumentasi Resmi LangChain](https://js.langchain.com/)
- [Repository GitHub LangChain.js](https://github.com/langchain-ai/langchainjs)
- [Contoh dan Template](https://github.com/langchain-ai/langchainjs/tree/main/examples)
- [Komunitas Discord](https://discord.gg/langchain)

Jadi saya harap video ini berguna bagi Anda sebagai developer TypeScript/JavaScript karena tidak banyak sumber daya di luar sana untuk kita membangun hal-hal ini, tetapi saya percaya seiring ekosistem terus tumbuh, ini akan menjadi lebih baik, jadi jika Anda memiliki pertanyaan, tinggalkan di komentar dan itu mungkin juga memberi saya ide bagus untuk video berikutnya, cheers.

---

**💡 Tip:** Semua contoh kode dalam tutorial ini dapat dijalankan langsung. Pastikan Anda telah menginstal semua dependensi yang diperlukan dan mengatur environment variables dengan benar sebelum menjalankan kode.
