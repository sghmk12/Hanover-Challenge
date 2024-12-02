import OpenAI from "openai";
import { getJson } from "serpapi";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

async function getSearchResults(query: string) {
  try {
    const searchResults = await getJson({
      api_key: process.env.SERPAPI_API_KEY,
      engine: "google",
      q: query,
      num: 5,
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

    const searchResults = await getSearchResults(prompt);

    const formattedResults = searchResults
      .map(
        (result, index) =>
          `[${index + 1}] ${result.title}\n${result.snippet}\nSource: ${
            result.url
          }\n`
      )
      .join("\n");

    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content:
            "You are a helpful AI that summarizes search results. " +
            "Create a coherent summary of the search results. " +
            "When citing information, include the source number in square brackets [n] next to the relevant text. " +
            "After the summary, list all sources used with their numbers. " +
            "Format: \n\nSummary:\n[Your summary with [n] citations]\n\nSources:\n[1] URL1\n[2] URL2\netc.",
        },
        {
          role: "user",
          content: `Please summarize the following search results for the query: "${prompt}"\n\nSearch Results:\n${formattedResults}`,
        },
      ],
      temperature: 0.7,
      max_tokens: 500,
    });

    return new Response(completion.choices[0].message.content, {
      headers: {
        "Content-Type": "text/plain",
      },
    });
  } catch (error) {
    console.error("API Error:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
