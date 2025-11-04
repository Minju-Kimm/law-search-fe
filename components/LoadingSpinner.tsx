export function LoadingSpinner() {
  return (
    <div className="text-center py-20">
      <div className="inline-flex gap-2">
        <div className="w-3 h-3 bg-white rounded-full animate-bounce" />
        <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:0.2s]" />
        <div className="w-3 h-3 bg-white rounded-full animate-bounce [animation-delay:0.4s]" />
      </div>
    </div>
  );
}
