"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, BookOpen, FolderKanban, Archive, Newspaper, ClipboardList, Mail, Send, Database, Loader2, CheckCircle } from "lucide-react";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS } from "@/lib/firestore";
import { seedAllData } from "@/lib/seed";
import ConfirmDialog from "@/components/admin/confirm-dialog";
import type { TeamMember, Publication, Project, NewsArticle, Resource, RecruitmentApplication, ContactMessage, NewsletterSubscriber } from "@/lib/types";

export default function AdminDashboardPage() {
  const { data: team } = useLiveCollection<TeamMember>(COLLECTIONS.team);
  const { data: publications } = useLiveCollection<Publication>(COLLECTIONS.publications);
  const { data: projects } = useLiveCollection<Project>(COLLECTIONS.projects);
  const { data: resources } = useLiveCollection<Resource>(COLLECTIONS.resources);
  const { data: news } = useLiveCollection<NewsArticle>(COLLECTIONS.news);
  const { data: recruitment } = useLiveCollection<RecruitmentApplication>(COLLECTIONS.recruitment);
  const { data: contact } = useLiveCollection<ContactMessage>(COLLECTIONS.contact);
  const { data: newsletter } = useLiveCollection<NewsletterSubscriber>(COLLECTIONS.newsletter);

  const [seeding, setSeeding] = useState(false);
  const [seeded, setSeeded] = useState(false);
  const [confirmingSeed, setConfirmingSeed] = useState(false);

  const runSeed = async () => {
    setSeeding(true);
    try {
      await seedAllData();
      setSeeded(true);
      setConfirmingSeed(false);
    } finally {
      setSeeding(false);
    }
  };

  const cards = [
    { label: "Team Members", value: team.length, icon: Users, href: "/admin/team" },
    { label: "Publications", value: publications.length, icon: BookOpen, href: "/admin/publications" },
    { label: "Projects", value: projects.length, icon: FolderKanban, href: "/admin/projects" },
    { label: "Resources", value: resources.length, icon: Archive, href: "/admin/resources" },
    { label: "News Articles", value: news.length, icon: Newspaper, href: "/admin/news" },
    { label: "Recruitment Applications", value: recruitment.length, icon: ClipboardList, href: "/admin/recruitment" },
    { label: "Contact Messages", value: contact.length, icon: Mail, href: "/admin/contact" },
    { label: "Newsletter Subscribers", value: newsletter.length, icon: Send, href: "/admin/newsletter" },
  ];

  return (
    <div>
      <h1 className="text-2xl font-medium text-white mb-1">Dashboard</h1>
      <p className="text-sm text-white/40 mb-8">Overview of CPLAB&apos;s live content and submissions.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.label} href={c.href} className="glass-hover rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-jade-500/10 border border-jade-500/20 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-jade-400" />
                </div>
              </div>
              <p className="text-2xl font-medium text-white">{c.value}</p>
              <p className="text-xs text-white/40 mt-1">{c.label}</p>
            </Link>
          );
        })}
      </div>

      <div className="glass rounded-2xl p-6">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 rounded-xl bg-jade-800/10 border border-jade-800/20 flex items-center justify-center shrink-0">
            <Database className="w-4 h-4 text-jade-700" />
          </div>
          <div className="flex-1">
            <h2 className="text-white font-medium mb-1">Import Sample Data</h2>
            <p className="text-sm text-white/40 mb-4">
              One-time import of the site&apos;s original sample content into Firestore. Safe to re-run — existing
              records with the same ID will be merged, not duplicated.
            </p>
            <button
              onClick={() => setConfirmingSeed(true)}
              disabled={seeding}
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/5 border border-white/10 text-white/70 text-sm font-medium hover:text-white hover:border-white/20 transition-all disabled:opacity-50"
            >
              {seeding && <Loader2 className="w-4 h-4 animate-spin" />}
              {seeded && !seeding && <CheckCircle className="w-4 h-4 text-emerald-400" />}
              {seeding ? "Importing..." : seeded ? "Imported" : "Import Sample Data"}
            </button>
          </div>
        </div>
      </div>

      <ConfirmDialog
        open={confirmingSeed}
        title="Import Sample Data"
        message="This will import the site's existing sample content (team, publications, projects, resources, news, announcements, certificates) into Firestore. Continue?"
        confirmLabel="Import"
        loading={seeding}
        onConfirm={runSeed}
        onCancel={() => setConfirmingSeed(false)}
      />
    </div>
  );
}
