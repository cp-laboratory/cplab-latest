import { notFound } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ArrowLeft, Mail, ExternalLink } from "lucide-react";
import Link from "next/link";
import { fetchDocByField, COLLECTIONS } from "@/lib/firestore";
import type { TeamMember } from "@/lib/types";

export const dynamic = "force-dynamic";

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);
const LinkedinIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
);

const memberTypeLabels: Record<string, string> = {
  professor: "Faculty",
  student: "Student Researcher",
  alumni: "Alumni",
  scholar: "Visiting Scholar",
};

export default async function TeamMemberPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const member = await fetchDocByField<TeamMember>(COLLECTIONS.team, "slug", decodeURIComponent(slug));
  if (!member) notFound();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4">
          <Link
            href="/team"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Team
          </Link>

          <div className="academic-card rounded-2xl p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row gap-8 items-center sm:items-start text-center sm:text-left mb-10">
              {/* Avatar */}
              <div className="w-40 h-40 sm:w-48 sm:h-48 rounded-xl shrink-0 bg-gradient-to-br from-oxford-50 to-oxford-100 border border-gray-200 flex items-center justify-center text-6xl font-medium text-oxford-600 overflow-hidden">
                {member.image ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={member.image} alt={member.name} className="w-full h-full object-cover" />
                ) : (
                  member.name.charAt(0)
                )}
              </div>

              <div className="flex-1">
                <span className="inline-block px-3 py-1 rounded-full text-xs font-bold bg-oxford-50 text-oxford-700 border border-oxford-200 mb-4">
                  {memberTypeLabels[member.memberType] || member.memberType}
                </span>
                <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-2 leading-tight">
                  {member.name}
                </h1>
                <p className="text-lg text-oxford-600 font-medium mb-6">{member.designation}</p>

                {/* Contact links */}
                <div className="flex items-center gap-3 justify-center sm:justify-start">
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600 hover:text-gray-900 hover:border-oxford-300 transition-all"
                    >
                      <Mail className="w-4 h-4" /> Email
                    </a>
                  )}
                  {member.github && (
                    <a
                      href={member.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600 hover:text-gray-900 hover:border-oxford-300 transition-all"
                    >
                      <GithubIcon /> GitHub
                    </a>
                  )}
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600 hover:text-gray-900 hover:border-oxford-300 transition-all"
                    >
                      <LinkedinIcon /> LinkedIn
                    </a>
                  )}
                  {member.googleScholar && (
                    <a
                      href={member.googleScholar}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600 hover:text-gray-900 hover:border-oxford-300 transition-all"
                    >
                      <ExternalLink className="w-4 h-4" /> Scholar
                    </a>
                  )}
                </div>
              </div>
            </div>

            {/* Bio */}
            {member.bio && (
              <div className="pt-8 border-t border-gray-200">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-3">About</h2>
                <div className="prose prose-lg max-w-none prose-gray prose-headings:font-serif prose-headings:text-gray-900 prose-a:text-amber-600 hover:prose-a:text-amber-500" dangerouslySetInnerHTML={{ __html: member.bio }} />
              </div>
            )}

            {/* Research interests */}
            {member.researchInterests && member.researchInterests.length > 0 && (
              <div className="pt-8 mt-8 border-t border-gray-200">
                <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Research Interests</h2>
                <div className="flex flex-wrap gap-2">
                  {member.researchInterests.map((interest) => (
                    <span
                      key={interest}
                      className="px-3 py-1.5 rounded-full text-sm font-semibold bg-oxford-50 text-oxford-700 border border-oxford-200"
                    >
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
