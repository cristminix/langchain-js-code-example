"use client"

import { useState } from "react"
import { formatTime } from "../global/fn/formatTime"
import { useTimer } from "../global/hooks/useTimer"

export default function TriviaPage() {
  const [question, setQuestion] = useState()
  // menambahkan variabel status array kosong untuk menyimpan jawaban
  const [isLoading, setIsLoading] = useState(false)
  const elapsedTime = useTimer(isLoading)

  const [answers, setAnswers] = useState([])

  const getTriviaQuestion = async () => {
    setIsLoading(true)

    const response = await fetch("api/trivia")
    const data = await response.json()
    console.log(data)
    setQuestion(data.question)
    // setelah kita memiliki jawaban, perbarui status
    setAnswers(data.answers)
    setIsLoading(false)
  }
  return (
    <>
      <h1 className="text-2xl">Trivia Geografi</h1>
      <button
        onClick={getTriviaQuestion}
        className="p-2 border border-gray-300 cursor-pointer block mt-2 bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:dark:bg-gray-700"
      >
        {isLoading
          ? `⏳ Sedang memproses... (${formatTime(elapsedTime)})`
          : "🧠  Ajukan pertanyaan geografi kepada saya"}
      </button>

      <p className="text-gray-900 dark:text-gray-300 mt-4">{question}</p>
      {/* ulangi dan tampilkan setiap jawaban sebagai tombol */}
      <div className="flex flex-wrap gap-2 mt-4">
        {answers.map((answ, i) => (
          <button
            key={i}
            className="p-2 border border-gray-300 cursor-pointer bg-white text-gray-900 hover:bg-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-600 hover:dark:bg-gray-700"
          >
            {answ}
          </button>
        ))}
      </div>
    </>
  )
}
