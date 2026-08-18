"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/page-header";
import DataTable, { type Column } from "@/components/admin/data-table";
import EntityFormModal, { type FieldConfig } from "@/components/admin/entity-form";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS, createDoc, updateDocById, deleteDocById } from "@/lib/firestore";
import type { Resource } from "@/lib/types";

const fields: FieldConfig[] = [
  { key: "coverImage", label: "Cover Image", type: "image" },
  { key: "title", label: "Title", type: "text", required: true, placeholder: "e.g., Smart Grid IoT Sensor Readings" },
  { key: "slug", label: "URL Slug", type: "text", required: true, placeholder: "e.g., smart-grid-sensor-readings" },
  {
    key: "resourceType",
    label: "Resource Type",
    type: "select",
    required: true,
    options: [
      { label: "Dataset", value: "dataset" },
      { label: "Tool", value: "tool" },
      { label: "Code", value: "code" },
      { label: "Paper", value: "paper" },
    ],
  },
  { key: "category", label: "Category", type: "text", required: true, placeholder: "e.g., IoT, Blockchain, Machine Learning" },
  { key: "description", label: "Description", type: "textarea", rows: 4, required: true },
  { key: "tags", label: "Tags", type: "tags", placeholder: "Comma-separated tags" },
  { key: "fileUrl", label: "File URL", type: "text", helpText: "Direct download link, if hosted (e.g., a Cloudinary file)." },
  { key: "externalUrl", label: "External URL", type: "text", helpText: "e.g., GitHub, Kaggle, or another external host." },
  { key: "featured", label: "Feature on homepage", type: "checkbox" },
];

export default function AdminResourcesPage() {
  const { data, loading } = useLiveCollection<Resource>(COLLECTIONS.resources, { orderByField: "title" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Resource | null>(null);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (row: Resource) => {
    setEditing(row);
    setModalOpen(true);
  };

  const handleSubmit = async (values: Record<string, unknown>) => {
    if (editing) await updateDocById(COLLECTIONS.resources, editing.id, values);
    else await createDoc(COLLECTIONS.resources, values);
  };

  const handleDelete = async (row: Resource) => {
    await deleteDocById(COLLECTIONS.resources, row.id);
  };

  const columns: Column<Resource>[] = [
    { key: "title", label: "Title", render: (r) => <span className="text-white font-medium">{r.title}</span> },
    { key: "resourceType", label: "Type", render: (r) => <span className="capitalize">{r.resourceType}</span> },
    { key: "category", label: "Category" },
    { key: "featured", label: "Featured", render: (r) => (r.featured ? "Yes" : "No") },
  ];

  return (
    <div>
      <PageHeader
        title="Resources"
        description="Manage datasets, tools, code, and other downloadable research resources."
        actionLabel="Add Resource"
        onAction={openCreate}
      />
      <DataTable
        columns={columns}
        rows={data}
        loading={loading}
        onEdit={openEdit}
        onDelete={handleDelete}
        deleteMessage={(r) => `Delete "${r.title}"? This cannot be undone.`}
      />
      <EntityFormModal
        open={modalOpen}
        title={editing ? "Edit Resource" : "Add Resource"}
        fields={fields}
        initialValues={editing ?? {}}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
