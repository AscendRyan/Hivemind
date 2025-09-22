// src/pages/BlogPost.tsx
import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, User, ArrowLeft } from "lucide-react";

type WPPost = {
  id: number;
  date: string;
  slug: string;
  title: { rendered: string };
  content: { rendered: string };
  _embedded?: {
    author?: { name: string }[];
    "wp:featuredmedia"?: { source_url?: string }[];
  };
};

const WP_SITE = "https://hivemindai.co.uk"; // your WP site

export default function BlogPost() {
  const { slug } = useParams();
  const [post, setPost] = useState<WPPost | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function run() {
      setLoading(true);
      const res = await fetch(
        `${WP_SITE}/wp-json/wp/v2/posts?slug=${encodeURIComponent(slug || "")}&_embed=1&_fields=id,date,slug,title,content,_embedded.wp:featuredmedia,_embedded.author`
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

  return (
    <div className="min-h-screen">
      <Header />
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

        {post._embedded?.["wp:featuredmedia"]?.[0]?.source_url && (
          <img
            src={post._embedded["wp:featuredmedia"][0].source_url!}
            alt=""
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
