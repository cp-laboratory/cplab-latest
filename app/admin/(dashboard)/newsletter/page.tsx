"use client";

import PageHeader from "@/components/admin/page-header";
import DataTable, { type Column } from "@/components/admin/data-table";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS, deleteDocById } from "@/lib/firestore";
import type { NewsletterSubscriber } from "@/lib/types";

export default function AdminNewsletterPage() {
  const { data, loading } = useLiveCollection<NewsletterSubscriber>(COLLECTIONS.newsletter, {
    orderByField: "subscribedAt",
    orderDirection: "desc",
  });

  const handleDelete = async (row: NewsletterSubscriber) => {
    await deleteDocById(COLLECTIONS.newsletter, row.id);
  };

  const columns: Column<NewsletterSubscriber>[] = [
    { key: "email", label: "Email", render: (r) => <span className="text-white font-medium">{r.email}</span> },
  ];

  return (
    <div>
      <PageHeader title="Newsletter Subscribers" description="Subscribers who signed up through the homepage newsletter form." />
      <DataTable
        columns={columns}
        rows={data}
        loading={loading}
        onDelete={handleDelete}
        deleteMessage={(r) => `Remove "${r.email}" from the newsletter list?`}
      />
    </div>
  );
}
