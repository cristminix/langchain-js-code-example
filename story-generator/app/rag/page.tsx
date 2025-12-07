"use client"

import { useState } from "react"
import { useTimer } from "../global/hooks/useTimer"
import { formatTime } from "../global/fn/formatTime"
import { marked } from "marked"

export default function Home() {
  // Ganti jawaban dengan array fakta
  const [facts, setFacts] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [answer, setAnswer] = useState()

  const elapsedTime = useTimer(isLoading)
  const askQuestion = async () => {
    // setAnswer("")
    setIsLoading(true)
    const response = await fetch("api/rag", {
      method: "POST",
    })

    const { data } = await response.json()
    // Tambahkan fakta baru ke array
    setAnswer(data)
    // setAnswer(data)
    setIsLoading(false)
  }

  return (
    <div className="p-4 w-lg mx-auto">
      <h1 className="text-2xl">Chatbot Dokumen</h1>
      <div className="flex">
        <input name="question" className="p-2 border border-gray-300 bg-white text-gray-900 dark:bg-gray-800 dark:text-white dark:border-gray-600" />

        <button
          disabled={isLoading}
          className="p-2 border border-gray-300 cursor-pointer block mt-2 bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
          onClick={askQuestion}
        >
          {isLoading ? `⏳ Sedang memproses... (${formatTime(elapsedTime)})` : "🧠 Tanya Chat Bot"}
        </button>
      </div>
      {answer && (
        <div className="p-2 mt-2 border  dark:bg-gray-800 dark:text-white dark:border-gray-600">
          <div className="mt-2  prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: marked(answer) }}></div>
        </div>
      )}
    </div>
  )
}
