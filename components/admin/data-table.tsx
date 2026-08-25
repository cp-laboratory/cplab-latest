"use client";

import { useState } from "react";
import { Loader2, Pencil, Trash2, Eye } from "lucide-react";
import type { ReactNode } from "react";
import ConfirmDialog from "./confirm-dialog";

export interface Column<T> {
  key: string;
  label: string;
  render?: (row: T) => ReactNode;
  className?: string;
}

export default function DataTable<T extends { id: string }>({
  columns,
  rows,
  loading,
  onEdit,
  onDelete,
  deleteMessage,
  onView,
  emptyMessage = "No records yet.",
}: {
  columns: Column<T>[];
  rows: T[];
  loading?: boolean;
  onEdit?: (row: T) => void;
  onDelete?: (row: T) => void | Promise<void>;
  deleteMessage?: (row: T) => string;
  onView?: (row: T) => void;
  emptyMessage?: string;
}) {
  const [pendingDelete, setPendingDelete] = useState<T | null>(null);
  const [deleting, setDeleting] = useState(false);

  const confirmDelete = async () => {
    if (!pendingDelete || !onDelete) return;
    setDeleting(true);
    try {
      await onDelete(pendingDelete);
      setPendingDelete(null);
    } finally {
      setDeleting(false);
    }
  };

  if (loading) {
    return (
      <div className="academic-card rounded-2xl p-16 flex items-center justify-center">
        <Loader2 className="w-6 h-6 text-oxford-600 animate-spin" />
      </div>
    );
  }

  if (rows.length === 0) {
    return (
      <div className="academic-card rounded-2xl p-16 text-center text-gray-400">
        <p>{emptyMessage}</p>
      </div>
    );
  }

  return (
    <div className="academic-card rounded-2xl overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-200">
              {columns.map((col) => (
                <th
                  key={col.key}
                  className="text-left font-medium text-gray-500 uppercase tracking-wide text-xs px-5 py-4 whitespace-nowrap"
                >
                  {col.label}
                </th>
              ))}
              {(onEdit || onDelete || onView) && (
                <th className="text-right font-medium text-gray-500 uppercase tracking-wide text-xs px-5 py-4">
                  Actions
                </th>
              )}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-b border-gray-200 last:border-0 hover:bg-gray-50 transition-colors">
                {columns.map((col) => (
                  <td key={col.key} className={`px-5 py-4 text-gray-700 align-top ${col.className || ""}`}>
                    {col.render ? col.render(row) : String((row as Record<string, unknown>)[col.key] ?? "—")}
                  </td>
                ))}
                {(onEdit || onDelete || onView) && (
                  <td className="px-5 py-4 text-right whitespace-nowrap">
                    <div className="flex items-center justify-end gap-2">
                      {onView && (
                        <button
                          onClick={() => onView(row)}
                          className="p-2 rounded-lg text-gray-500 hover:text-oxford-600 hover:bg-oxford-50 transition-colors"
                          aria-label="View"
                        >
                          <Eye className="w-4 h-4" />
                        </button>
                      )}
                      {onEdit && (
                        <button
                          onClick={() => onEdit(row)}
                          className="p-2 rounded-lg text-gray-500 hover:text-oxford-600 hover:bg-oxford-50 transition-colors"
                          aria-label="Edit"
                        >
                          <Pencil className="w-4 h-4" />
                        </button>
                      )}
                      {onDelete && (
                        <button
                          onClick={() => setPendingDelete(row)}
                          className="p-2 rounded-lg text-gray-500 hover:text-red-600 hover:bg-red-500/10 transition-colors"
                          aria-label="Delete"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      )}
                    </div>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <ConfirmDialog
        open={!!pendingDelete}
        message={pendingDelete ? deleteMessage?.(pendingDelete) ?? "Delete this record? This cannot be undone." : ""}
        loading={deleting}
        onConfirm={confirmDelete}
        onCancel={() => setPendingDelete(null)}
      />
    </div>
  );
}
