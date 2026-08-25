import { notFound } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { CalendarDays, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { fetchDocByField, COLLECTIONS } from "@/lib/firestore";
import type { NewsArticle } from "@/lib/types";

export const dynamic = "force-dynamic";

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = await fetchDocByField<NewsArticle>(COLLECTIONS.news, "slug", decodeURIComponent(slug));
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-gray-700 mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-oxford-50 text-oxford-600 border border-oxford-200 flex items-center gap-1.5">
              <Tag className="w-3 h-3" /> {article.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-serif font-bold text-gray-900 mb-6 leading-tight">
            {article.title}
          </h1>

          {article.coverImage && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={article.coverImage}
              alt={article.title}
              className="w-full aspect-video object-cover rounded-2xl mb-10 border border-gray-200"
            />
          )}

          <div className="flex items-center gap-4 text-sm text-gray-400 mb-10 pb-8 border-b border-gray-200">
            <div className="flex items-center gap-2">
              <CalendarDays className="w-4 h-4" />
              {new Date(article.publishedDate).toLocaleDateString("en-US", {
                month: "long",
                day: "numeric",
                year: "numeric",
              })}
            </div>
            <span>·</span>
            <span>{article.author}</span>
          </div>

          <div 
            className="prose prose-lg max-w-none prose-gray prose-headings:font-serif prose-headings:text-gray-900 prose-a:text-amber-600 hover:prose-a:text-amber-500"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-gray-200">
            {article.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs bg-gray-50 text-gray-500 border border-gray-200">
                #{tag}
              </span>
            ))}
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
