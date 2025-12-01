"use client"

import { marked } from "marked"
import { useState } from "react"
import { formatTime } from "./global/fn/formatTime"
import { useTimer } from "./global/hooks/useTimer"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [isLoadingStoryBody, setIsLoadingStoryBody] = useState(false)
  const [storyTitle, setStoryTitle] = useState("")
  const [storyBody, setStoryBody] = useState("")

  const elapsedTime = useTimer(isLoading)
  const storyBodyElapsedTime = useTimer(isLoadingStoryBody)
  const startStoryStream = async () => {
    setIsLoadingStoryBody(true)
    setStoryBody("")

    try {
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ storyTitle }),
      })
      if (response.ok && response.body) {
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
    } catch (error) {
      console.error("Error streaming story:", error)
    } finally {
      setIsLoadingStoryBody(false)
    }
  }
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const subject = formData.get("subject") as string

    setIsLoading(true)
    setStoryTitle("")
    try {
      // panggil LLM dengan subjek sebagai prompt utama
      const response = await fetch("/api/generate-story", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ subject }),
      })

      // destructure dan cetak data respons
      let { data } = await response.json()
      if (data.kwargs) {
        data = data.kwargs
      }
      const { content, text } = data
      const finalContent = content ?? text
      console.log(finalContent)
      setStoryTitle(finalContent)
      setStoryBody("")
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <>
      <div className="p-4">
        <h1 className="text-2xl">The Story Maker</h1>

        <em>
          Aplikasi ini menggunakan Model GPT untuk menghasilkan cerita untuk
          anak-anak.
        </em>

        <form onSubmit={onSubmitHandler} className="p-2">
          <label htmlFor="subject" className="block">
            Subjek utama cerita:{" "}
          </label>

          <select
            name="subject"
            className="p-2 border w-full dark:bg-gray-800 dark:text-white dark:border-gray-600"
          >
            <option value="kucing">Kucing</option>
            <option value="kuda">Kuda</option>
            <option value="peri">Peri</option>
            <option value="dinosaurus">Dinosaurus</option>
            <option value="naga">Naga</option>
            <option value="pesawat">Pesawat</option>
            <option value="robot">Robot</option>
            <option value="laut">Laut</option>
            <option value="hutan">Hutan</option>
            <option value="bola">Bola</option>
            <option value="matahari">Matahari</option>
            <option value="bintang">Bintang</option>
            <option value="sekolah">Sekolah</option>
          </select>
          <div className="flex justify-end">
            <button
              className="p-2 border cursor-pointer block mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
              disabled={isLoading}
              type="submit"
            >
              {isLoading
                ? `⏳ Sedang memproses... (${formatTime(elapsedTime)})`
                : "🧠 Tanya Model AI"}
            </button>
          </div>
        </form>
        {storyTitle && (
          <div className="px-2">
            {/* <label htmlFor="result" className="block">Hasil cerita: </label> */}
            <div
              className="p-2 border prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: marked(storyTitle) }}
            />
          </div>
        )}
        {storyTitle && (
          <div className="px-2 ">
            <div className="flex justify-end">
              <button
                className="p-2 border cursor-pointer block mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isLoadingStoryBody}
                onClick={startStoryStream}
              >
                {isLoadingStoryBody
                  ? `⏳ Sedang memproses... (${formatTime(
                      storyBodyElapsedTime
                    )})`
                  : `🧠 Ceritakan kisah ${storyTitle}`}
              </button>
            </div>
            {storyBody && (
              <div
                className="p-2 mt-2 border prose prose-sm max-w-none"
                dangerouslySetInnerHTML={{ __html: marked(storyBody) }}
              />
            )}
          </div>
        )}
      </div>
    </>
  )
}
