"use client";

import { X } from "lucide-react";
import type { ReactNode } from "react";

export default function DetailModal({
  open,
  title,
  onClose,
  children,
}: {
  open: boolean;
  title: string;
  onClose: () => void;
  children: ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl my-8">
        <div className="academic-card rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">{title}</h2>
            <button onClick={onClose} className="text-gray-500 hover:text-gray-900 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>
          <div className="px-6 py-6 space-y-4 max-h-[70vh] overflow-y-auto">{children}</div>
        </div>
      </div>
    </div>
  );
}

export function DetailField({ label, value }: { label: string; value?: string | number }) {
  if (value === undefined || value === null || value === "") return null;
  return (
    <div>
      <p className="text-xs text-gray-500 mb-1">{label}</p>
      <p className="text-sm text-gray-900/80 whitespace-pre-wrap leading-relaxed">{value}</p>
    </div>
  );
}
