interface SearchResult {
  title: string;
  url: string;
  snippet: string;
}

interface SearchResultsProps {
  results: SearchResult[];
}

export default function SearchResults({ results }: SearchResultsProps) {
  return (
    <div className="search-results">
      <h2 className="text-xl font-semibold mb-4">Search Results</h2>
      {results.map((result, index) => (
        <div key={index} className="search-result-item">
          <a
            href={result.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline font-medium"
          >
            {result.title}
          </a>
          <p className="text-gray-600 mt-2 text-sm">{result.snippet}</p>
        </div>
      ))}
    </div>
  );
}
