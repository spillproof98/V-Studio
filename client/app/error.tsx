"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="h-screen flex items-center justify-center text-red-500">
      {error.message}
    </div>
  );
}
