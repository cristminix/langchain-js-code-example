import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { NextRequest } from "next/server";
import { createChatModel } from "@/app/global/fn/createChatModel";

// Create model inside the POST function to handle environment variable issues
export async function POST(req: NextRequest) {
  try {
    const { question } = await req.json();

    if (!question) {
      return Response.json({ error: "Question is required" }, { status: 400 });
    }

    let model;
    try {
      model = createChatModel();
    } catch (error) {
      console.error("Failed to create chat model:", error);
      return Response.json(
        {
          error: "AI service configuration error",
          message: error instanceof Error ? error.message : "Unknown error",
        },
        { status: 500 },
      );
    }

    const prompt = new PromptTemplate({
      inputVariables: ["question"],
      template: "Jawab pertanyaan pengguna {question} singkat saja",
    });

    const chain = prompt.pipe(model).pipe(new StringOutputParser());

    if (!chain) {
      return Response.json(
        { error: "Chain is not initialized properly" },
        { status: 500 },
      );
    }

    const answer = await chain.invoke({
      question,
    });

    return Response.json({ answer, question, tools: [] });
  } catch (error) {
    console.error("Error in POST /api/agents:", error);

    // Check if the error is specifically about reading properties of undefined
    if (
      error instanceof TypeError &&
      error.message.includes("Cannot read properties")
    ) {
      return Response.json(
        {
          error: "Service temporarily unavailable",
          details: "There was an issue with the AI service configuration",
        },
        { status: 500 },
      );
    }

    return Response.json(
      {
        error: "An error occurred processing your request",
        message: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    );
  }
}
