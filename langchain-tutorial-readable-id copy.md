# Tutorial Pemula LangChain untuk JavaScript/TypeScript

Baiklah, ini Val dan ini adalah tutorial singkat dari channel YouTube Chat with Data tentang cara menggunakan LangChain untuk membangun aplikasi AI yang kompleks dan sederhana untuk JavaScript atau TypeScript. Jadi ini adalah tutorial pemula LangChain untuk JavaScript/TypeScript. Anda dapat menganggap LangChain sebagai kerangka kerja yang memudahkan pembuatan aplikasi model bahasa besar ini. Mari kita langsung mulai.

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

## Contoh Rantai Sederhana

Jadi kita akan mulai pertama-tama dengan rantai sederhana, jadi rantai sederhana pada dasarnya adalah di mana kita memiliki input dari pengguna atau hanya kueri umum seperti yang akan kita lakukan dengan ChatGPT dan model bahasa besar seperti OpenAI akan mengambil kueri itu, memproses kueri, mengembalikan respons.

Jadi inilah basis kode untuk kedua, biarkan saya bersihkan itu dan sehingga Anda dapat melihat strukturnya di sini, jadi kita menginstal pustaka LangChain yang dapat Anda lakukan dengan hanya melakukan npm install line chain. Saya akan menempatkan semua instruksi di repo GitHub setelah tutorial ini, tetapi efektifnya yang kita lakukan hanyalah seperti yang biasanya Anda lakukan, Anda akan menginisiasi model, memasukkan suhu atau parameter apa pun yang ingin Anda gunakan, lalu Anda mendapatkan respons, ini hanya sintaks menggunakan OpenAI.

Jadi dalam kasus ini saya hanya akan pergi npm run stop dan saya akan pergi ke sini, kita hanya akan melakukan panggilan dasar Dot TS, jadi saya akan menjalankan ini, saya sudah memiliki variabel lingkungan, kunci OpenAI saya sudah berjalan dan kita sedang berjalan dan kita seharusnya melihat Paris, oke jadi kita mendapatkan respons kembali dari model bahasa besar bahwa ibu kota Prancis adalah Paris, oke keren.

Jadi itu adalah panggilan dasar.

## Template Prompt

Sekarang mari kita beralih ke contoh lain, saya akan melalui dua contoh, tapi mari mulai dengan yang ini di mana secara efektif kita memiliki pengguna dan alih-alih hanya mengatakan apa ibu kota Prancis di mana saya yang akan meng-hardcode kali ini, kita akan membuat Prancis menjadi variabel sehingga akan bervariasi sesuai input pengguna.

Dan ini tidak berbeda dari aplikasi AI tipikal jika Anda membangun satu, Anda selalu mencari cara untuk memiliki prompt yang merupakan instruksi Anda, tetapi kemudian Anda memiliki bagian-bagian dari instruksi itu yang ingin Anda masukkan pengguna untuk menyesuaikan dan membuatnya lebih disesuaikan untuk mereka.

Jadi pengguna akan memberikan kontribusi di sini dan dapat mengubah negara, lalu kita secara efektif membuat rantai ini dengan model bahasa besar yang kemudian menghasilkan output, jadi pada dasarnya identik dengan ini kecuali pengguna, kita memiliki variabel ini di sini, kita bisa menyebut ini template prompt dan kita bisa menyebut ini rantai.

Jadi mari kembali ke kode dan kita akan pergi ke prompt, jadi LangChain memiliki template prompt ini seperti yang saya jelaskan sebelumnya yang efektif hanyalah format yang lebih dapat disesuaikan dari apa yang harus kita ketik secara manual.

Jadi biasanya kita harus, dalam kasus ini, bayangkan lebih kompleks, tetapi ini setara dengan mengatakan teks variabel dan kemudian Anda akan memiliki "apa ibu kota negara" oke dan di mana negara adalah variabel dinamis yang akan diteruskan dari input pengguna yang bisa datang dari front end atau bisa berupa permintaan ke back end, bagaimana pun Anda ingin melakukannya.

Ini biasanya akan terlihat seperti ini, jadi itu setara dengan apa yang terjadi di sini kecuali Anda meneruskan template ini ke objek ini dan Anda memiliki negara ini di sini sebagai variabel, dan sekarang kita dapat meneruskan negara, jadi dalam kasus ini kita akan meneruskan Prancis dan jika kita jalankan, Anda akan melihat bahwa saya akan mengunggah semua ini ke GitHub sehingga Anda dapat bermain-main dengannya.

Mari kita lihat apa yang terjadi sekarang, jadi format ini yang dilakukannya adalah memformat Prompt sesuai nilai input, jadi jika saya ubah ini menjadi Skotlandia atau Spanyol, maka itu akan menjadi "apa ibu kota Skotlandia" masing-masing, oke jadi efektif ini hanya menunjukkan kepada Anda format prompt dan Anda dapat melihat bagaimana ketika hal-hal menjadi sedikit lebih rumit, ini akan sangat berguna.

## Few Shot Prompts

Jadi mari kita beralih ke kasus few shot, jadi apa itu few shot prompt? Few shot pada dasarnya adalah contoh yang Anda berikan ke model bahasa besar untuk membantunya menghasilkan respons yang lebih baik, jadi misalnya katakanlah Anda ingin memberikan konteks tentang negara dan ibu kota yang berbeda sehingga Anda ingin model memiliki pola untuk digunakan dalam responsnya.

Jadi Anda masih akan menanyakan pertanyaan yang sama, lalu Anda memberikan few shot atau contoh-contoh ini untuk membantunya memiliki respons yang lebih baik, jadi dalam kasus ini kita memberikan contoh-contoh ini ke Amerika Serikat Washington DC, Kanada Ottawa, dan kemudian kita memiliki template yang diformat yang efektif adalah template yang akan kita teruskan, lalu kita memiliki example prompt.

Jadi sekali lagi Anda dapat melihat ini adalah variabel yang akan berubah karena mereka akan datang dari contoh-contoh di sini dan ini adalah template yang kita buat di sini, jadi ingat ini sama dengan yang kita miliki di sini dengan template prompt yang pada dasarnya hanya menghasilkan sesuatu seperti ini, "apa ibu kota Prancis" setelah kita memformatnya.

Jadi kita melakukan hal yang sama di sini, kita membuat hal ini di sini sehingga kita dapat memasukkan negara dan ibu kota, dan ketika kita console.log kita mendapatkan negara Amerika Serikat ibu kota Washington DC, jelas saya memformat menggunakan contoh-contoh ini, jadi Anda dapat melihat bagaimana efektifnya hanya memasukkan ke dalam celah-celah itu, dan sekarang ini menciptakan contoh yang dapat kita gunakan.

Jadi akhirnya kita membuat objek, jadi ini adalah objek template few shot yang kita buat instance dari yang disediakan LangChain, dan ini, Anda bisa membacanya nanti, tetapi pada dasarnya Anda dapat memberikan awalan atau teks apa yang ingin Anda letakkan sebelumnya, teks apa yang ingin Anda letakkan setelahnya, dan efektifnya Anda akan berakhir dengan sesuatu seperti ini di mana Anda memiliki "apa ibu kota negara di bawah ini", jadi ini seperti apa teks sebenarnya akan terlihat.

Jadi mari kita beralih ke format yang mungkin lebih masuk akal bagi Anda, dan ini kira-kira akan terlihat seperti ini, "apa ibu kota negara di bawah ini", dan dalam kasus ini kita memberikan few shot examples seperti yang saya katakan, mereka hanya contoh untuk membantu model, tapi dia tahu dia ingin menggunakan pola negara ibu kota, Anda memberikan Prancis sebagai negara, dan sekarang jika saya tekan kirim, seharusnya mengatakan Paris.

Jadi ini adalah cara Anda menggunakan few shot prompt dengan pada dasarnya memberikan pertanyaan atau prompt Anda, lalu few shot, tetapi dalam kasus JavaScript dan LangChain, Anda dapat menggunakan template few shot prompt ini yang efektif mengambil contoh-contoh yang Anda berikan sebelumnya, example prompt, awalan, akhiran, dan membantu Anda untuk secara efektif menskalakan ini karena ini bisa menjadi sangat membosankan.

Itu few shot dan props, oke keren.

## Agen

Jadi mari kita beralih ke, ini adalah rantai dasar, sekarang jika saya kembali atau sebenarnya mari kita mulai dengan agen karena itu sedikit lebih menarik dan juga membutuhkan sedikit lebih banyak pemikiran, jadi apa itu agen? Agen dapat Anda anggap sebagai asisten pribadi yang menggunakan model bahasa besar untuk membantu Anda mengambil tindakan dan dapat membantu Anda mengamati atau menggunakan alat eksternal.

Jadi apa maksudnya? Oke jadi mari mulai dari sini, kita memiliki pengguna dan pengguna berkata, oke berapa banyak negara di Afrika pangkat tiga, saya tahu ini contoh gila, tetapi tetaplah bersama saya, jadi mereka mengirim pertanyaan ini ke OpenAI misalnya model, dan model pada dasarnya berbicara ke agen atau bot ini, dan bot berpikir kepada dirinya sendiri, baik saya perlu menemukan setiap negara di Afrika dan menjumlahkannya, jadi itu adalah pikiran pertama yang dimiliki bot ini.

Sekarang dia kemudian pergi dan menggunakan sesuatu seperti serp API yang merupakan API real-time untuk mengakses hasil pencarian Google, melakukan aksi pencarian untuk menemukan semua negara Afrika berdasarkan hasil live, lalu mungkin menemukan artikel yang memberikan artikel kredibel yang menyimpulkan pengamatan bahwa ada 54 negara di Afrika.

Kemudian bot berkata, baik sekarang saya perlu menghitung total jumlah negara di Afrika pangkat tiga, jadi itulah yang dia pikirkan, lalu menggunakan alat lain untuk melakukan perhitungan, ada kalanya mereka dapat melakukan aksi kalkulasi, mengamati angka ini, berpikir sendiri sekarang saya tahu jawaban akhir, dan ini adalah output akhir yang Anda tahu angka ini adalah jumlah negara Afrika pangkat tiga.

Jadi ada komponen berbeda di sini, ada pengguna, ada model, ada agen, ada pemikiran, ada alat, ada pencarian, ada aksi, ada observasi, dan kemudian ada output akhir, tetapi pada intinya semua itu efektif adalah rantai urutan interaksi dengan model bahasa besar untuk instruksi dan kemudian interaksi dengan alat pihak ketiga untuk mendapatkan hasil apa pun yang Anda cari.

### Contoh Kode Agen

Jadi mari kita masuk ke kodenya, oke jadi saya tidak akan menjalankan yang ini khususnya karena Anda bisa mendapatkan kunci API serp API gratis yang dapat Anda uji ini, tetapi efektifnya lagi kita inisiasi model bahasa besar, kita inisiasi alat, jadi kita punya kalkulator dan serp API, jadi LangChain menyediakan alat yang dapat Anda gunakan, ada banyak lagi.

Jadi jika saya klik di sini, Anda memiliki Bing dad jokes, IFTTT di mana Anda dapat terhubung ke alat pihak ketiga, dan seterusnya, dan kemudian Anda memiliki agen di sini, sekarang agen ini akan mengambil alat, model, dan kerangka kerja ini, Anda dapat mengubahnya dan membacanya, itu hanya kerangka kerja yang semacam melalui pola pemikiran yang kita gambarkan di mana ia memiliki pikiran dan kemudian observasi tindak lanjut, dan seterusnya.

Kemudian Anda memiliki input "berapa total jumlah negara di Afrika pangkat tiga", jalankan dan panggil, dan ini kira-kira seperti apa hasil akhirnya, jadi ada banyak use case yang bisa kita pikirkan di sini, selain pencarian, Anda tahu berinteraksi dengan kalender Anda, melakukan matematika, lalu mengambil data itu dan berinteraksi dengan alat lain, tetapi use case sangat besar ketika datang ke agen, LangChain, dan alat eksternal.

## Memori

Baiklah, mari kita beralih ke memori, oke jadi apa itu memori? Memori hanyalah kemampuan chatbot untuk mengingat percakapan sebelumnya, jika Anda ingat salah satu tantangan besar adalah ketika Anda berinteraksi dengan chatbot ini atau mencoba membuat chatbot sendiri, mereka tidak memiliki memori yang luas dan terkadang tidak ada memori.

Jadi bayangkan seseorang Anda ajukan pertanyaan dan kemudian Anda ajukan pertanyaan lanjutan tetapi tidak memiliki konteks, responsnya tidak akan bagus, jadi yang kita inginkan adalah memberikan kemampuan untuk memperhitungkan percakapan sebelumnya ke dalam konteks untuk percakapan masa depan, tetapi melakukannya dengan cara yang bebas rasa sakit, LangChain memberi kita kemampuan untuk melakukan itu.

Jadi di sini kita secara efektif, di mana kita mengatakan kita inisiasi kelas buffer memory, kita buat objek baru disebut memori, conversation chain baru, lagi-lagi LangChain memiliki komponen ini di pustaka berbeda dan pustaka ini gratis, lalu Anda panggil dengan input "halo saya John", jadi ini adalah basis pengguna, dia mengatakan hai saya John, Anda mendapatkan respons, dan seterusnya.

### Contoh Kode Memori

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

Jadi mari kita masuk ke kode dan lihat seperti apa itu, jadi di sini kita memiliki embeddings dan seperti yang saya katakan, Anda dapat mengambil OpenAI dan di sini kita membuat fungsi di mana kita embedding kueri "hello world" dan kita mendapatkan respons, dan kita juga embedding dokumen, jadi dokumen dari sudut pandang LangChain hanyalah teks dan metadata yang digabungkan.

Jadi yang saya maksud dengan metadata hanyalah deskripsi atau sesuatu yang berguna untuk diketahui tentang teks tertentu yang dapat digunakan untuk mengambil nanti, jadi mari bersihkan ini, mari npm run start, dan kita ingin menjalankan di sini yang adalah indexes Dot embeddings.ts, Jadi Ini Kita membuat embeddings menggunakan fungsi embeddings OpenAI, Anda dapat melihat seperti yang saya katakan LangChain menyediakannya, saya hanya ingin menunjukkan kepada Anda seperti apa itu secara real time, jadi Anda dapat melihat bahwa kita telah membuat angka-angka ini seperti yang saya katakan.

Jadi secara harfiah beberapa kata ini telah membuat 1000 setiap Vektor memiliki seribu 536 dimensi, jadi itulah yang kita hadapi di sini, dan Anda dapat melihat semua angka ini, jadi Anda bisa bayangkan jika saya melakukan pencarian atau kueri apa yang akan terjadi adalah Anda tahu jika Anda memiliki dokumen besar yang sudah Anda embed, kita akan embed kueri, jadi kueri bisa "hello world", lalu kita akan membandingkan vektor angka ke angka yang sudah ada di penyimpanan, dan apa pun yang ada di penyimpanan yang paling dekat dengan hello world adalah yang dikirim kembali, jadi begitulah cara kerjanya, saya akan membahas lebih detail di video yang berbeda.

### Pembagian Teks

Di sini kita memiliki pemuat dokumen bernama recursive text splitter, dan seperti yang saya katakan, ini adalah alat yang sangat berguna yang sebelumnya harus Anda cari logikanya sendiri, tetapi LangChain menyediakan fasilitas untuk itu, jadi dalam kasus ini jika saya bersihkan di sini, saya jalankan, Anda dapat melihat ini adalah teks, lalu saya bisa melakukan Cuts is text later.ts, omong-omong saya ingin memberikan pujian besar untuk ide di balik ini, ini sebenarnya fork besar dari repositori contoh LangChain, jadi saya hanya membuat beberapa penyesuaian, tetapi pujian besar untuk tim di sana untuk ini, jadi pastikan untuk memeriksa apa yang mereka lakukan, saya akan meninggalkan dokumentasi, Anda bisa bergabung dengan Discord, saya juga bagian dari Discord, dan itu hanya hebat, banyak inovasi yang terjadi, jadi silakan periksa apa yang mereka lakukan, dukung, dan terlibat juga jika Anda bisa.

Jadi Anda dapat melihat di sini kita membuat dokumen-dokumen ini seperti yang saya katakan berisi konten halaman, metadata, tetapi Poin Kunci di sini adalah Anda lihat kita membagi ini menjadi chunk berbeda, dan di sini kita definisikan kita ingin 10 karakter per chunk dan setiap tumpang tindih antar chunk akan menjadi satu karakter, jadi ini yang dapat dilakukan recursive character text splitter untuk Anda menggunakan LangChain.

### Vector Stores

Sekarang apa yang terjadi di sini adalah saya sudah menjalankan fungsi ini, Anda dapat menjalankannya sendiri, tetapi apa yang saya lakukan adalah menjalankan fungsi ini untuk menyimpan teks ini di sini dikatakan State of the Union text speech, jadi ini biasanya akan terlihat seperti apa secara real time, Anda akan memiliki teks Anda sudah siap, lalu Anda akan memiliki vector store, jadi kita akan memuat teks, memuat model, sekarang kita akan menggunakan Pinecone, pinecone adalah vector store, jadi ingat diagram di mana kita menyimpan embeddings, kita menggunakan Pinecone, ada lainnya seperti chroma dan leave it dan thighs dan ada semua jenis lainnya, tetapi untuk contoh ini kita menggunakan pinecart.

Jadi Anda perlu masuk ke Pinecone, gratis, Anda dapat mendaftar dan membuat Vector base Anda sendiri, saya akan menempatkan instruksi untuk Anda melakukan itu, jadi saya inisiasi itu, saya muat file, lalu saya bagi seperti yang saya tunjukkan sebelumnya, saya membagi menjadi chunk 1000 karakter, lalu saya buat objek dokumen, ini adalah indeks yang saya buat di Pinecone yang saya dapatkan, saya embed dokumen-dokumen ini, menjalankan melalui fungsi-fungsi ini, dan ini dia.

Jadi saya tidak akan menjalankan ini lagi karena itu akan menimpa apa yang saya miliki, jadi Anda dapat menjalankan ini dan melihat apa yang terjadi, jelas pastikan untuk mengubah ini karena ini milik saya, tetapi efektifnya yang kita lakukan di sini adalah memuat dokumen dan menyimpannya di vector base sesuai diagram.

### Pemuat Dokumen

Sekarang berbicara tentang pemuat dokumen, Anda juga memiliki banyak pilihan di sini, jadi Anda dapat memuat, Anda benar-benar dapat mengambil situs web, Anda dapat Hacker News IMDb IM sdb, Anda dapat tahu dokumen, jadi ada banyak dokumen, dan setiap hari atau setiap minggu Anda tahu Anda memiliki orang-orang yang efektif membuat pull request untuk menambah lebih banyak, tetapi di sini kita memiliki contoh pemuat teks, jadi dibutuhkan string, bagian lima, jalur file string, lalu memuatnya, dan di sini Anda lihat contoh data ini adalah contoh data untuk melihat bagaimana LangChain memuat teks, dan pemuat itu mengarah ke output ini, jadi saya tidak akan membahas itu lagi, tetapi saya hanya menunjukkan kepada Anda seperti apa outputnya ketika saya menjalankannya pertama kali, bersihkan ini di sini, keren.

## Rantai

Jadi mari kita beralih ke, kita telah melalui rantai dasar, sebenarnya kita tidak melalui rantai dasar, jadi ya ini hanya rantai dasar, saya pikir kita melalui sangat mirip dengan contoh sebelumnya dengan prompt di mana kita hanya merangkai template prompt dengan model bahasa besar, jadi Anda dapat melihat Anda harus familiar dengan ini sekarang, lalu kita membuat rantai, jadi rantai model bahasa besar yang merupakan kombinasi model dan prompt, kita tanyakan negara apa itu Prancis dan dia berkata Paris.

### Rantai Percakapan

Kita juga dapat memiliki percakapan juga menggunakan conversation chain, jadi biarkan saya bermain-main dengan ini, Anda dapat mulai dan kita akan pergi dengan conversation.ts, jadi ini dia, jadi lagi kita inisiasi openAI, LangChain menyediakan conversation chain yang juga mencakup prompt yang tidak perlu Anda khawatirkan sendiri, dan kemudian kita memiliki chain dot call, dan di sini Anda lihat hai saya Jim, hai Jim senang bertemu, nama saya bla bla bla, bagaimana saya bisa membantu Anda hari ini, dan Anda memiliki respons lain yang datang ketika saya berkata apa nama saya, jadi Anda berkata nama Anda Jim, jadi mirip dengan kasus memori, saya hanya menunjukkan kepada Anda bagaimana itu berubah menjadi sesuatu yang disebut rantai.

### Rantai Ringkasan

Ringkasan jelas sangat berguna, jadi dalam kasus ini hanya kasus sederhana menggunakan lagi LangChain menyediakan utilitas untuk semua hal ini, tetapi di sini kita, Anda tahu, saya hanya melakukan teks pendek, bisa lebih panjang, bisa dokumen apa pun yang ingin Anda lakukan, Anda muat, dalam kasus ini saya menggunakan analyze document chain karena itu adalah sepotong teks kecil, tetapi jika saya memiliki chunk, saya akan menggunakan rantai berbeda, lagi dokumentasi sangat sangat berguna untuk ini, dan Anda panggil, lalu Anda mendapatkan respons seperti itu.

Saya tidak yakin ada kebutuhan untuk menjalankan ini, tapi saya pikir Anda mendapatkan intinya, jadi saya akan berhenti di situ.

## Tanya Jawab dengan Dokumen

Jadi kita memiliki situasi tanya jawab di mana Anda memiliki dokumen di sini yang bisa jauh lebih dari ini, tetapi Rachel pergi ke Harvard waktu ketika Stanford, ini efektif seperti apa tampilannya, seperti yang saya katakan berisi konten halaman dan metadata opsional, dan saya hanya akan menjalankan ini sehingga Anda dapat melihat apa yang terjadi, Anda dapat melihat panggilan chain call mengambil Docs dan juga pertanyaan, dan meneruskannya ke model juga.

Jadi mari kita lihat apa yang terjadi sekarang, jadi kita tanyakan pertanyaan di mana Rachel pergi ke perguruan tinggi dan kita mendapatkan respons Rachel pergi ke Harvard yang teksnya memang mengatakan Rachel pergi ke Harvard, keren.

## Contoh Final: QA dengan Vector Database

Mari kita beralih ke contoh final saya percaya, dan ini di mana menjadi sangat menarik, sekarang sebelum kita masuk, saya hanya ingin mengatakan bahwa Anda tahu ada beberapa utilitas berguna di sini, apa yang saya coba lakukan di sini hanya semacam saya kira memecah sihir di baliknya, tidak terlalu banyak, tetapi hanya dasar-dasar apa yang terjadi, jadi Anda embed kueri, Anda efektif embedding menggunakan fungsi ini disebut embed query similarity Vector search, jadi lagi ini di mana kita ingin melihat apa yang saat ini ada di vector store dan dibandingkan dengan kueri kita, dan semakin dekat angka dalam hal skor kemiripan, maka itulah yang ingin kita dapatkan kembali, dan jadi lagi Anda dapat melihat pustaka ini, jadi hanya memiliki bidang di balik logika backend, dan lagi banyak pujian untuk tim LangChain untuk inspirasi untuk ini.

### Keajaiban Vector Search

Mari kita kembali ke contoh final dan itu adalah di mana keajaiban benar-benar mulai menonjol, dan ini di mana Anda mulai tanya jawab dokumen, jadi apa yang terjadi di sini, efektifnya kita memiliki Pinecone, kita inisiasi sebagai penyimpanan, kita memiliki, hanya memeriksa silang bahwa indeks tertentu yang kita indeks di dalam penyimpanan yang memiliki data kita, lagi ini indeks ini telah dimuat sebelumnya dengan data dari pidato yang saya tunjukkan sebelumnya yang ada di teks besar, dan ini adalah kueri, jadi kueri adalah "berapa banyak pekerjaan baru yang diciptakan ekonomi", mari kita pergi dan verifikasi.

Jadi jika saya lakukan control F job created, sebenarnya ekonomi menciptakan lebih dari 6,5 juta pekerjaan baru hanya tahun lalu, oke jadi Anda dapat melihat ini adalah badan teks besar, ada banyak yang terjadi, jadi mari kembali dan lihat apakah kita bisa mendapatkan jawaban yang berguna dari dokumen besar ini.

Jadi kita akan memanggil Vector DBA chain, lagi jangan ikuti sintaks ini terlalu dekat karena ini hampir seperti fungsi kustom yang saya buat yang saya tunjukkan sebelumnya, tetapi selalu efektif melakukan adalah mengambil kueri, mengambil indeks yang Anda lihat sebelumnya, jadi memberi Anda operasi crud tipikal untuk membuat membaca memperbarui menghapus namespace, jadi apa namespace di mana vektor disimpan, dan berapa banyak hasil yang ingin Anda kembalikan yang mirip, kita meneruskan semua itu, kita jalankan melalui fungsi vector search, dan kita melakukan hal lain, tidak terlalu gila, tetapi di sini kita hanya fokus pada prinsip pertama.

Jadi efektifnya kita telah menjalankan rantai itu yang mencakup model bahasa besar, kueri, indeks, namespace, semua hal yang dapat Anda bayangkan akan diperlukan termasuk prompt yang disediakan oleh LangChain untuk menyusun dan mencoba menemukan informasi yang relevan.

### Menjalankan Contoh Final

Jadi mari bersihkan ini, dan jika saya hanya pergi ke question answer docs.tf, jadi mari jalankan ini, jadi ini adalah pertanyaan, dan mari lihat apa responsnya, jadi semoga jari disilangkan kita berakhir dengan sesuatu seperti itu, lihat apakah dia akan mengetahuinya, oh oh ini dia, kita mendapatkan jawaban di sini, lebih dari 6,5 juta pekerjaan, dan yang cukup keren adalah sekarang mari kita jalankan kembali, mari lihat apa yang terjadi.

Jadi apa yang terjadi, Anda dapat melihat kita memiliki vektor di sini, kita membagi teks, lalu kita punya, ya jadi sekarang kita punya hasil similarity search yang ada di dalam fungsi ini, Anda dapat melihat ini Anda tahu setiap Vektor memiliki ID skor metadata yang berisi teks, Anda dapat melihat bahwa cuplikan teks ini yang merupakan chunk yang kita bagi awalnya adalah yang paling mirip dalam hal vektor ke pertanyaan ini, itu sebabnya saya yang pertama muncul karena ini adalah vektor dari kueri ini dan vektor ini yang 1536 Dimensi dibandingkan dengan vektor di database, dan jika menemukan bahwa ID 11 adalah yang paling mirip, jadi ini adalah teks, dan kemudian ID 17 adalah yang kedua paling mirip, dan seterusnya.

Jadi begitulah cara kemiripan vektor bekerja, dan jadi kita terus turun, dan Anda dapat melihat hanya lebih banyak hal yang terjadi, tetapi akhirnya kita mendarat dengan respons akhir, kita pilih yang skor tertinggi, kita teruskan ke, Anda dapat melihat ini adalah template yang disediakan oleh LangChain yang tidak harus saya tulis, gunakan potongan konteks berikut, jika Anda tidak tahu jawabannya, katakan saja Anda tidak tahu, Anda meneruskannya sebagai konteks, lalu kita tanyakan pertanyaan yang ada di sini, lalu kita tinggalkan celah untuk jawaban yang membantu, dan voila.

## Kesimpulan

Jadi begitulah cara kerjanya secara singkat, tidak terlalu gila, tetapi sangat menarik, sangat menarik, dan ya efektifnya segala sesuatu yang harus Anda abstraksi sendiri, mencari tahu masalah, struktur, bagaimana saya mengekstrak data, bagaimana saya efektif mengintegrasikan alat berbeda dengan model bahasa besar, bagaimana saya menskalakan aplikasi saya, bagaimana saya membuatnya lebih hemat biaya, LangChain benar-benar
