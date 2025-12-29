export default function Button({
  children,
  onClick,
  variant = "primary",
}: {
  children: React.ReactNode;
  onClick?: () => void;
  variant?: "primary" | "secondary";
}) {
  const base = "px-3 py-1 rounded text-xs";
  const styles =
    variant === "primary"
      ? "bg-blue-600 hover:bg-blue-500"
      : "bg-gray-700 hover:bg-gray-600";

  return (
    <button onClick={onClick} className={`${base} ${styles}`}>
      {children}
    </button>
  );
}
