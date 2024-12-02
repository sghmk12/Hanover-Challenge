import React from "react";

interface SearchBoxProps {
  prompt: string;
  loading: boolean;
  onPromptChange: (value: string) => void;
  onSubmit: (e: React.FormEvent) => Promise<void>;
}

export default function SearchBox({
  prompt,
  loading,
  onPromptChange,
  onSubmit,
}: SearchBoxProps) {
  return (
    <form onSubmit={onSubmit} className="relative">
      <input
        type="text"
        value={prompt}
        onChange={(e) => onPromptChange(e.target.value)}
        placeholder="Ask anything..."
        className="search-box"
      />
      <button type="submit" className="search-button" disabled={loading}>
        {loading ? "Searching..." : "Search"}
      </button>
    </form>
  );
}
