"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/page-header";
import DataTable, { type Column } from "@/components/admin/data-table";
import EntityFormModal, { type FieldConfig } from "@/components/admin/entity-form";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS, createDoc, updateDocById, deleteDocById } from "@/lib/firestore";
import type { Publication } from "@/lib/types";

const fields: FieldConfig[] = [
  { key: "title", label: "Title", type: "text", required: true },
  { key: "slug", label: "URL Slug", type: "text", required: true },
  { key: "authors", label: "Authors", type: "tags", required: true, placeholder: "Comma-separated author names" },
  {
    key: "type",
    label: "Publication Type",
    type: "select",
    required: true,
    options: [
      { label: "Journal", value: "journal" },
      { label: "Conference", value: "conference" },
      { label: "Book Chapter", value: "book-chapter" },
      { label: "Workshop", value: "workshop" },
    ],
  },
  { key: "venue", label: "Venue", type: "text", required: true },
  { key: "year", label: "Year", type: "number", required: true },
  { key: "abstract", label: "Abstract", type: "richtext" },
  { key: "keywords", label: "Keywords", type: "tags", placeholder: "Comma-separated keywords" },
  { key: "doi", label: "DOI", type: "text" },
  { key: "arxiv", label: "arXiv URL", type: "text" },
  { key: "pdfUrl", label: "PDF URL", type: "text" },
  { key: "citations", label: "Citations", type: "number" },
];

export default function AdminPublicationsPage() {
  const { data, loading } = useLiveCollection<Publication>(COLLECTIONS.publications, {
    orderByField: "year",
    orderDirection: "desc",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<Publication | null>(null);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (row: Publication) => {
    setEditing(row);
    setModalOpen(true);
  };

  const handleSubmit = async (values: Record<string, unknown>) => {
    if (editing) await updateDocById(COLLECTIONS.publications, editing.id, values);
    else await createDoc(COLLECTIONS.publications, values);
  };

  const handleDelete = async (row: Publication) => {
    await deleteDocById(COLLECTIONS.publications, row.id);
  };

  const columns: Column<Publication>[] = [
    {
      key: "title",
      label: "Title",
      render: (r) => <span className="text-gray-900 font-medium line-clamp-2 max-w-md block">{r.title}</span>,
    },
    { key: "type", label: "Type", render: (r) => <span className="capitalize">{r.type.replace("-", " ")}</span> },
    { key: "venue", label: "Venue" },
    { key: "year", label: "Year" },
    { key: "citations", label: "Citations" },
  ];

  return (
    <div>
      <PageHeader
        title="Publications"
        description="Manage journal, conference, and book chapter publications."
        actionLabel="Add Publication"
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
        title={editing ? "Edit Publication" : "Add Publication"}
        fields={fields}
        initialValues={editing ?? {}}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
