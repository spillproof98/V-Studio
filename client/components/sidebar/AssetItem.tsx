import { useEditorStore } from "@/store/editorStore";

export default function AssetItem({ label }: { label: string }) {
  const setSelection = useEditorStore((s) => s.setSelection);

  return (
    <div
      onClick={() => setSelection("video", null)}
      className="bg-gray-700 p-2 rounded text-xs text-gray-200 cursor-pointer hover:bg-gray-600"
    >
      {label}
    </div>
  );
}
