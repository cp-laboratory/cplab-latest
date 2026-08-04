"use client";

import { useState } from "react";
import PageHeader from "@/components/admin/page-header";
import DataTable, { type Column } from "@/components/admin/data-table";
import DetailModal, { DetailField } from "@/components/admin/detail-modal";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS, updateDocById, deleteDocById } from "@/lib/firestore";
import type { RecruitmentApplication, RecruitmentStatus } from "@/lib/types";

const statusStyles: Record<RecruitmentStatus, string> = {
  pending: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  reviewed: "bg-jade-500/10 text-jade-400 border-jade-500/20",
  accepted: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  rejected: "bg-red-500/10 text-red-400 border-red-500/20",
};

export default function AdminRecruitmentPage() {
  const { data, loading } = useLiveCollection<RecruitmentApplication>(COLLECTIONS.recruitment, {
    orderByField: "submittedAt",
    orderDirection: "desc",
  });
  const [viewing, setViewing] = useState<RecruitmentApplication | null>(null);

  const handleStatusChange = async (row: RecruitmentApplication, status: RecruitmentStatus) => {
    await updateDocById(COLLECTIONS.recruitment, row.id, { status });
    setViewing((v) => (v && v.id === row.id ? { ...v, status } : v));
  };

  const handleDelete = async (row: RecruitmentApplication) => {
    if (!confirm(`Delete application from "${row.name}"? This cannot be undone.`)) return;
    await deleteDocById(COLLECTIONS.recruitment, row.id);
  };

  const columns: Column<RecruitmentApplication>[] = [
    { key: "name", label: "Name", render: (r) => <span className="text-white font-medium">{r.name}</span> },
    { key: "email", label: "Email" },
    { key: "researchTrack", label: "Track" },
    { key: "degree", label: "Degree" },
    {
      key: "status",
      label: "Status",
      render: (r) => (
        <select
          value={r.status || "pending"}
          onChange={(e) => handleStatusChange(r, e.target.value as RecruitmentStatus)}
          onClick={(e) => e.stopPropagation()}
          className={`px-2.5 py-1 rounded-full text-xs font-medium border capitalize bg-transparent cursor-pointer ${statusStyles[r.status || "pending"]}`}
        >
          <option value="pending" className="bg-[#101d18]">Pending</option>
          <option value="reviewed" className="bg-[#101d18]">Reviewed</option>
          <option value="accepted" className="bg-[#101d18]">Accepted</option>
          <option value="rejected" className="bg-[#101d18]">Rejected</option>
        </select>
      ),
    },
  ];

  return (
    <div>
      <PageHeader title="Recruitment Applications" description="Review and manage applications submitted through the recruitment form." />
      <DataTable columns={columns} rows={data} loading={loading} onView={setViewing} onDelete={handleDelete} />

      <DetailModal open={!!viewing} title="Application Details" onClose={() => setViewing(null)}>
        {viewing && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <DetailField label="Full Name" value={viewing.name} />
            <DetailField label="Email" value={viewing.email} />
            <DetailField label="Phone" value={viewing.phone} />
            <DetailField label="University" value={viewing.university} />
            <DetailField label="Degree" value={viewing.degree} />
            <DetailField label="CGPA" value={viewing.cgpa} />
            <DetailField label="Batch/Year" value={viewing.batch} />
            <DetailField label="Research Track" value={viewing.researchTrack} />
            <div className="sm:col-span-2">
              <DetailField label="Specific Interests" value={viewing.interests} />
            </div>
            <div className="sm:col-span-2">
              <DetailField label="Prior Experience" value={viewing.experience} />
            </div>
            <div className="sm:col-span-2">
              <DetailField label="Proposed Research Title" value={viewing.proposalTitle} />
            </div>
            <div className="sm:col-span-2">
              <DetailField label="Research Proposal" value={viewing.proposalDesc} />
            </div>
            <div className="sm:col-span-2">
              <DetailField label="Statement of Purpose" value={viewing.sop} />
            </div>
          </div>
        )}
      </DetailModal>
    </div>
  );
}
