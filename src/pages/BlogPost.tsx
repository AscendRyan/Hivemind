// src/pages/BlogPost.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, User, ArrowLeft } from "lucide-react";

type WPPost = {
  id: number;
  date: string;
  slug: string;
  link: string; // WP's canonical URL
  title: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    author?: { name: string }[];
    "wp:featuredmedia"?: Array<
      {
        alt_text?: string;
        source_url?: string;
        media_details?: { sizes?: Record<string, { source_url?: string }> };
      } | any
    >;
  };
};

const WP_SITE = "https://hivemindai.co.uk";

function stripHTML(html: string) {
  const d = document.createElement("div");
  d.innerHTML = html;
  return d.textContent || "";
}

function getFeaturedSrc(p: WPPost) {
  const m = p._embedded?.["wp:featuredmedia"]?.[0] as any;
  return (
    m?.source_url ||
    m?.media_details?.sizes?.medium_large?.source_url ||
    m?.media_details?.sizes?.large?.source_url ||
    m?.media_details?.sizes?.medium?.source_url ||
    ""
  );
}

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<WPPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      setLoading(true);
      // IMPORTANT: no _fields here — keep full _embedded so featured image URLs remain
      const res = await fetch(
        `${WP_SITE}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug || "")}&_embed=1`
      );
      const arr: WPPost[] = await res.json();
      setPost(arr[0] || null);
      setLoading(false);
    }
    run();
  }, [slug]);

  if (loading) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto max-w-3xl px-6 pt-36 pb-20">Loading…</div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen">
        <Header />
        <div className="container mx-auto max-w-3xl px-6 pt-36 pb-20">
          <p>Post not found.</p>
          <Link to="/blog" className="inline-flex items-center gap-2 text-primary mt-4">
            <ArrowLeft className="h-4 w-4" /> Back to Blog
          </Link>
        </div>
        <Footer />
      </div>
    );
  }

  const imgSrc = getFeaturedSrc(post);
  const imgAlt =
    (post._embedded?.["wp:featuredmedia"]?.[0] as any)?.alt_text ||
    stripHTML(post.title.rendered);

  const plain = stripHTML(post.content.rendered).slice(0, 160);

  return (
    <div className="min-h-screen">
      <Header />

      {/* SEO */}
      <Helmet>
        <title>{stripHTML(post.title.rendered)} — HiveMind</title>
        <meta name="description" content={plain} />
        {/* Canonical to the WordPress URL to avoid duplicate-content issues */}
        <link rel="canonical" href={post.link} />
        {/* Basic social tags */}
        <meta property="og:title" content={stripHTML(post.title.rendered)} />
        <meta property="og:type" content="article" />
        {imgSrc ? <meta property="og:image" content={imgSrc} /> : null}
      </Helmet>

      <main className="container mx-auto max-w-3xl px-6 pt-36 pb-24">
        <Link to="/blog" className="inline-flex items-center gap-2 text-primary mb-6">
          <ArrowLeft className="h-4 w-4" /> Back to Blog
        </Link>

        <h1
          className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <div className="text-sm text-muted-foreground mb-6 flex items-center gap-4">
          <span className="inline-flex items-center gap-2">
            <User className="h-4 w-4" />
            {post._embedded?.author?.[0]?.name || "—"}
          </span>
          <span className="inline-flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            {new Date(post.date).toLocaleDateString()}
          </span>
        </div>

        {imgSrc && (
          <img
            src={imgSrc}
            alt={imgAlt}
            className="w-full h-[320px] object-cover rounded-xl border border-glow mb-8"
          />
        )}

        <article
          className="prose prose-invert max-w-none"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
        />
      </main>
      <Footer />
    </div>
  );
}
