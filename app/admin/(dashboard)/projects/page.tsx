"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/page-header";
import DataTable, { type Column } from "@/components/admin/data-table";
import EntityFormModal, { type FieldConfig } from "@/components/admin/entity-form";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS, createDoc, updateDocById, deleteDocById } from "@/lib/firestore";
import type { Project } from "@/lib/types";

const fields: FieldConfig[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "slug", label: "URL Slug", type: "text", required: true },
  {
    key: "type",
    label: "Type",
    type: "select",
    required: true,
    options: [
      { label: "Research", value: "research" },
      { label: "Student", value: "student" },
      { label: "Industry", value: "industry" },
    ],
  },
  {
    key: "status",
    label: "Status",
    type: "select",
    required: true,
    options: [
      { label: "Active", value: "active" },
      { label: "Ongoing", value: "ongoing" },
      { label: "Completed", value: "completed" },
    ],
  },
  { key: "researchArea", label: "Research Area", type: "text", required: true, placeholder: "e.g., Blockchain, IoT" },
  { key: "description", label: "Short Description", type: "textarea", rows: 2, required: true },
  { key: "fullDescription", label: "Full Description", type: "textarea", rows: 5 },
  { key: "technologies", label: "Technologies", type: "tags", placeholder: "Comma-separated technologies" },
  { key: "team", label: "Team Members", type: "tags", placeholder: "Comma-separated member names" },
  { key: "startDate", label: "Start Date", type: "text", placeholder: "YYYY-MM" },
  { key: "endDate", label: "End Date", type: "text", placeholder: "YYYY-MM (leave blank if ongoing)" },
  { key: "githubUrl", label: "GitHub URL", type: "text" },
  { key: "liveUrl", label: "Live Demo URL", type: "text" },
  { key: "featured", label: "Feature on homepage", type: "checkbox" },
];

export default function AdminProjectsPage() {
  const { data, loading } = useLiveCollection<Project>(COLLECTIONS.projects, { orderByField: "title" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Project | null>(null);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (row: Project) => {
    setEditing(row);
    setModalOpen(true);
  };

  const handleSubmit = async (values: Record<string, unknown>) => {
    if (editing) await updateDocById(COLLECTIONS.projects, editing.id, values);
    else await createDoc(COLLECTIONS.projects, values);
  };

  const handleDelete = async (row: Project) => {
    if (!confirm(`Delete "${row.title}"? This cannot be undone.`)) return;
    await deleteDocById(COLLECTIONS.projects, row.id);
  };

  const columns: Column<Project>[] = [
    { key: "title", label: "Title", render: (r) => <span className="text-white font-medium">{r.title}</span> },
    { key: "type", label: "Type", render: (r) => <span className="capitalize">{r.type}</span> },
    { key: "status", label: "Status", render: (r) => <span className="capitalize">{r.status}</span> },
    { key: "researchArea", label: "Area" },
    { key: "featured", label: "Featured", render: (r) => (r.featured ? "Yes" : "No") },
  ];

  return (
    <div>
      <PageHeader
        title="Projects"
        description="Manage research, student, and industry projects."
        actionLabel="Add Project"
        onAction={openCreate}
      />
      <DataTable columns={columns} rows={data} loading={loading} onEdit={openEdit} onDelete={handleDelete} />
      <EntityFormModal
        open={modalOpen}
        title={editing ? "Edit Project" : "Add Project"}
        fields={fields}
        initialValues={editing ?? {}}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
