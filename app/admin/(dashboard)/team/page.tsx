"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/page-header";
import DataTable, { type Column } from "@/components/admin/data-table";
import EntityFormModal, { type FieldConfig } from "@/components/admin/entity-form";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS, createDoc, updateDocById, deleteDocById } from "@/lib/firestore";
import { sortByHierarchy } from "@/lib/data/team";
import type { TeamMember } from "@/lib/types";

const fields: FieldConfig[] = [
  { key: "image", label: "Photo", type: "image" },
  { key: "name", label: "Full Name", type: "text", required: true, placeholder: "e.g., Dr. Jane Doe" },
  { key: "slug", label: "URL Slug", type: "text", required: true, placeholder: "e.g., jane-doe", helpText: "Used in the member's profile URL." },
  {
    key: "memberType",
    label: "Member Type",
    type: "select",
    required: true,
    options: [
      { label: "Professor", value: "professor" },
      { label: "Student", value: "student" },
      { label: "Alumni", value: "alumni" },
      { label: "Scholar", value: "scholar" },
    ],
  },
  { key: "designation", label: "Designation", type: "text", required: true, placeholder: "e.g., PhD Researcher" },
  {
    key: "order",
    label: "Position Hierarchy",
    type: "number",
    required: true,
    placeholder: "e.g., 1",
    helpText: "Controls display order within their member type. Lower numbers appear first (e.g., Lab Director = 1).",
  },
  { key: "bio", label: "Bio", type: "richtext" },
  { key: "email", label: "Email", type: "text", placeholder: "name@cplab.org" },
  { key: "github", label: "GitHub URL", type: "text" },
  { key: "linkedin", label: "LinkedIn URL", type: "text" },
  { key: "googleScholar", label: "Google Scholar URL", type: "text" },
  { key: "researchInterests", label: "Research Interests", type: "tags", placeholder: "e.g., Blockchain, IoT, Security" },
];

export default function AdminTeamPage() {
  const { data: rawData, loading } = useLiveCollection<TeamMember>(COLLECTIONS.team);
  const data = sortByHierarchy(rawData);
  const [modalOpen, setModalOpen] = useState(false);
  const [editing, setEditing] = useState<TeamMember | null>(null);

  const openCreate = () => {
    setEditing(null);
    setModalOpen(true);
  };
  const openEdit = (row: TeamMember) => {
    setEditing(row);
    setModalOpen(true);
  };

  const handleSubmit = async (values: Record<string, unknown>) => {
    if (editing) await updateDocById(COLLECTIONS.team, editing.id, values);
    else await createDoc(COLLECTIONS.team, values);
  };

  const handleDelete = async (row: TeamMember) => {
    await deleteDocById(COLLECTIONS.team, row.id);
  };

  const columns: Column<TeamMember>[] = [
    {
      key: "name",
      label: "Name",
      render: (r) => (
        <div className="flex items-center gap-3">
          <div className="w-9 h-9 rounded-lg overflow-hidden bg-gray-50 border border-gray-200 flex items-center justify-center text-oxford-600 text-sm font-medium shrink-0">
            {r.image ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={r.image} alt={r.name} className="w-full h-full object-cover" />
            ) : (
              r.name.charAt(0)
            )}
          </div>
          <span className="text-gray-900 font-medium">{r.name}</span>
        </div>
      ),
    },
    { key: "memberType", label: "Type", render: (r) => <span className="capitalize">{r.memberType}</span> },
    { key: "designation", label: "Designation" },
    { key: "order", label: "Order", render: (r) => <span className="text-gray-600">{r.order}</span> },
    { key: "email", label: "Email" },
  ];

  return (
    <div>
      <PageHeader
        title="Team Members"
        description="Manage lab professors, students, alumni, and scholars."
        actionLabel="Add Member"
        onAction={openCreate}
      />
      <DataTable
        columns={columns}
        rows={data}
        loading={loading}
        onEdit={openEdit}
        onDelete={handleDelete}
        deleteMessage={(r) => `Delete "${r.name}"? This cannot be undone.`}
      />
      <EntityFormModal
        open={modalOpen}
        title={editing ? "Edit Team Member" : "Add Team Member"}
        fields={fields}
        initialValues={editing ?? { order: data.length + 1 }}
        onClose={() => setModalOpen(false)}
        onSubmit={handleSubmit}
      />
    </div>
  );
}
