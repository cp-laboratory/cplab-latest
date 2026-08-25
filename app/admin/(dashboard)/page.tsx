"use client";

import { useState } from "react";
import Link from "next/link";
import { Users, BookOpen, FolderKanban, Archive, Newspaper, ClipboardList, Mail, Send, Database, Loader2, CheckCircle } from "lucide-react";
import { useLiveCollection } from "@/lib/hooks/use-collection";
import { COLLECTIONS } from "@/lib/firestore";
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
      <h1 className="text-2xl font-serif font-bold text-gray-900 mb-1">Dashboard</h1>
      <p className="text-sm text-gray-500 mb-8">Overview of CPLAB&apos;s live content and submissions.</p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-10">
        {cards.map((c) => {
          const Icon = c.icon;
          return (
            <Link key={c.label} href={c.href} className="academic-card rounded-2xl p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="w-10 h-10 rounded-xl bg-oxford-50 border border-oxford-200 flex items-center justify-center">
                  <Icon className="w-4 h-4 text-oxford-600" />
                </div>
              </div>
              <p className="text-2xl font-serif font-bold text-gray-900">{c.value}</p>
              <p className="text-xs text-gray-500 mt-1">{c.label}</p>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
