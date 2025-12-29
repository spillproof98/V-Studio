"use client";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import { useExportStore } from "@/store/exportStore";

export default function ExportModal() {
  const {
    open,
    progress,
    output,
    startExport,
    close,
  } = useExportStore();

  if (!open) return null;

  return (
    <Modal title="Export Video" onClose={close}>
      <div className="space-y-4 text-sm">
        {/* SETTINGS (UI only for now) */}
        {progress === 0 && (
          <>
            <Dropdown
              label="Resolution"
              options={["1080p", "720p"]}
              defaultValue="1080p"
            />
            <Dropdown
              label="Format"
              options={["MP4"]}
              defaultValue="MP4"
            />

            <div className="flex justify-end gap-2">
              <Button variant="secondary" onClick={close}>
                Cancel
              </Button>
              <Button onClick={startExport}>Export</Button>
            </div>
          </>
        )}

        {/* PROGRESS */}
        {progress > 0 && progress < 100 && (
          <div>
            <p className="mb-2">Rendering…</p>
            <div className="h-2 bg-gray-700 rounded">
              <div
                className="h-2 bg-blue-600 rounded"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="mt-1 text-xs">{progress}%</p>
          </div>
        )}

        {/* DOWNLOAD */}
        {progress === 100 && output && (
          <div className="space-y-3">
            <p className="text-green-400">
              Export complete 🎉
            </p>
            <a
              href={output}
              download
              className="text-blue-400 underline"
            >
              Download Video
            </a>

            <div className="flex justify-end">
              <Button variant="secondary" onClick={close}>
                Close
              </Button>
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
}
