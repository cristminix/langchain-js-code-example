import { PromptTemplate } from "@langchain/core/prompts";
import { StringOutputParser } from "@langchain/core/output_parsers";
import { NextRequest } from "next/server";
import { createChatModel } from "@/app/global/fn/createChatModel";
import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";
import { createReactAgent, AgentExecutor } from "@langchain/classic/agents";
import { Calculator } from "@langchain/community/tools/calculator";
import { pull } from "langchain/hub";

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

    // ! membuat kotak alat untuk agen
    // ! ingat untuk menjalankan 'npm install @langchain/community'
    const wikipediaQuery = new WikipediaQueryRun({ topKResults: 1 });

    const calculator = new Calculator();

    const tools = [wikipediaQuery, calculator];

    // ! mendapatkan aturan agen
    const prompt = await pull("hwchase17/react");

    // ! mendefinisikan Agen dan AgentExecutor
    const agent = await createReactAgent({
      llm: model,
      tools,
      prompt,
    });
    const agentExecutor = new AgentExecutor({
      agent,

      tools,
    });
    if (!agentExecutor) {
      return Response.json(
        { error: "Chain is not initialized properly" },
        { status: 500 },
      );
    }

    const answer = await agentExecutor.invoke({
      input: question,
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
