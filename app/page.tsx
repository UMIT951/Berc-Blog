import { getAllPosts } from "@/lib/posts"
import { BlogCard } from "@/components/blog-card"

export default function Home() {
  const posts = getAllPosts()

  return (
    <div className="max-w-4xl mx-auto px-6 py-12">
      {/* Hero Section */}
      <section className="mb-16 border-b border-border pb-12">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-3 h-3 rounded-full bg-primary animate-pulse" />
          <span className="text-sm font-mono text-muted-foreground">aktif</span>
        </div>
        <h1 className="text-3xl sm:text-4xl font-bold mb-4 text-balance tracking-tight">
          Elektronik. Yazilim. Sistemler.
        </h1>
        <p className="text-base text-muted-foreground max-w-xl leading-relaxed">
          Gomulu sistemler, algoritmalar ve teknik konular. Teori degil, uygulanabilir bilgi.
        </p>
      </section>

      {/* Posts */}
      <section>
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-lg font-semibold font-mono">
            ./yazilar
          </h2>
          <span className="text-xs font-mono text-muted-foreground px-2 py-1 bg-secondary rounded">
            {posts.length} kayit
          </span>
        </div>

        {posts.length === 0 ? (
          <div className="text-center py-16 border border-dashed border-border rounded-lg">
            <p className="text-muted-foreground mb-2 font-mono text-sm">// bos dizin</p>
            <p className="text-xs text-muted-foreground">content/blog klasorune .mdx dosyalari ekleyin</p>
          </div>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <BlogCard key={post.slug} post={post} />
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
