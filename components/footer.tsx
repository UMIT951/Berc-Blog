import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t border-border py-6">
      <div className="max-w-4xl mx-auto px-6">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs font-mono text-muted-foreground">
            Arif.E / {new Date().getFullYear()}
          </p>
          <div className="flex items-center gap-4">
            <Link href="/tags" className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
              /tags
            </Link>
            <Link href="/rss.xml" className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors">
              /rss
            </Link>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs font-mono text-muted-foreground hover:text-primary transition-colors"
            >
              /github
            </a>
          </div>
        </div>
      </div>
    </footer>
  )
}
