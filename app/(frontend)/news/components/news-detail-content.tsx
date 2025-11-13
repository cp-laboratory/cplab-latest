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
        <p className="text-foreground mb-4 leading-relaxed">
          {node.children?.map((child: any, idx: number) => (
            <span key={idx}>
              <TextNode node={child} />
            </span>
          ))}
        </p>
      )

    case 'heading':
      const level = node.tag?.replace('h', '') || '2'
      const HeadingTag = node.tag || 'h2'
      const headingClasses: Record<string, string> = {
        '1': 'text-4xl font-bold mb-6 mt-8 text-foreground',
        '2': 'text-3xl font-bold mb-5 mt-7 text-foreground',
        '3': 'text-2xl font-bold mb-4 mt-6 text-foreground',
        '4': 'text-xl font-bold mb-3 mt-5 text-foreground',
        '5': 'text-lg font-bold mb-2 mt-4 text-foreground',
        '6': 'text-base font-bold mb-2 mt-3 text-foreground',
      }
      return (
        <HeadingTag className={headingClasses[level] || 'text-2xl font-bold mb-4 text-foreground'}>
          {node.children?.map((child: any, idx: number) => (
            <span key={idx}>
              <TextNode node={child} />
            </span>
          ))}
        </HeadingTag>
      )

    case 'list':
      const ListTag = node.listType === 'number' ? 'ol' : 'ul'
      const listTypeClass = node.listType === 'number' ? 'list-decimal' : 'list-disc'
      return (
        <ListTag className={`mb-4 pl-6 space-y-2 ${listTypeClass} text-foreground`}>
          {node.children?.map((item: any, idx: number) => (
            <LexicalNode key={idx} node={item} />
          ))}
        </ListTag>
      )

    case 'listitem':
      return (
        <li className="text-foreground leading-relaxed">
          {node.children?.map((child: any, idx: number) => {
            // Handle nested lists
            if (child.type === 'list') {
              return <LexicalNode key={idx} node={child} />
            }
            return (
              <span key={idx}>
                <TextNode node={child} />
              </span>
            )
          })}
        </li>
      )

    case 'checklist':
      return (
        <ul className="mb-4 space-y-2">
          {node.children?.map((item: any, idx: number) => (
            <LexicalNode key={idx} node={item} />
          ))}
        </ul>
      )

    case 'listitemcheck':
      return (
        <li className="flex items-start gap-2 text-foreground">
          <input
            type="checkbox"
            checked={node.checked}
            readOnly
            className="mt-1 cursor-default accent-primary"
          />
          <span className="flex-1">
            {node.children?.map((child: any, idx: number) => (
              <span key={idx}>
                <TextNode node={child} />
              </span>
            ))}
          </span>
        </li>
      )

    case 'quote':
      return (
        <blockquote className="border-l-4 border-primary pl-6 py-2 italic text-muted-foreground my-6 bg-muted/30 rounded-r">
          {node.children?.map((child: any, idx: number) => (
            <div key={idx}>
              <LexicalNode node={child} />
            </div>
          ))}
        </blockquote>
      )

    case 'horizontalrule':
      return <hr className="my-8 border-t border-border/50" />

    case 'link':
      return (
        <a
          href={node.fields?.url || node.url}
          target={node.fields?.newTab ? '_blank' : '_self'}
          rel={node.fields?.newTab ? 'noopener noreferrer' : undefined}
          className="text-primary hover:underline font-medium transition-colors"
        >
          {node.children?.map((child: any, idx: number) => (
            <span key={idx}>
              <TextNode node={child} />
            </span>
          ))}
        </a>
      )

    case 'autolink':
      return (
        <a
          href={node.fields?.url || node.url}
          target="_blank"
          rel="noopener noreferrer"
          className="text-primary hover:underline transition-colors"
        >
          {node.children?.map((child: any, idx: number) => (
            <span key={idx}>
              <TextNode node={child} />
            </span>
          ))}
        </a>
      )

    case 'upload':
      const uploadData = node.value
      const imageUrl = typeof uploadData === 'object' && uploadData?.url ? uploadData.url : null
      const altText = typeof uploadData === 'object' && uploadData?.alt ? uploadData.alt : 'Uploaded image'
      
      if (!imageUrl) return null
      
      return (
        <figure className="my-8">
          <div className="relative w-full h-auto rounded-lg overflow-hidden border border-border/50">
            <Image
              src={imageUrl}
              alt={altText}
              width={1200}
              height={800}
              className="w-full h-auto object-cover"
              unoptimized
            />
          </div>
          {node.fields?.caption && (
            <figcaption className="text-sm text-muted-foreground mt-2 text-center italic">
              {node.fields.caption}
            </figcaption>
          )}
        </figure>
      )

    case 'relationship':
      const relationData = node.value
      if (!relationData) return null
      
      return (
        <div className="my-6 p-4 border border-border/50 rounded-lg bg-muted/20">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
            </svg>
            <span>Related: {node.relationTo || 'content'}</span>
          </div>
          <p className="text-foreground font-medium">
            {typeof relationData === 'object' && relationData?.title 
              ? relationData.title 
              : typeof relationData === 'string' 
              ? relationData 
              : 'Related content'}
          </p>
        </div>
      )

    case 'block':
      // Handle custom blocks if you have any
      return (
        <div className="my-6 p-6 border border-border/50 rounded-lg bg-muted/10">
          <p className="text-sm text-muted-foreground mb-2">Custom Block: {node.fields?.blockType}</p>
          <pre className="text-xs overflow-auto">
            {JSON.stringify(node.fields, null, 2)}
          </pre>
        </div>
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

export function NewsDetailArticle({ article, hideBackLink = false, hideTitle = false, hideMetadata = false }: { article: NewsDetail; hideBackLink?: boolean; hideTitle?: boolean; hideMetadata?: boolean }) {
  return (
    <article className="relative z-10 max-w-7xl mx-auto px-4 py-24">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-7xl mx-auto"
      >
        {/* Header */}
        <div className="mb-8">
          {!hideBackLink && (
            <Link href="/news" className="text-primary hover:underline text-sm mb-4 inline-block">
              ← Back to News
            </Link>
          )}

          {!hideTitle && (
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">{article.title}</h1>
          )}

          {!hideMetadata && (
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
          )}
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
