"use client"

import { useState } from "react"
import { useTimer } from "../global/hooks/useTimer"
import { formatTime } from "../global/fn/formatTime"
import { marked } from "marked"

export default function Home() {
  //! tambahkan variabel status baru
  const [docStatus, setDocStatus] = useState<string | boolean>(() => {
    if (typeof localStorage !== "undefined") {
      const savedUrl = localStorage.getItem("url")
      return savedUrl ? `✅ Dimuat: ${savedUrl}` : false
    }
    return false
  })

  const [isLoading, setIsLoading] = useState(false)
  const [answer, setAnswer] = useState()

  const elapsedTime = useTimer(isLoading)
  const askQuestion = async () => {
    // setAnswer("")
    setIsLoading(true)
    const question = (
      document.getElementsByName("question")[0] as HTMLInputElement
    ).value

    const response = await fetch("api/rag", {
      method: "POST",
      body: JSON.stringify({ question }),
    })

    const { data } = await response.json()
    // Tambahkan fakta baru ke array
    setAnswer(data.answer)
    // setAnswer(data)
    setIsLoading(false)
  }
  //! minta URL, teruskan ke backend, perbarui docStatus

  const loadUrl = async (e) => {
    const url = prompt("Silakan masukkan URL untuk konteks dokumen:")
    if (url && url.trim() !== "") {
      localStorage.setItem("url", url)
      const response = await fetch("api/rag", {
        method: "POST",
        body: JSON.stringify({ url }),
      })

      const { loaded } = await response.json()
      setDocStatus(loaded ? `✅ Dimuat: ${url}` : false)
    }
  }
  return (
    <div className="p-4 w-lg mx-auto">
      <h1 className="text-2xl text-center">Chatbot Dokumen</h1>
      <div className="py-4 flex items-center">
        <button
          disabled={isLoading}
          className="p-2 border border-gray-300 cursor-pointer block mt-2 bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={loadUrl}
        >
          📥 Muat URL
        </button>
        <span className="p-4">{docStatus}</span>
      </div>
      <div className="flex flex-col items-center">
        <input
          name="question"
          className="p-2 border border-gray-300 bg-white text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600 w-full"
        />

        <button
          disabled={isLoading}
          className="p-2 border border-gray-300 cursor-pointer block mt-2 bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed w-64"
          onClick={askQuestion}
        >
          {isLoading
            ? `⏳ Sedang memproses... (${formatTime(elapsedTime)})`
            : "🧠 Tanya Chat Bot"}
        </button>
      </div>
      {answer && (
        <div className="p-2 mt-2 border  dark:bg-gray-800 dark:text-white dark:border-gray-600">
          <div
            className="mt-2  prose prose-sm max-w-none"
            dangerouslySetInnerHTML={{ __html: marked(answer) }}
          ></div>
        </div>
      )}
    </div>
  )
}
