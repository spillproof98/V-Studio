export default function IconButton({
  icon,
  onClick,
}: {
  icon: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="p-2 hover:bg-gray-700 rounded"
    >
      {icon}
    </button>
  );
}
