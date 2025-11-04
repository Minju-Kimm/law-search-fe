interface ErrorMessageProps {
  message: string;
}

export function ErrorMessage({ message }: ErrorMessageProps) {
  return (
    <div
      className="mb-6 p-4 rounded-2xl border text-center"
      style={{
        background: 'rgba(239, 68, 68, 0.12)',
        borderColor: 'rgba(239, 68, 68, 0.35)',
        color: 'white',
      }}
    >
      {message}
    </div>
  );
}
