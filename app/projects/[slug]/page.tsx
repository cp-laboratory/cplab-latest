import { notFound } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ArrowLeft, ExternalLink, Users, Calendar, FolderGit2 } from "lucide-react";
import Link from "next/link";
import { fetchDocByField, COLLECTIONS } from "@/lib/firestore";
import type { Project } from "@/lib/types";

export const dynamic = "force-dynamic";

const GithubIcon = () => (
  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
  </svg>
);

const statusColors: Record<string, string> = {
  active: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
  completed: "bg-oxford-50 text-oxford-600 border-oxford-200",
  ongoing: "bg-amber-500/10 text-amber-400 border-amber-500/20",
};

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = await fetchDocByField<Project>(COLLECTIONS.projects, "slug", decodeURIComponent(slug));
  if (!project) notFound();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/projects"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Projects
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span
              className={`px-3 py-1 rounded-full text-xs font-medium border capitalize ${
                statusColors[project.status]
              }`}
            >
              {project.status}
            </span>
            <span className="px-3 py-1 rounded-full text-xs text-gray-500 bg-gray-50 border border-gray-200 capitalize">
              {project.type}
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-oxford-50 text-oxford-600 border border-oxford-200">
              {project.researchArea}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            {project.title}
          </h1>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 border border-gray-200 bg-gradient-to-br from-jade-500/10 to-jade-900/10">
            {project.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={project.coverImage}
                alt={project.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <FolderGit2 className="w-12 h-12 text-gray-200" />
              </div>
            )}
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-400 mb-10 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4" />
              {project.team.length} member{project.team.length === 1 ? "" : "s"}
            </div>
            <span>·</span>
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              {new Date(project.startDate).getFullYear()}
              {project.endDate ? ` – ${new Date(project.endDate).getFullYear()}` : " – Present"}
            </div>
          </div>

          <div 
            className="prose prose-lg max-w-none prose-gray prose-headings:font-serif prose-headings:text-gray-900 prose-a:text-amber-600 hover:prose-a:text-amber-500 mb-10"
            dangerouslySetInnerHTML={{ __html: project.fullDescription || project.description }}
          />

          {project.team.length > 0 && (
            <div className="mb-10 pt-8 border-t border-gray-200">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Team</h2>
              <div className="flex flex-wrap gap-2">
                {project.team.map((member) => (
                  <span
                    key={member}
                    className="px-3 py-1.5 rounded-full text-sm bg-gray-50 text-gray-600 border border-gray-200"
                  >
                    {member}
                  </span>
                ))}
              </div>
            </div>
          )}

          {project.technologies.length > 0 && (
            <div className="mb-10 pt-8 border-t border-gray-200">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Technologies</h2>
              <div className="flex flex-wrap gap-2">
                {project.technologies.map((tech) => (
                  <span
                    key={tech}
                    className="px-3 py-1.5 rounded-full text-sm bg-oxford-50 text-jade-300 border border-oxford-200"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {(project.githubUrl || project.liveUrl) && (
            <div className="flex items-center gap-3 pt-8 border-t border-gray-200">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600 hover:text-gray-900 hover:border-oxford-300 transition-all"
                >
                  <GithubIcon /> GitHub
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-4 py-2 rounded-xl bg-gray-50 border border-gray-200 text-sm text-gray-600 hover:text-gray-900 hover:border-oxford-300 transition-all"
                >
                  <ExternalLink className="w-4 h-4" /> Live Demo
                </a>
              )}
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
}
