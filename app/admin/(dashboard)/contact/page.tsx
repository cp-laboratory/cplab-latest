"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/page-header";
import DataTable, { type Column } from "@/components/admin/data-table";
import DetailModal, { DetailField } from "@/components/admin/detail-modal";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS, updateDocById, deleteDocById } from "@/lib/firestore";
import type { ContactMessage } from "@/lib/types";

export default function AdminContactPage() {
  const { data, loading } = useLiveCollection<ContactMessage>(COLLECTIONS.contact, {
    orderByField: "submittedAt",
    orderDirection: "desc",
  });
  const [viewing, setViewing] = useState<ContactMessage | null>(null);

  const handleView = async (row: ContactMessage) => {
    setViewing(row);
    if (!row.read) await updateDocById(COLLECTIONS.contact, row.id, { read: true });
  };

  const handleDelete = async (row: ContactMessage) => {
    await deleteDocById(COLLECTIONS.contact, row.id);
  };

  const columns: Column<ContactMessage>[] = [
    {
      key: "name",
      label: "From",
      render: (r) => (
        <div className="flex items-center gap-2">
          {!r.read && <span className="w-2 h-2 rounded-full bg-jade-400 shrink-0" />}
          <span className="text-gray-900 font-medium">{r.name}</span>
        </div>
      ),
    },
    { key: "email", label: "Email" },
    { key: "subject", label: "Subject", render: (r) => <span className="line-clamp-1 max-w-xs block">{r.subject}</span> },
  ];

  return (
    <div>
      <PageHeader title="Contact Messages" description="Messages submitted through the public contact form." />
      <DataTable
        columns={columns}
        rows={data}
        loading={loading}
        onView={handleView}
        onDelete={handleDelete}
        deleteMessage={(r) => `Delete message from "${r.name}"? This cannot be undone.`}
      />

      <DetailModal open={!!viewing} title="Message Details" onClose={() => setViewing(null)}>
        {viewing && (
          <div className="space-y-4">
            <DetailField label="Name" value={viewing.name} />
            <DetailField label="Email" value={viewing.email} />
            <DetailField label="Subject" value={viewing.subject} />
            <DetailField label="Message" value={viewing.message} />
          </div>
        )}
      </DetailModal>
    </div>
  );
}
