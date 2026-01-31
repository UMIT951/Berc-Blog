import { notFound } from "next/navigation"
import { getAllTags, getPostsByTag } from "@/lib/posts"
import { BlogCard } from "@/components/blog-card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"
import type { Metadata } from "next"

interface Props {
  params: Promise<{ tag: string }>
}

export async function generateStaticParams() {
  const tags = getAllTags()
  return tags.map(({ tag }) => ({ tag }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)

  return {
    title: `#${decodedTag}`,
    description: `"${decodedTag}" etiketli tüm yazılar`,
  }
}

export default async function TagPage({ params }: Props) {
  const { tag } = await params
  const decodedTag = decodeURIComponent(tag)
  const posts = getPostsByTag(decodedTag)

  if (posts.length === 0) {
    notFound()
  }

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <Button asChild variant="ghost" size="sm" className="mb-8 font-mono text-xs">
        <Link href="/tags">
          <ArrowLeft className="w-3 h-3 mr-2" />
          cd ../etiketler
        </Link>
      </Button>

      <div className="flex items-center gap-3 mb-8">
        <h1 className="text-lg font-semibold font-mono">./{decodedTag}</h1>
        <span className="text-xs font-mono text-muted-foreground px-2 py-1 bg-secondary rounded">
          {posts.length} kayit
        </span>
      </div>

      <div className="space-y-3">
        {posts.map((post) => (
          <BlogCard key={post.slug} post={post} />
        ))}
      </div>
    </div>
  )
}
