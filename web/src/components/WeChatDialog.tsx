import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";

const TILE =
  "group flex w-full items-center gap-3 rounded-[var(--radius-card)] border border-border bg-surface p-3.5 text-left transition-colors hover:border-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent";

export default function WeChatDialog({
  qrSrc,
  qrSrcSet,
}: {
  qrSrc: string;
  qrSrcSet: string;
}) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setOpen(true)} className={TILE}>
        <span className="flex size-9 shrink-0 items-center justify-center">
          <svg className="size-7" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">
            <rect width="512" height="512" rx="15%" fill="#07C160" />
            <path
              fill="#fff"
              d="M402 369c23-17 38 -42 38 -70c0-51 -50 -92 -111 -92s-110 41-110 92s49 92 110 92c13 0 25-2 36 -5c4-1 8 0 9 1l25 14c3 2 6 0 5-4l-6-22c0-3 2 -5 4 -6m-110-85a15 15 0 110-29a15 15 0 010 29m74 0a15 15 0 110-29a15 15 0 010 29"
            />
            <path
              fill="#fff"
              d="m205 105c-73 0-132 50-132 111 0 33 17 63 45 83 3 2 5 5 4 10l-7 24c-1 5 3 7 6 6l30-17c3-2 7-3 11-2 26 8 48 6 51 6-24-84 59-132 123-128-10-52-65-93-131-93m-44 93a18 18 0 1 1 0-35 18 18 0 0 1 0 35m89 0a18 18 0 1 1 0-35 18 18 0 0 1 0 35"
            />
          </svg>
        </span>
        <span className="min-w-0">
          <span className="block text-sm font-medium text-text">WeChat</span>
          <span className="block text-xs text-muted">Scan QR Code</span>
        </span>
      </button>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-xs text-center">
          <DialogTitle>WeChat</DialogTitle>
          <DialogDescription>Scan the code to connect on WeChat.</DialogDescription>
          <img
            src={qrSrc}
            srcSet={qrSrcSet}
            alt="WeChat QR code"
            className="mx-auto mt-4 w-56 rounded-[var(--radius-sm)] border border-border"
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
