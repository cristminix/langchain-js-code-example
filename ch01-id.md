## 1. Pendahuluan

## 1.1. Mendapatkan Pembaruan Buku dan Contoh Kode

Untuk menerima versi terbaru buku ini, berlangganan milis kami dengan mengirim email ke daniel@js-craft.io. Saya berusaha untuk menjaga buku saya tetap dengan versi terbaru LangChain dan pustaka lainnya. Saya secara teratur memperbarui kode dan konten, jadi pastikan untuk berlangganan agar tetap terinformasi tentang pembaruan ini.

Untuk mengakses kode sumber lengkap untuk semua proyek yang telah selesai, atau versi PDF buku ini, cukup kirim email kepada saya di daniel@js-craft.io.

## 1.2. Tentang penulis

Halo, teman! Saya Daniel, seorang pengembang perangkat lunak dan pendidik.

Saya suka komputer. Saya mencoba membuat mereka menyukai saya kembali. Lebih dari komputer, saya suka manusia. Saya pikir setiap orang memiliki nilai, kecerdasan, dan kebaikan di dalamnya. Saya percaya bahwa pendidikan adalah kunci untuk membangun dunia yang lebih baik, stabil, dan lebih kaya.

Saya pernah bekerja di perusahaan seperti Skillshare, Tradeshift, dan ING, di mana saya memiliki kesempatan untuk terpapar pada berbagai jenis pengembangan frontend di berbagai tim.

Selama lima tahun terakhir, saya telah menulis artikel di js-craft.io tentang JavaScript, CSS, dan topik pengembangan perangkat lunak lainnya.

Saya selalu menikmati mengajar, baik di kelas maupun kelas online, dan terlibat dalam startup pendidikan teknologi.

Anda selalu dapat menghubungi saya di daniel@js-craft.io, dan membaca lebih lanjut tentang saya di https://www.js-craft.io/about/.

Anda juga dapat menemukan saya di:

GitHub: github.com/daniel-jscraft

Twitter: @js_craft_hq

Mastodon: @daniel_js_craft

YouTube: @js-craftacademy6740

## 1.3. Bagaimana buku ini tercipta

Pertama kali saya menulis program komputer adalah 26 tahun yang lalu, di Turbo Pascal.

Bagi seseorang yang tidak tahu cara membuat kode, rasanya seperti merapal mantra. Tapi saya mengerti bagaimana mantra dibuat. Pernyataan if-then-else, fungsi, variabel. Beginilah cara Anda membuat mantra.

Satu-satunya waktu saya merasakan perasaan ini lagi adalah pada tahun 2022 ketika seorang teman menunjukkan ChatGPT kepada saya. Rasanya seperti sihir mistis. Tapi kali ini bukan saya yang menulis mantra. Saya tidak benar-benar mengerti bagaimana 'hal AI' itu dibuat; Anda tidak bisa membuatnya hanya dengan pemrograman yang biasa saya gunakan.

Jadi, saya masuk ke lubang kelinci "belajar cara kerja AI". Dan oh boy, ini adalah lubang yang dalam. Saya mencoba memahami hal ini dari awal.

Saya mencoba membangun dan melatih model saya dari awal. Setelah beberapa waktu, satu-satunya proyek praktis saya adalah jaringan saraf JavaScript murni. Model itu ditulis dari awal dan dapat dilatih untuk mendeteksi apakah bentuk yang digambar tangan adalah digit.

Saya menyerah setelah beberapa waktu. Dengan semua arsitektur yang berbeda, neuron bias, set data pelatihan, backpropagation, atau gradient descent. Itu terlalu banyak untuk otak saya yang biasa-biasa saja. Hal AI itu sedikit lebih logis dan kurang mistis, tetapi saya jauh dari mampu menggunakan pembelajaran baru secara praktis.

Oleh karena itu, saya kembali ke pekerjaan normal saya sebagai pengembang web. Tetapi di benak saya masih ada perasaan bahwa saya harus tetap memperhatikan AI. Ada sesuatu di sana.

Setelah beberapa saat, saya mendengarkan episode podcast Latent Space yang luar biasa. Saya mengikuti Swan Swyx Wang, salah satu pendiri podcast ini sejak dia berbicara tentang React (kerangka kerja JavaScript, bukan ReAct prompting).

Dalam episode itu, Swyx menyebutkan sesuatu tentang LangChain. Kerangka kerja LangChain ini dibuat untuk mengintegrasikan model AI dengan aplikasi "tradisional". Saya menyadari bahwa saya tidak sepenuhnya memahami semua mekanisme internal database, atau sistem operasi, tetapi saya menggunakannya. Oleh karena itu, saya memutuskan untuk mencoba AI lagi. Tapi kali ini dari sudut pandang yang lebih praktis.

Satu buku kemudian saya sekarang dapat mengatakan bahwa saya menyukai LangChain untuk semua yang diajarkan kepada saya tentang cara kerja Large Language Models (LLM). Abstraksi, model mental, dan kasus penggunaan kerangka kerja ini akan mengajarkan Anda banyak hal tentang model AI dan cara menggunakannya bersama dengan aplikasi bertenaga JavaScript.

LangChain dapat dilihat sebagai orkestrator yang menghubungkan hampir semua hal dalam sistem integrasi AI-Webapp. Ini menjadikannya gerbang yang sangat baik untuk memahami bagaimana semua komponen bekerja sama.

Jadi, mari kita belajar!

## 1.4. Apa itu LangChain

LangChain adalah kerangka kerja yang dirancang untuk menyederhanakan pembuatan aplikasi yang mengintegrasikan Large Language Models (LLM).

LangChain menyediakan semua blok bangunan integrasi AI dalam satu kerangka kerja. Ini menawarkan arsitektur modular, fleksibel, dan skalabel yang mudah dipelihara.

Anda dapat melihat LangChain sebagai lapisan penghubung untuk hampir semua hal dalam ekosistem AI.

Dengan mempelajari LangChain, Anda akan mendapatkan pemahaman mendalam tentang struktur, alur kerja, dan praktik Rekayasa AI.

Beberapa kasus penggunaan untuk LangChain meliputi:

LLM dilatih pada teks tidak terstruktur yang ditulis manusia. Meskipun ini berfungsi dengan baik untuk interaksi manusia, ini mungkin tidak berfungsi dengan baik untuk mengirim teks yang tidak diformat ke API. API membutuhkan data terstruktur seperti JSON. LangChain dapat memformat input dan output dalam interaksi LLM.

LLM tidak memiliki status. Mereka tidak ingat siapa Anda atau apa yang Anda katakan beberapa detik yang lalu. LangChain memberikan dukungan untuk memori jangka panjang dan jangka pendek.

LLM bisa lambat. LangChain dapat mengalirkan respons saat dihasilkan, memberikan umpan balik cepat kepada pengguna.

LLM memiliki tanggal batas pengetahuan. Misalnya, GPT 3.5 tidak memiliki data pelatihan setelah 2021. Dan GPT-4o tidak tahu apa-apa setelah Oktober 2023. Dengan LangChain, kita dapat membuat dan mengelola Agen AI yang online, mencari informasi, dan menggunakan alat untuk mengurai informasi tersebut.

Kita dapat merangkai beberapa LLM bersama-sama. Misalnya, kita dapat membuat artikel dengan model Gemini Google dan kemudian meneruskan teks ke Midjourney untuk menghasilkan gambar untuk artikel tersebut.

LLM tidak memiliki akses ke dokumen organisasi internal. Kita dapat menggunakan Retrieval-Augmented Generation (RAG) untuk memberikan konteks tambahan ke model, memungkinkannya berinteraksi dengan pengguna berdasarkan aturan dan pengetahuan organisasi. LangChain memiliki perangkat alat yang hebat untuk operasi RAG.

LangChain menstandardisasi operasi seperti yang di atas, membuatnya mudah untuk menukar komponen sesuai kebutuhan. Ingin menggunakan LLM yang berbeda karena lebih baik atau lebih murah? Ingin mengubah database vektor untuk menyimpan embedding RAG? Tidak masalah, LangChain siap membantu Anda.

LangChain mengabstraksi dan menstandardisasi pola umum saat bekerja dengan LLM. Ingat masa lalu dengan ketidakcocokan browser? Kemudian jQuery muncul. Inilah yang ingin dilakukan LangChain untuk integrasi LLM.

Meskipun dimungkinkan untuk membuat aplikasi apa pun tanpa LangChain, ini sangat menyederhanakan prosesnya dan jauh lebih baik daripada prompting manual.

Jika Anda ingin mendalami subjek ini, saya merekomendasikan untuk mendengarkan episode dengan Harrison Chase, pendiri LangChain dari podcast Latent Space yang luar biasa.

## 1.5. Ikhtisar buku ini

Dalam buku ini, kita akan memulai perjalanan yang menyenangkan, praktis, dan pragmatis untuk mempelajari LangChain. Setiap bab utama memiliki aplikasi contoh terkait yang secara bertahap berkembang selama bab tersebut. Setiap langkah memperkenalkan beberapa konsep inti LangChain baru dengan cara yang mudah dikelola tanpa membanjiri Anda.

Buku ini sengaja dipecah menjadi bab-bab pendek, masing-masing berfokus pada topik yang berbeda.

Berikut adalah bagaimana bab-bab utama dan aplikasi contoh disusun:

Bab 1: Kita akan menggunakan aplikasi Story Generator for Kids untuk memperkenalkan dasar-dasar LangChain. Kita akan terhubung ke LLM pertama, dan menggunakan template prompt dan rantai. Kita akan mendalami template parsial, komposisi template, dan banyak lagi.

Bab 2: Setelah pengaturan dasar di Bab 1, bab ini akan memperkenalkan konsep streaming. Menggunakan aplikasi yang sama, Story Generator for Kids, kita akan mengalirkan respons panjang dari LLM untuk meningkatkan pengalaman pengguna.

Bab 3: Salah satu tantangan dengan LLM adalah bahwa mereka memberikan respons dalam format tidak terstruktur, karena mereka dilatih pada teks yang dapat dipahami manusia. Dalam bab ini, kita akan mempelajari parser output dengan membuat Game Trivia lengkap dari awal menggunakan ChatGPT.

Bab 4: Modul memori memungkinkan memori LLM untuk aplikasi LangChain. Kita dapat mengingat percakapan dan respons sebelumnya dalam sesi saat ini mirip dengan cara ChatGPT melakukannya. Dalam bab ini, kita akan membangun aplikasi Tea Facts Wiki.

Bab 5: Salah satu fitur utama LangChain adalah dukungannya untuk RAG - Retrieval Augmented Generation. Dalam bab ini, kita akan membangun aplikasi Chat Bot yang menjawab pertanyaan berdasarkan konteks eksternal. Kita akan melihat cara menyediakan data dari sumber seperti PDF atau dokumen online, apa itu embedding, dan bagaimana penyimpanan data vektor bekerja.

Bab 6: Lebih fleksibel dan serbaguna dibandingkan dengan rantai, agen AI membantu Anda membangun solusi kompleks dan memungkinkan akses ke alat pihak ketiga seperti pencarian Google dan kalkulator matematika. Mereka dapat membuat keputusan tentang alat yang tepat untuk digunakan dalam situasi tertentu.

Dari membangun Story Generator hingga membuat Game Trivia dan aplikasi Chat Bot sungguhan, setiap bab secara bertahap memperluas pemahaman Anda. Pada akhirnya, kita akan menjelajahi streaming, penguraian output, modul memori, agen AI, dan kemampuan RAG, memberdayakan Anda untuk mengembangkan solusi kompleks.

Bersiaplah untuk memulai perjalanan yang memperkaya ke dunia pengembangan LangChain.

## 1.6. Persyaratan dan cara menggunakan buku ini

LangChain menawarkan implementasi dalam JavaScript dan Python.

Sepanjang buku ini, fokus kita akan pada JavaScript.

Anda akan menemukan bahwa Anda belajar paling baik dengan membuat kode bersama dengan contoh yang disediakan dalam buku ini. Saran saya adalah untuk awalnya membaca setiap bab, menyerap konten untuk memahami konsep. Kemudian, pada bacaan kedua, buat kode seiring kemajuan Anda.

Kita akan menggunakan kombinasi LangChain, React, dan Next.js. Meskipun pemahaman dasar tentang React diharapkan, Anda tidak perlu menjadi ahli.

Untuk menyiapkan Next.js, pendekatan paling sederhana adalah menggunakan utilitas create-next-app.

Dalam kebanyakan kasus, pekerjaan kita akan terbatas pada hanya 2 file:

src/app/page.js - menangani frontend; fungsi utamanya adalah menampilkan informasi dan data.

src/app/api/route.js - mengelola backend; file ini akan menangani interaksi API dengan LLM.

Contoh-contoh akan berkembang secara iteratif langkah demi langkah. Setiap modifikasi akan ditandai dengan tanda, dengan jalur file yang dimodifikasi disediakan sebagai referensi.

Misalnya:

```javascript
// src/app/page.js - jalur file yang diperbarui

// tambahkan PromptTemplate untuk menghindari pengulangan - perubahan file
import { PromptTemplate } from "@langchain/core/prompts"

// buat model ChatGPT baru - perubahan file
const model = new ChatGPT({
  openAIApiKey: process.env.OPENAI_API_KEY,

  temperature: 0.9,
})
```

Harap dicatat bahwa LangChain saat ini sedang dalam pengembangan dan berubah dengan cepat. Meskipun saya akan berusaha untuk memperbarui buku ini sesering mungkin, mungkin ada periode singkat di mana nama metode atau pernyataan impor tidak selaras dengan versi terbaru.

Untuk dukungan, jangan ragu untuk menghubungi melalui email di daniel@js-craft.io.
