import { notFound } from "next/navigation"
import { getAllPosts, getPostBySlug } from "@/lib/posts"
import { MDXContent } from "@/components/mdx-content"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Calendar, Clock, ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ slug: string }>
}

export async function generateStaticParams() {
  const posts = getAllPosts()
  return posts.map((post) => ({ slug: post.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    return { title: "Post Not Found" }
  }

  return {
    title: post.title,
    description: post.excerpt,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      publishedTime: post.date,
      tags: post.tags,
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.excerpt,
    },
  }
}

export default async function BlogPage({ params }: Props) {
  const { slug } = await params
  const post = getPostBySlug(slug)

  if (!post) {
    notFound()
  }

  const mdxSource = post.content

  const formattedDate = new Date(post.date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })

  return (
    <article className="max-w-3xl mx-auto px-6 py-12">
      {/* Back Button */}
      <Button asChild variant="ghost" size="sm" className="mb-8 font-mono text-xs">
        <Link href="/">
          <ArrowLeft className="w-3 h-3 mr-2" />
          cd ..
        </Link>
      </Button>

      {/* Header */}
      <header className="mb-8 pb-8 border-b border-border">
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-balance tracking-tight">{post.title}</h1>

        <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-muted-foreground mb-4">
          <span className="flex items-center gap-1.5">
            <Calendar className="w-3.5 h-3.5" />
            {formattedDate}
          </span>
          <span className="text-border">|</span>
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5" />
            {post.readingTime}
          </span>
        </div>

        <div className="flex flex-wrap gap-1.5">
          {post.tags.map((tag) => (
            <Badge
              key={tag}
              variant="secondary"
              asChild
              className="text-xs font-mono px-2 py-0 hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer"
            >
              <Link href={`/tags/${tag}`}>{tag}</Link>
            </Badge>
          ))}
        </div>
      </header>

      {/* Excerpt */}
      {post.excerpt && (
        <p className="text-base text-muted-foreground mb-8 leading-relaxed">{post.excerpt}</p>
      )}

      {/* Content */}
      <div className="prose">
        <MDXContent source={mdxSource} />
      </div>

      {/* Footer */}
      <footer className="mt-12 pt-8 border-t border-border">
        <Button asChild variant="secondary" size="sm" className="font-mono text-xs">
          <Link href="/">
            <ArrowLeft className="w-3 h-3 mr-2" />
            ls ./yazilar
          </Link>
        </Button>
      </footer>
    </article>
  )
}
