import { NextResponse } from "next/server";
import OpenAI from "openai";
import { getJson } from "serpapi";
import { API_CONFIG } from "../../constants/api";

// Initialize OpenAI
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

// Helper function to get search results
async function getSearchResults(query: string) {
  try {
    const searchResults = await getJson({
      api_key: process.env.SERPAPI_API_KEY,
      engine: "google",
      q: query,
      num: API_CONFIG.SERPAPI.RESULTS_COUNT,
    });

    return searchResults.organic_results.map((result: any) => ({
      title: result.title,
      url: result.link,
      snippet: result.snippet,
    }));
  } catch (error) {
    console.error("Search API Error:", error);
    return [];
  }
}

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();

    // Get real search results
    const searchResults = await getSearchResults(prompt);

    // Format search results for the AI summary
    const formattedResults = searchResults
      .map(
        (result, index) =>
          `[${index + 1}] ${result.title}\n${result.snippet}\nSource: ${
            result.url
          }\n`
      )
      .join("\n");

    // Generate AI summary using OpenAI
    const completion = await openai.chat.completions.create({
      model: API_CONFIG.OPENAI.MODEL,
      messages: [
        {
          role: "system",
          content: API_CONFIG.OPENAI.SYSTEM_PROMPT,
        },
        {
          role: "user",
          content: `Please summarize the following search results for the query: "${prompt}"\n\nSearch Results:\n${formattedResults}`,
        },
      ],
      temperature: API_CONFIG.OPENAI.TEMPERATURE,
      max_tokens: API_CONFIG.OPENAI.MAX_TOKENS,
    });

    return NextResponse.json({
      summaryData: completion.choices[0].message.content,
      searchResults,
    });
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
