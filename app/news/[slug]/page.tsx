import { newsArticles } from "@/lib/data/news";
import { notFound } from "next/navigation";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import { CalendarDays, Tag, ArrowLeft } from "lucide-react";
import Link from "next/link";

export function generateStaticParams() {
  return newsArticles.map((a) => ({ slug: a.slug }));
}

export default async function NewsDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = newsArticles.find((a) => a.slug === slug);
  if (!article) notFound();

  return (
    <div className="min-h-screen bg-[hsl(222_47%_6%)]">
      <Navbar />
      <main className="pt-32 pb-24">
        <div className="max-w-3xl mx-auto px-4">
          <Link
            href="/news"
            className="inline-flex items-center gap-2 text-sm text-white/40 hover:text-white/70 mb-10 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" /> Back to News
          </Link>

          <div className="flex flex-wrap gap-2 mb-6">
            <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20 flex items-center gap-1.5">
              <Tag className="w-3 h-3" /> {article.category}
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-medium text-white mb-6 leading-tight">
            {article.title}
          </h1>

          <div className="flex items-center gap-4 text-sm text-white/30 mb-10 pb-8 border-b border-white/10">
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

          <div className="prose prose-invert max-w-none">
            {article.content.split("\n\n").map((para, i) => {
              if (para.startsWith("**") && para.endsWith("**")) {
                return (
                  <h3 key={i} className="text-xl font-medium text-white mt-8 mb-3">
                    {para.replace(/\*\*/g, "")}
                  </h3>
                );
              }
              const withBold = para.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
              return (
                <p
                  key={i}
                  className="text-white/60 text-lg leading-relaxed mb-4"
                  dangerouslySetInnerHTML={{ __html: withBold }}
                />
              );
            })}
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-2 mt-10 pt-8 border-t border-white/10">
            {article.tags.map((tag) => (
              <span key={tag} className="px-3 py-1 rounded-full text-xs bg-white/5 text-white/40 border border-white/10">
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
