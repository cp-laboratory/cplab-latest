"use client";

import { Plus } from "lucide-react";

export default function PageHeader({
  title,
  description,
  actionLabel,
  onAction,
}: {
  title: string;
  description?: string;
  actionLabel?: string;
  onAction?: () => void;
}) {
  return (
    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
      <div>
        <h1 className="text-2xl font-medium text-gray-900">{title}</h1>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gradient-to-r from-jade-500 to-jade-900 text-gray-900 text-sm font-semibold hover:opacity-90 transition-all shadow-lg shadow-jade-500/20 shrink-0"
        >
          <Plus className="w-4 h-4" /> {actionLabel}
        </button>
      )}
    </div>
  );
}
