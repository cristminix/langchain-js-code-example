"use client"

import { marked } from "marked"
import { useState, useEffect, useRef } from "react"

export default function Home() {
  const [isLoading, setIsLoading] = useState(false)
  const [storyResult, setStoryResult] = useState("")
  const [elapsedTime, setElapsedTime] = useState(0)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const onSubmitHandler = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const formData = new FormData(event.currentTarget)
    const subject = formData.get("subject") as string

    setIsLoading(true)
    setStoryResult("")
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
      const { data } = await response.json()

      const content = data?.text
      console.log(content)
      setStoryResult(content)
    } catch (error) {
      console.error("Error:", error)
    } finally {
      setIsLoading(false)
    }
  }

  // Timer effect untuk menghitung waktu yang berjalan
  useEffect(() => {
    if (isLoading) {
      // Reset timer saat loading dimulai
      setElapsedTime(0)
      intervalRef.current = setInterval(() => {
        setElapsedTime((prev) => prev + 1)
      }, 1000)
    } else {
      // Clear interval saat loading selesai
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }

    // Cleanup function
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
        intervalRef.current = null
      }
    }
  }, [isLoading])

  // Fungsi untuk format waktu
  const formatTime = (seconds: number) => {
    if (seconds < 60) {
      return `${seconds} detik`
    } else {
      const minutes = Math.floor(seconds / 60)
      const remainingSeconds = seconds % 60
      return `${minutes} menit${
        remainingSeconds > 0 ? ` ${remainingSeconds} detik` : ""
      }`
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

          <select name="subject" className="p-2 border w-full">
            <option value="kucing">Kucing</option>
            <option value="kuda">Kuda</option>
            <option value="peri">Peri</option>
          </select>

          <button
            className="p-2 border cursor-pointer block mt-2 disabled:opacity-50 disabled:cursor-not-allowed"
            disabled={isLoading}
            type="submit"
          >
            {isLoading
              ? `⏳ Sedang memproses... (${formatTime(elapsedTime)})`
              : "🧠 Tanya Model AI"}
          </button>
        </form>
        {storyResult && (
          <div className="px-2">
            {/* <label htmlFor="result" className="block">Hasil cerita: </label> */}
            <div
              className="p-2 border prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: marked(storyResult) }}
            />
          </div>
        )}
      </div>
    </>
  )
}
