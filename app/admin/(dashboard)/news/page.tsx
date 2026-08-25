"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/page-header";
import DataTable, { type Column } from "@/components/admin/data-table";
import EntityFormModal, { type FieldConfig } from "@/components/admin/entity-form";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS, createDoc, updateDocById, deleteDocById } from "@/lib/firestore";
import type { NewsArticle } from "@/lib/types";

const fields: FieldConfig[] = [
  { key: "coverImage", label: "Cover Image", type: "image" },
  { key: "title", label: "Title", type: "text", required: true },
  { key: "slug", label: "URL Slug", type: "text", required: true },
  { key: "excerpt", label: "Excerpt", type: "textarea", rows: 2, required: true },
  { key: "content", label: "Content", type: "richtext", required: true },
  { key: "author", label: "Author", type: "text", required: true },
  { key: "publishedDate", label: "Published Date", type: "text", required: true, placeholder: "YYYY-MM-DD" },
  { key: "category", label: "Category", type: "text", required: true, placeholder: "e.g., Research Achievement" },
  { key: "tags", label: "Tags", type: "tags", placeholder: "Comma-separated tags" },
  { key: "featured", label: "Feature this article", type: "checkbox" },
];

export default function AdminNewsPage() {
  const { data, loading } = useLiveCollection<NewsArticle>(COLLECTIONS.news, {
    orderByField: "publishedDate",
    orderDirection: "desc",
  });
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<NewsArticle | null>(null);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (row: NewsArticle) => {
    setEditing(row);
    setModalOpen(true);
  };

  const handleSubmit = async (values: Record<string, unknown>) => {
    if (editing) await updateDocById(COLLECTIONS.news, editing.id, values);
    else await createDoc(COLLECTIONS.news, values);
  };

  const handleDelete = async (row: NewsArticle) => {
    await deleteDocById(COLLECTIONS.news, row.id);
  };

  const columns: Column<NewsArticle>[] = [
    {
      key: "title",
      label: "Title",
      render: (r) => <span className="text-gray-900 font-medium line-clamp-2 max-w-md block">{r.title}</span>,
    },
    { key: "category", label: "Category" },
    { key: "publishedDate", label: "Published" },
    { key: "featured", label: "Featured", render: (r) => (r.featured ? "Yes" : "No") },
  ];

  return (
    <div>
      <PageHeader
        title="News"
        description="Manage news articles and research announcements."
        actionLabel="Add Article"
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
        title={editing ? "Edit Article" : "Add Article"}
        fields={fields}
        initialValues={editing ?? {}}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
