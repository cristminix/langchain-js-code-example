import { NextRequest } from "next/server";
import { PromptTemplate } from "@langchain/core/prompts";
import { createChatModel } from "@/app/global/fn/createChatModel";
import { WikipediaQueryRun } from "@langchain/community/tools/wikipedia_query_run";
import { initializeAgentExecutorWithOptions } from "@langchain/classic/agents";
import { Calculator } from "@langchain/community/tools/calculator";

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

    // ! mendefinisikan Agen dan AgentExecutor dengan pendekatan classic
    const agentExecutor = await initializeAgentExecutorWithOptions(
      tools,
      model,
      {
        agentType: "zero-shot-react-description",
        verbose: true,
      },
    );

    if (!agentExecutor) {
      return Response.json(
        { error: "Chain is not initialized properly" },
        { status: 500 },
      );
    }

    // Get current date and time for context
    const currentDateTime = new Date().toISOString();

    // Create a prompt template that includes the current datetime
    const template = `Current date and time: {datetime}

Question: {question}`;
    const promptTemplate = new PromptTemplate({
      template,
      inputVariables: ["datetime", "question"],
    });

    // Format the input using the prompt template
    const formattedInput = await promptTemplate.format({
      datetime: currentDateTime,
      question: question,
    });

    const result = await agentExecutor.invoke({
      input: formattedInput,
    });

    // Extract the answer from the result object, as the agent returns a complex object
    const answer =
      result.output ||
      result.answer ||
      result.response ||
      JSON.stringify(result);
    return Response.json({
      answer,
      question,
      tools: ["wikipedia", "calculator"],
    });
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
