import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Post } from "@/lib/posts"

interface BlogCardProps {
  post: Post
}

export function BlogCard({ post }: BlogCardProps) {
  const formattedDate = new Date(post.date).toLocaleDateString("tr-TR", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  })

  return (
    <Link href={`/blog/${post.slug}`} className="block group">
      <article className="p-4 border border-border rounded-lg bg-card hover:border-primary/60 transition-colors">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h2 className="text-base font-medium text-card-foreground group-hover:text-primary transition-colors line-clamp-1">
              {post.title}
            </h2>
            <p className="text-sm text-muted-foreground mt-1 line-clamp-1">{post.excerpt}</p>
          </div>
          <div className="flex flex-col items-end gap-1 shrink-0">
            <span className="text-xs font-mono text-muted-foreground">{formattedDate}</span>
            <span className="text-xs font-mono text-muted-foreground">{post.readingTime}</span>
          </div>
        </div>
        <div className="flex flex-wrap gap-1.5 mt-3">
          {post.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-xs font-mono px-2 py-0">
              {tag}
            </Badge>
          ))}
        </div>
      </article>
    </Link>
  )
}
