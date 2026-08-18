"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/page-header";
import DataTable, { type Column } from "@/components/admin/data-table";
import EntityFormModal, { type FieldConfig } from "@/components/admin/entity-form";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS, createDoc, updateDocById, deleteDocById } from "@/lib/firestore";
import type { Certificate } from "@/lib/types";

const fields: FieldConfig[] = [
  { key: "certId", label: "Certificate ID", type: "text", required: true, placeholder: "e.g., CPLAB-2024-001" },
  { key: "name", label: "Issued To", type: "text", required: true },
  { key: "date", label: "Issue Date", type: "text", required: true, placeholder: "e.g., January 15, 2024" },
  { key: "achievement", label: "Achievement", type: "text", required: true },
];

export default function AdminCertificatesPage() {
  const { data, loading } = useLiveCollection<Certificate>(COLLECTIONS.certificates, { orderByField: "certId" });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Certificate | null>(null);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (row: Certificate) => {
    setEditing(row);
    setModalOpen(true);
  };

  const handleSubmit = async (values: Record<string, unknown>) => {
    if (editing) await updateDocById(COLLECTIONS.certificates, editing.id, values);
    else await createDoc(COLLECTIONS.certificates, values);
  };

  const handleDelete = async (row: Certificate) => {
    await deleteDocById(COLLECTIONS.certificates, row.id);
  };

  const columns: Column<Certificate>[] = [
    { key: "certId", label: "Certificate ID", render: (r) => <span className="text-white font-mono">{r.certId}</span> },
    { key: "name", label: "Issued To" },
    { key: "achievement", label: "Achievement" },
    { key: "date", label: "Date" },
  ];

  return (
    <div>
      <PageHeader
        title="Certificates"
        description="Manage certificate records used for public verification."
        actionLabel="Add Certificate"
        onAction={openCreate}
      />
      <DataTable
        columns={columns}
        rows={data}
        loading={loading}
        onEdit={openEdit}
        onDelete={handleDelete}
        deleteMessage={(r) => `Delete certificate "${r.certId}"? This cannot be undone.`}
      />
      <EntityFormModal
        open={modalOpen}
        title={editing ? "Edit Certificate" : "Add Certificate"}
        fields={fields}
        initialValues={editing ?? {}}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
