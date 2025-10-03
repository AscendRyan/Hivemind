// src/pages/Blog.tsx
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Helmet } from "react-helmet-async";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";

type WPMediaSize = { source_url?: string };
type WPFeatured = {
  source_url?: string;
  media_details?: { sizes?: Record<string, WPMediaSize> };
};
type WPPost = {
  id: number;
  date: string;
  slug: string;
  link: string; // canonical WordPress URL
  title: { rendered: string };
  excerpt: { rendered: string };
  content?: { rendered: string };
  featured_media?: number;
  jetpack_featured_media_url?: string; // optional Jetpack fallback
  _embedded?: {
    author?: { name: string }[];
    "wp:featuredmedia"?: WPFeatured[];
    "wp:term"?: { name: string }[][];
  };
};

const WP_SITE = "https://hivemindai.co.uk";

// Detect if the app is running inside an iframe (so we can break out on click)
const inIframe =
  typeof window !== "undefined" &&
  (() => {
    try {
      return window.self !== window.top;
    } catch {
      return true;
    }
  })();

function stripHTML(html: string) {
  const tmp = document.createElement("div");
  tmp.innerHTML = html;
  return tmp.textContent || tmp.innerText || "";
}

/**
 * Prefer smaller CDN-sized images first.
 * Order: medium_large (≈768w) → medium (≈300w) → thumbnail → full → jetpack fallback.
 */
function getFeaturedSrc(p: WPPost) {
  const m = p._embedded?.["wp:featuredmedia"]?.[0];
  const sizes = m?.media_details?.sizes || {};
  return (
    sizes?.medium_large?.source_url ||
    sizes?.medium?.source_url ||
    sizes?.thumbnail?.source_url ||
    m?.source_url ||
    p.jetpack_featured_media_url ||
    ""
  );
}

/** Small helper to render external links that escape an iframe when needed */
function ExternalLink(props: { href: string; className?: string; children: React.ReactNode }) {
  const { href, className, children } = props;
  const extra = inIframe ? { target: "_top", rel: "noopener" } : {};
  return (
    <a href={href} {...extra} className={className}>
      {children}
    </a>
  );
}

export default function Blog() {
  const [posts, setPosts] = useState<WPPost[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  // Fetch a page of posts from WordPress (embedded data but trimmed with _fields)
  async function load(pageNum: number) {
    setLoading(true);

    const base = `${WP_SITE}/wp-json/wp/v2/posts`;
    const params = new URLSearchParams({
      per_page: "6",
      page: String(pageNum),
      _embed: "1",
      // Trim payload but keep what we actually use (author name, media sizes, terms)
      _fields: [
        "id",
        "date",
        "slug",
        "link",
        "title",
        "excerpt",
        "jetpack_featured_media_url",
        "_embedded.wp:featuredmedia.source_url",
        "_embedded.wp:featuredmedia.media_details.sizes",
        "_embedded.author.name",
        "_embedded.wp:term.name",
      ].join(","),
    });

    const ctrl = new AbortController();
    const signal = ctrl.signal;

    try {
      const res = await fetch(`${base}?${params.toString()}`, { signal });
      if (!res.ok) throw new Error(String(res.status));
      const data: WPPost[] = await res.json();
      if (pageNum === 1) setPosts(data);
      else setPosts((old) => [...old, ...data]);
      setHasMore(data.length > 0);
    } catch {
      setHasMore(false);
    } finally {
      setLoading(false);
    }

    // If another load starts/unmounts, abort this one
    return () => ctrl.abort();
  }

  useEffect(() => {
    const cleanup = load(1);
    return () => {
      if (typeof cleanup === "function") cleanup();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // categories from embedded terms
  const categories = useMemo(() => {
    const names = new Set<string>(["All"]);
    posts.forEach((p) =>
      (p._embedded?.["wp:term"] || []).forEach((group) =>
        (group || []).forEach((t) => t?.name && names.add(t.name))
      )
    );
    return Array.from(names);
  }, [posts]);

  const filtered = useMemo(() => {
    if (activeCategory === "All") return posts;
    return posts.filter((p) =>
      (p._embedded?.["wp:term"] || [])
        .flat()
        .some((t) => t?.name === activeCategory)
    );
  }, [posts, activeCategory]);

  const featured = filtered[0];
  const rest = filtered.slice(1);

  // crude read-time estimate (200 wpm)
  const estimateRead = (p: WPPost) => {
    const words = stripHTML(p.excerpt?.rendered || "").split(/\s+/).length + 200;
    return `${Math.max(3, Math.round(words / 200))} min read`;
  };

  return (
    <div className="min-h-screen">
      <Header />

      <Helmet>
        <title>HiveMind Blog</title>
        <meta name="description" content="Insights and updates from HiveMind." />
        {/* Prefer the main-domain list URL as canonical */}
        <link rel="canonical" href="https://hivemindai.co.uk/blog" />
      </Helmet>

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        <div className="container mx-auto max-w-6xl">
          <h1 className="text-4xl md:text-5xl font-bold text-gradient-primary mb-4">
            HiveMind Blog
          </h1>
          <p className="text-muted-foreground text-lg">
            Insights and updates. Powered by our WordPress posts.
          </p>

          {/* Categories */}
          <div className="flex gap-2 flex-wrap mt-8">
            {categories.map((cat) => (
              <Button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cat === activeCategory ? "button-3d" : "glass-button-outline"}
                size="sm"
              >
                {cat}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured */}
      {featured && (
        <section className="px-6">
          <div className="container mx-auto max-w-6xl">
            <div className="card-3d p-8 mb-12 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
              <div>
                <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                  Featured
                </div>
                <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">
                  {stripHTML(featured.title.rendered)}
                </h2>
                <div
                  className="text-lg text-muted-foreground mb-6"
                  dangerouslySetInnerHTML={{ __html: featured.excerpt.rendered }}
                />
                <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4" />
                    {featured._embedded?.author?.[0]?.name || "—"}
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    {new Date(featured.date).toLocaleDateString()}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    {estimateRead(featured)}
                  </div>
                </div>
                {/* Open canonical WordPress URL at the top level if embedded */}
                <ExternalLink href={featured.link}>
                  <span className="inline-flex items-center gap-2 text-primary">
                    Read article <ArrowRight className="h-4 w-4" />
                  </span>
                </ExternalLink>
              </div>

              <div className="relative">
                <img
                  src={getFeaturedSrc(featured) || "/api/placeholder/800/500"}
                  alt={stripHTML(featured.title.rendered) || "Featured image"}
                  loading="lazy"
                  decoding="async"
                  // avoid CLS without hardcoding width/height
                  style={{ aspectRatio: "16 / 9" }}
                  className="w-full h-[300px] md:h-[360px] object-cover rounded-xl border border-glow"
                />
                <div className="absolute inset-0 rounded-xl glow"></div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Grid */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rest.map((post) => (
              <article key={post.id} className="card-3d p-5">
                <img
                  src={getFeaturedSrc(post) || "/api/placeholder/400/250"}
                  alt={stripHTML(post.title.rendered) || "Post image"}
                  loading="lazy"
                  decoding="async"
                  style={{ aspectRatio: "16 / 9" }}
                  className="w-full h-40 object-cover rounded-lg mb-4 border border-glow"
                />
                <div className="text-xs mb-2 text-muted-foreground">
                  <span className="inline-flex items-center gap-2">
                    <User className="h-3 w-3" />
                    {post._embedded?.author?.[0]?.name || "—"}
                  </span>
                  <span className="mx-2">•</span>
                  <span className="inline-flex items-center gap-2">
                    <Calendar className="h-3 w-3" />
                    {new Date(post.date).toLocaleDateString()}
                  </span>
                </div>
                <h3 className="text-lg font-semibold mb-2 line-clamp-2">
                  <ExternalLink href={post.link}>{stripHTML(post.title.rendered)}</ExternalLink>
                </h3>
                <div
                  className="text-muted-foreground mb-4 line-clamp-3"
                  dangerouslySetInnerHTML={{ __html: post.excerpt.rendered }}
                />
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <Clock className="h-3 w-3" />
                    {estimateRead(post)}
                  </div>
                  <ExternalLink href={post.link}>
                    <span className="inline-flex items-center gap-1 text-primary">
                      Read <ArrowRight className="h-3 w-3" />
                    </span>
                  </ExternalLink>
                </div>
              </article>
            ))}
          </div>

          {/* Load more */}
          {hasMore && (
            <div className="text-center mt-12">
              <Button
                variant="outline"
                className="glass-button-outline"
                disabled={loading}
                onClick={() => {
                  const next = page + 1;
                  setPage(next);
                  load(next);
                }}
              >
                {loading ? "Loading…" : "Load More Articles"}
              </Button>
            </div>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
}
