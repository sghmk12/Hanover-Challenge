import SourcesList from "./SourcesList";

interface SummaryProps {
  summary: string;
  citations: Record<number, string>;
}

export default function Summary({ summary, citations }: SummaryProps) {
  return (
    <div className="summary-container">
      <h2 className="text-xl font-semibold mb-4">AI Summary</h2>
      <div className="prose max-w-none">
        <div className="text-gray-700 whitespace-pre-wrap">
          {summary}
          {citations && <SourcesList citations={citations} />}
        </div>
      </div>
    </div>
  );
}
