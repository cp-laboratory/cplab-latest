"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/page-header";
import DataTable, { type Column } from "@/components/admin/data-table";
import EntityFormModal, { type FieldConfig } from "@/components/admin/entity-form";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS, createDoc, updateDocById, deleteDocById } from "@/lib/firestore";
import type { Announcement } from "@/lib/types";

const fields: FieldConfig[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "description", label: "Description", type: "richtext", required: true },
  { key: "date", label: "Date", type: "text", required: true, placeholder: "YYYY-MM-DD" },
  { key: "link", label: "Link (optional)", type: "text", placeholder: "/recruitment" },
];

export default function AdminAnnouncementsPage() {
  const { data, loading } = useLiveCollection<Announcement>(COLLECTIONS.announcements, {
    orderByField: "date",
    orderDirection: "desc",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Announcement | null>(null);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (row: Announcement) => {
    setEditing(row);
    setModalOpen(true);
  };

  const handleSubmit = async (values: Record<string, unknown>) => {
    if (editing) await updateDocById(COLLECTIONS.announcements, editing.id, values);
    else await createDoc(COLLECTIONS.announcements, values);
  };

  const handleDelete = async (row: Announcement) => {
    await deleteDocById(COLLECTIONS.announcements, row.id);
  };

  const columns: Column<Announcement>[] = [
    { key: "title", label: "Title", render: (r) => <span className="text-gray-900 font-medium">{r.title}</span> },
    { key: "description", label: "Description", render: (r) => <span className="line-clamp-2 max-w-md block">{r.description}</span> },
    { key: "date", label: "Date" },
  ];

  return (
    <div>
      <PageHeader
        title="Announcements"
        description="Manage notices and announcements shown on the homepage."
        actionLabel="Add Announcement"
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
        title={editing ? "Edit Announcement" : "Add Announcement"}
        fields={fields}
        initialValues={editing ?? {}}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
