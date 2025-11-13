"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"

interface NewsDetail {
  id: string
  title: string
  excerpt: string
  content: any // Lexical JSON
  publishedDate: string
  author: {
    id: string
    email: string
    name: string
  }
  featuredImage?: {
    id: string
    url: string
    alt: string
  }
  slug: string
}

// Component to render Lexical JSON content
function RichTextRenderer({ content }: { content: any }) {
  if (!content) return null

  // If content is a string, try to parse it as JSON
  let data = content
  if (typeof content === 'string') {
    try {
      data = JSON.parse(content)
    } catch {
      return <p className="text-foreground whitespace-pre-wrap">{content}</p>
    }
  }

  // Lexical JSON structure
  if (data.root && data.root.children) {
    return (
      <div className="prose prose-invert max-w-none">
        {data.root.children.map((node: any, idx: number) => (
          <LexicalNode key={idx} node={node} />
        ))}
      </div>
    )
  }

  return <p className="text-foreground">{String(content)}</p>
}

function LexicalNode({ node }: { node: any }) {
  if (!node) return null

  switch (node.type) {
    case 'paragraph':
      return (
        <p className="text-foreground mb-4">
          {node.children?.map((child: any, idx: number) => (
            <span key={idx}>
              <TextNode node={child} />
            </span>
          ))}
        </p>
      )

    case 'heading':
      const level = node.tag?.replace('h', '') || '2'
      const headingClasses: Record<string, string> = {
        '1': 'text-4xl font-bold mb-4',
        '2': 'text-3xl font-bold mb-4',
        '3': 'text-2xl font-bold mb-3',
        '4': 'text-xl font-bold mb-2',
        '5': 'text-lg font-bold mb-2',
        '6': 'text-base font-bold mb-2',
      }
      return (
        <div className={headingClasses[level] || 'text-2xl font-bold mb-4'}>
          {node.children?.map((child: any, idx: number) => (
            <span key={idx}>
              <TextNode node={child} />
            </span>
          ))}
        </div>
      )

    case 'list':
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      return (
        <ListTag className={`mb-4 pl-6 ${node.listType === 'number' ? 'list-decimal' : 'list-disc'}`}>
          {node.children?.map((item: any, idx: number) => (
            <li key={idx} className="text-foreground mb-2">
              {item.children?.map((child: any, cidx: number) => (
                <span key={cidx}>
                  <TextNode node={child} />
                </span>
              ))}
            </li>
          ))}
        </ListTag>
      )

    case 'quote':
      return (
        <blockquote className="border-l-4 border-primary pl-4 italic text-muted-foreground my-4">
          {node.children?.map((child: any, idx: number) => (
            <div key={idx}>
              <LexicalNode node={child} />
            </div>
          ))}
        </blockquote>
      )

    case 'link':
      return (
        <a
          href={node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline"
        >
          {node.children?.map((child: any, idx: number) => (
            <span key={idx}>
              <TextNode node={child} />
            </span>
          ))}
        </a>
      )

    default:
      return null
  }
}

function TextNode({ node }: { node: any }) {
  if (!node || node.type === 'linebreak') return node.type === 'linebreak' ? <br /> : null

  let text: any = node.text
  if (node.bold) text = <strong>{text}</strong>
  if (node.italic) text = <em>{text}</em>
  if (node.underline) text = <u>{text}</u>
  if (node.strikethrough) text = <s>{text}</s>
  if (node.code) text = <code className="bg-muted px-2 py-1 rounded text-sm">{text}</code>
  return <span className="text-foreground">{text}</span>
}

export function NewsDetailArticle({ article }: { article: NewsDetail }) {
  return (
    <article className="relative z-10 max-w-7xl mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-3xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          <Link href="/news" className="text-primary hover:underline text-sm mb-4 inline-block">
            ← Back to News
          </Link>

          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{article.title}</h1>

          <div className="flex items-center justify-between text-muted-foreground text-sm mb-8 pb-8 border-b border-border/50">
            <div className="flex items-center gap-4">
              {article.author?.name && <span>{article.author.name}</span>}
              {article.author?.name && article.publishedDate && <span>•</span>}
              {article.publishedDate && (
                <span>
                  {new Date(article.publishedDate).toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Featured Image */}
        {article.featuredImage && (
          <div className="mb-8 rounded-lg overflow-hidden">
            <Image
              src={article.featuredImage.url}
              alt={article.featuredImage.alt || article.title}
              width={900}
              height={500}
              className="w-full h-auto object-cover"
            />
          </div>
        )}

        {/* Excerpt */}
        {article.excerpt && (
          <div className="text-lg text-muted-foreground mb-8 italic">{article.excerpt}</div>
        )}

        {/* Content */}
        {article.content && (
          <div className="prose prose-invert max-w-none text-foreground">
            <RichTextRenderer content={article.content} />
          </div>
        )}
      </motion.div>
    </article>
  )
}
