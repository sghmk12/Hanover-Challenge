"use client";

import React, { useState } from "react";
import SearchBox from "./components/SearchBox";
import SearchResults from "./components/SearchResults";
import Summary from "./components/Summary";

interface CitationType {
  [key: number]: string;
}

interface SummaryResponse {
  summary: string;
  citations: CitationType;
}

interface ChatResponse extends SummaryResponse {
  summaryData: string;
  searchResults: {
    title: string;
    snippet: string;
    url: string;
  }[];
}

export default function Home() {
  const [prompt, setPrompt] = useState("");
  const [summary, setSummary] = useState<SummaryResponse | null>(null);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt }),
      });

      const data = (await response.json()) as ChatResponse;
      try {
        const summaryData = JSON.parse(data.summaryData) as SummaryResponse;
        setSummary(summaryData);
      } catch (error) {
        try {
          const plainTextResponse = await fetch("/api/chat-plain", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ prompt }),
          });

          if (!plainTextResponse.ok) throw new Error();

          const plainTextData = await plainTextResponse.text();
          setSummary({ summary: plainTextData, citations: {} });
        } catch (plainTextError) {
          setSummary({
            summary: "Failed to generate summary. Please try again.",
            citations: {},
          });
        }
      }
      setSearchResults(data.searchResults);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen">
      <div className="search-container">
        <SearchBox
          prompt={prompt}
          loading={loading}
          onPromptChange={setPrompt}
          onSubmit={handleSearch}
        />

        {summary && (
          <div className="results-container">
            <Summary summary={summary.summary} citations={summary.citations} />
            <SearchResults results={searchResults} />
          </div>
        )}
      </div>
    </main>
  );
}
