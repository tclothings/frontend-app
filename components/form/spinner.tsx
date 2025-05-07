// components/Spinner.tsx
export default function Spinner() {
  return (
    <div className="flex items-center justify-center">
      <div className="h-5 w-5 animate-spin rounded-full border-2 border-gray-300 border-t-blue-500" />
    </div>
  );
}
