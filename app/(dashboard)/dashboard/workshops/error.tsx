"use client";

export default function ErrorBboundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="p-8 text-center space-y-4">
      <h2 className="text-lg font-semibold text-red-600">Something went wrong!</h2>
      <button
        type="button"
        onClick={() => reset()}
        className="inline-flex items-center justify-center rounded-md bg-primary px-4 py=2 text-sm text-primary-foreground"
      >
        Try again
      </button>
    </div>
  );
}
