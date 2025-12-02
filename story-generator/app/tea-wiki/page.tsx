"use client"

import { useState } from "react"
import { useTimer } from "../global/hooks/useTimer"
import { formatTime } from "../global/fn/formatTime"
import { marked } from "marked"

export default function Home() {
  const [answer, setAnswer] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const elapsedTime = useTimer(isLoading)
  const tellFact = async () => {
    setAnswer("")
    setIsLoading(true)
    const response = await fetch("api/tea-wiki", {
      method: "POST",
    })

    const { data } = await response.json()

    setAnswer(data)
    setIsLoading(false)
  }

  return (
    <div className="p-4 w-lg mx-auto">
      <h1 className="text-2xl">☕ Fakta Teh</h1>
      <button
        className="p-2 border border-gray-300 cursor-pointer block mt-2 bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:dark:bg-gray-700 disabled:opacity-50 disabled:cursor-not-allowed"
        onClick={tellFact}
      >
        {isLoading ? `⏳ Sedang memproses... (${formatTime(elapsedTime)})` : "🧠  Beritahu fakta tentang minuman favorit saya"}
      </button>

      {answer && <div className="p-2 mt-2 border  dark:bg-gray-800 dark:text-white dark:border-gray-600  prose prose-sm max-w-none" dangerouslySetInnerHTML={{ __html: marked(answer) }} />}
    </div>
  )
}
