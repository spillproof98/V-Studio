export default function Tooltip({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="group relative inline-block">
      {children}
      <span className="absolute hidden group-hover:block bg-black text-white text-[10px] px-2 py-1 rounded -top-6">
        {label}
      </span>
    </div>
  );
}
