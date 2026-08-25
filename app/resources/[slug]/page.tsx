import { notFound } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { ArrowLeft, Download, ExternalLink, Database, Wrench, Code2, FileText } from "lucide-react";
import Link from "next/link";
import { fetchDocByField, COLLECTIONS } from "@/lib/firestore";
import type { Resource } from "@/lib/types";

export const dynamic = "force-dynamic";

const typeIcons: Record<Resource["resourceType"], typeof Database> = {
  dataset: Database,
  tool: Wrench,
  code: Code2,
  paper: FileText,
};

const typeColors: Record<Resource["resourceType"], string> = {
  dataset: "bg-oxford-50 text-oxford-600 border-oxford-200",
  tool: "bg-amber-500/10 text-amber-400 border-amber-500/20",
  code: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  paper: "bg-purple-500/10 text-purple-400 border-purple-500/20",
};

export default async function ResourceDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const resource = await fetchDocByField<Resource>(COLLECTIONS.resources, "slug", decodeURIComponent(slug));
  if (!resource) notFound();

  const Icon = typeIcons[resource.resourceType];
  const link = resource.fileUrl || resource.externalUrl;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/resources"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Resources
          </Link>

          <div className="flex flex-wrap items-center gap-2 mb-6">
            <span
              className={`flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border capitalize ${
                typeColors[resource.resourceType]
              }`}
            >
              <Icon className="w-3 h-3" /> {resource.resourceType}
            </span>
            <span className="px-3 py-1 rounded-full text-xs text-gray-500 bg-gray-50 border border-gray-200">
              {resource.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            {resource.title}
          </h1>

          <div className="relative w-full aspect-video rounded-xl overflow-hidden mb-10 border border-gray-200 bg-gradient-to-br from-jade-500/10 to-jade-900/10">
            {resource.coverImage ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={resource.coverImage}
                alt={resource.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center">
                <Icon className="w-12 h-12 text-gray-200" />
              </div>
            )}
          </div>

          <div 
            className="prose prose-lg max-w-none prose-gray prose-headings:font-serif prose-headings:text-gray-900 prose-a:text-amber-600 hover:prose-a:text-amber-500 mb-10 pb-8 border-b border-gray-200"
            dangerouslySetInnerHTML={{ __html: resource.description }}
          />

          {resource.tags && resource.tags.length > 0 && (
            <div className="mb-10">
              <h2 className="text-sm font-semibold text-gray-700 uppercase tracking-wider mb-4">Tags</h2>
              <div className="flex flex-wrap gap-2">
                {resource.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 rounded-full text-sm bg-gray-50 text-gray-600 border border-gray-200"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="pt-8 border-t border-gray-200">
            {link ? (
              <a
                href={link}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-gradient-to-r bg-oxford-800 text-white text-sm font-semibold hover:opacity-90 transition-all"
              >
                {resource.fileUrl ? <Download className="w-4 h-4" /> : <ExternalLink className="w-4 h-4" />}
                {resource.fileUrl ? "Download Resource" : "Access Resource"}
              </a>
            ) : (
              <span className="text-sm text-gray-400">Not yet available</span>
            )}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
