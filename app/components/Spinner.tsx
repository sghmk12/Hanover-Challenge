export default function Spinner() {
  return (
    <div className="fixed top-0 left-0 w-full h-1 z-50">
      <div className="h-full bg-blue-600 animate-loading-bar"></div>
    </div>
  );
}
