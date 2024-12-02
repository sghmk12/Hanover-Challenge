export const API_CONFIG = {
  OPENAI: {
    MODEL: "gpt-3.5-turbo",
    MAX_TOKENS: 500,
    TEMPERATURE: 0.7,
    SYSTEM_PROMPT:
      "You are a helpful AI that summarizes search results. " +
      "Create a coherent summary " +
      "and store the citations used in the summary text in a JSON object of the following format called CitationType: Record<number, string> " +
      "where the number key is the number in the summary text and the string is the URL of the search result. " +
      "Write numbered citations in the summary text as [number] next to the relevant text. " +
      "Format your response in the following JSON format: {summary: string, citations: CitationType}",
  },
  SERPAPI: {
    RESULTS_COUNT: 5,
  },
};
