"use client";

import { useEffect, useState, type FormEvent } from "react";
import { X, Loader2 } from "lucide-react";
import ImageUploadField from "./image-upload-field";
import dynamic from "next/dynamic";

const RichTextEditor = dynamic(() => import("./rich-text-editor"), {
  ssr: false,
  loading: () => <div className="h-48 bg-gray-50 rounded-xl border border-gray-200 animate-pulse flex items-center justify-center text-sm text-gray-400">Loading editor...</div>
});

export type FieldType = "text" | "textarea" | "richtext" | "number" | "select" | "checkbox" | "tags" | "image";

export interface FieldConfig {
  key: string;
  label: string;
  type: FieldType;
  options?: { label: string; value: string }[];
  required?: boolean;
  placeholder?: string;
  rows?: number;
  helpText?: string;
}

type RawRecord = Record<string, unknown>;

const inputClass =
  "w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 text-sm focus:outline-none focus:border-jade-500/50 transition-colors";

function toFormValue(field: FieldConfig, raw: RawRecord): unknown {
  const v = raw[field.key];
  if (field.type === "tags") return Array.isArray(v) ? v.join(", ") : "";
  if (field.type === "number") return v === undefined || v === null ? "" : String(v);
  if (field.type === "checkbox") return Boolean(v);
  return v ?? "";
}

function buildInitialState(fields: FieldConfig[], raw: RawRecord): RawRecord {
  const state: RawRecord = {};
  for (const f of fields) state[f.key] = toFormValue(f, raw);
  return state;
}

function serializeValues(fields: FieldConfig[], state: RawRecord): RawRecord {
  const out: RawRecord = {};
  for (const f of fields) {
    const v = state[f.key];
    if (f.type === "tags") {
      out[f.key] = String(v)
        .split(",")
        .map((s) => s.trim())
        .filter(Boolean);
    } else if (f.type === "number") {
      out[f.key] = v === "" ? null : Number(v);
    } else if (f.type === "checkbox") {
      out[f.key] = Boolean(v);
    } else {
      out[f.key] = v;
    }
  }
  return out;
}

export default function EntityFormModal({
  open,
  title,
  fields,
  initialValues,
  onClose,
  onSubmit,
}: {
  open: boolean;
  title: string;
  fields: FieldConfig[];
  initialValues: object;
  onClose: () => void;
  onSubmit: (values: RawRecord) => Promise<void>;
}) {
  const [state, setState] = useState<RawRecord>({});
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (open) {
      setState(buildInitialState(fields, initialValues as RawRecord));
      setError("");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, initialValues]);

  if (!open) return null;

  const update = (key: string, value: unknown) => setState((s) => ({ ...s, [key]: value }));

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    try {
      await onSubmit(serializeValues(fields, state));
      onClose();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start sm:items-center justify-center p-4 overflow-y-auto bg-black/70 backdrop-blur-sm">
      <div className="w-full max-w-2xl my-8">
        <form onSubmit={handleSubmit} className="academic-card rounded-2xl border border-gray-200 overflow-hidden">
          <div className="flex items-center justify-between px-6 py-5 border-b border-gray-200">
            <h2 className="text-lg font-medium text-gray-900">{title}</h2>
            <button type="button" onClick={onClose} className="text-gray-500 hover:text-gray-900 transition-colors">
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="px-6 py-6 space-y-5 max-h-[65vh] overflow-y-auto">
            {fields.map((field) => (
              <div key={field.key}>
                {field.type !== "checkbox" && field.type !== "image" && (
                  <label className="block text-sm font-medium text-gray-900/60 mb-2">
                    {field.label}
                    {field.required && <span className="text-red-600 ml-1">*</span>}
                  </label>
                )}

                {field.type === "text" && (
                  <input
                    type="text"
                    required={field.required}
                    value={String(state[field.key] ?? "")}
                    onChange={(e) => update(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className={inputClass}
                  />
                )}

                {field.type === "number" && (
                  <input
                    type="number"
                    required={field.required}
                    value={String(state[field.key] ?? "")}
                    onChange={(e) => update(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className={inputClass}
                  />
                )}

                {field.type === "textarea" && (
                  <textarea
                    required={field.required}
                    rows={field.rows || 4}
                    value={String(state[field.key] ?? "")}
                    onChange={(e) => update(field.key, e.target.value)}
                    placeholder={field.placeholder}
                    className={inputClass + " resize-none"}
                  />
                )}

                {field.type === "richtext" && (
                  <div className="bg-white rounded-xl overflow-hidden [&_.ql-toolbar]:rounded-t-xl [&_.ql-toolbar]:border-gray-200 [&_.ql-toolbar]:bg-gray-50 [&_.ql-container]:rounded-b-xl [&_.ql-container]:border-gray-200 [&_.ql-container]:min-h-[200px] [&_.ql-editor]:min-h-[200px] [&_.ql-editor]:text-gray-900">
                    <RichTextEditor
                      value={String(state[field.key] ?? "")}
                      onChange={(val) => update(field.key, val)}
                      placeholder={field.placeholder}
                    />
                  </div>
                )}

                {field.type === "tags" && (
                  <input
                    type="text"
                    value={String(state[field.key] ?? "")}
                    onChange={(e) => update(field.key, e.target.value)}
                    placeholder={field.placeholder || "Comma-separated values"}
                    className={inputClass}
                  />
                )}

                {field.type === "select" && (
                  <select
                    required={field.required}
                    value={String(state[field.key] ?? "")}
                    onChange={(e) => update(field.key, e.target.value)}
                    className={inputClass + " cursor-pointer"}
                  >
                    <option value="">Select...</option>
                    {field.options?.map((opt) => (
                      <option key={opt.value} value={opt.value}>
                        {opt.label}
                      </option>
                    ))}
                  </select>
                )}

                {field.type === "checkbox" && (
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={Boolean(state[field.key])}
                      onChange={(e) => update(field.key, e.target.checked)}
                      className="w-4 h-4 rounded accent-jade-500"
                    />
                    <span className="text-sm text-gray-900/60">{field.label}</span>
                  </label>
                )}

                {field.type === "image" && (
                  <ImageUploadField
                    label={field.label}
                    value={String(state[field.key] ?? "")}
                    onChange={(url) => update(field.key, url)}
                  />
                )}

                {field.helpText && <p className="text-xs text-gray-400 mt-1.5">{field.helpText}</p>}
              </div>
            ))}
          </div>

          {error && <p className="px-6 text-sm text-red-600 pb-2">{error}</p>}

          <div className="flex items-center justify-end gap-3 px-6 py-5 border-t border-gray-200">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 rounded-xl academic-card border border-gray-200 text-gray-900/60 text-sm hover:text-gray-900 transition-all"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex items-center gap-2 px-6 py-2.5 rounded-xl bg-gradient-to-r from-jade-500 to-jade-900 text-gray-900 text-sm font-semibold hover:opacity-90 transition-all disabled:opacity-50"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
