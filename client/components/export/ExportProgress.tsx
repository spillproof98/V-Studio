"use client";

import Modal from "../ui/Modal";
import Button from "../ui/Button";
import Dropdown from "../ui/Dropdown";
import { useExportStore } from "@/store/exportStore";

export default function ExportModal() {
  const { open, startExport, close } = useExportStore();

  if (!open) return null;

  return (
    <Modal title="Export Video" onClose={close}>
      <div className="space-y-4 text-sm">
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
      </div>
    </Modal>
  );
}
