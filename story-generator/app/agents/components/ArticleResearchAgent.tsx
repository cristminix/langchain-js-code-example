"use client";

import { marked } from "marked";
import React, { useState, FormEvent } from "react";

// Tipe data untuk hasil response
interface AgentResult {
  question?: string;
  output: string;
  intermediateSteps?: any;
}

export default function ArticleResearchAgent() {
  const [question, setQuestion] = useState<string>(
    "Udah berapa tahun sejak Brasil juara Piala Dunia?",
  );
  const [data, setData] = useState<AgentResult | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleSearch = async (e: FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setIsLoading(true);

    if (question) {
      try {
        const response = await fetch("api/agents", {
          method: "POST",

          body: JSON.stringify({
            question,
          }),
        });

        const data = await response.json();

        setData(data);
      } catch (error) {
        console.error(error);
        const { message } = error as Error;
        setData({ output: message });
      }
    }

    setIsLoading(false);
  };

  return (
    <div className="max-w-2xl mx-auto p-6 font-serif bg-gray-900 text-gray-100 min-h-screen">
      {/* Header */}
      <h1 className="text-4xl font-bold mb-6 flex items-center gap-2 text-white">
        <span className="text-4xl">🕵️‍♂️</span> Article research agent
      </h1>

      {/* Input Form */}
      <form onSubmit={handleSearch} className="flex gap-0 mb-8">
        <input
          type="text"
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Tanya apa saja"
          className="flex-1 border border-gray-700 p-2 text-lg outline-none focus:bg-gray-800 bg-gray-800 text-white"
        />
        <button
          type="submit"
          disabled={isLoading}
          className="bg-gray-700 cursor-pointer border border-l-0 border-gray-700 px-4 py-2 text-lg font-medium hover:bg-gray-600 transition-colors disabled:opacity-50 text-white"
        >
          {isLoading ? "Berfikir..." : "Ask question"}
        </button>
      </form>

      {/* Result Display */}
      {data && (
        <div className="space-y-4 text-xl">
          {/* Question Display */}
          <div className="flex gap-2">
            <span className="font-bold text-red-400 font-sans">?</span>
            <span className="font-bold text-blue-400">question:</span>
            <span>{data.question}</span>
          </div>

          {/* Answer Display */}
          <div className="flex gap-2">
            <span className="text-2xl">🤖</span>
            <span className="font-bold text-green-400">answer:</span>
            <div
              className="-mt-6 prose prose-sm max-w-none"
              dangerouslySetInnerHTML={{ __html: marked(data.output) }}
            />
          </div>

          {/* Tools Used Display */}
          {data.intermediateSteps && data.intermediateSteps?.length > 0 && (
            <div className="flex gap-2 items-start">
              <span className="text-2xl">🧰</span>
              <div>
                <span className="font-bold text-yellow-400">
                  {data.intermediateSteps.length} tools used:{" "}
                </span>
                <span className="font-mono text-lg">
                  {data.intermediateSteps
                    .map((step) => step.action.tool)
                    .join(", ")}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
