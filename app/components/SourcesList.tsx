interface SourcesListProps {
  citations: Record<number, string>;
}

export default function SourcesList({ citations }: SourcesListProps) {
  return (
    <div className="mt-6 pt-4 border-t border-gray-200">
      <h3 className="text-lg font-semibold mb-3">Sources</h3>
      <ul className="space-y-2">
        {Object.entries(citations).map(([number, url]) => (
          <li key={number} className="flex items-start">
            <span className="inline-flex items-center justify-center min-w-[2rem] h-6 px-2 mr-2 text-sm bg-blue-100 text-blue-800 rounded">
              [{number}]
            </span>
            <a
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline break-all"
            >
              {url}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
