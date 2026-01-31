import { getAllTags } from "@/lib/posts"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Etiketler",
  description: "Tum etiketler",
}

export default function TagsPage() {
  const tags = getAllTags()

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      <h1 className="text-lg font-semibold font-mono mb-8">./etiketler</h1>

      {tags.length === 0 ? (
        <div className="text-center py-16 border border-dashed border-border rounded-lg">
          <p className="text-muted-foreground font-mono text-sm">// bos dizin</p>
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {tags.map(({ tag, count }) => (
            <Badge
              key={tag}
              asChild
              variant="secondary"
              className="hover:bg-primary hover:text-primary-foreground transition-colors cursor-pointer text-sm font-mono px-3 py-1"
            >
              <Link href={`/tags/${tag}`}>
                {tag}
                <span className="ml-1.5 text-xs opacity-60">{count}</span>
              </Link>
            </Badge>
          ))}
        </div>
      )}
    </div>
  )
}
