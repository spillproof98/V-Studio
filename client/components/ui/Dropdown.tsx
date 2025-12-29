export default function Dropdown({
  label,
  options,
  defaultValue,
}: {
  label: string;
  options: string[];
  defaultValue?: string;
}) {
  return (
    <label className="block text-xs">
      <span className="text-gray-400">{label}</span>
      <select
        defaultValue={defaultValue}
        className="w-full mt-1 bg-gray-800 p-1 rounded"
      >
        {options.map((o) => (
          <option key={o}>{o}</option>
        ))}
      </select>
    </label>
  );
}
