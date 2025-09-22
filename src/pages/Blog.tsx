import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Calendar, Clock, ArrowRight, User } from "lucide-react";
import { Button } from "@/components/ui/button";

const Blog = () => {
  // Sample blog posts data
  const blogPosts = [
    {
      id: 1,
      title: "The Future of AI Automation in Business",
      excerpt: "Discover how artificial intelligence is transforming business operations and what it means for the future of work.",
      author: "Ryan Mitchell",
      date: "2024-01-15",
      readTime: "5 min read",
      category: "AI Technology",
      image: "/api/placeholder/400/250",
      featured: true,
    },
    {
      id: 2,
      title: "5 Ways AI Can Revolutionize Your Lead Generation",
      excerpt: "Learn practical strategies to implement AI-powered lead generation systems that deliver measurable results.",
      author: "Sarah Johnson",
      date: "2024-01-12",
      readTime: "7 min read",
      category: "Lead Generation",
      image: "/api/placeholder/400/250",
    },
    {
      id: 3,
      title: "CRM Integration: Making Your Systems Work Together",
      excerpt: "A comprehensive guide to integrating AI solutions with your existing CRM for maximum efficiency.",
      author: "Michael Chen",
      date: "2024-01-10",
      readTime: "6 min read",
      category: "CRM Integration",
      image: "/api/placeholder/400/250",
    },
    {
      id: 4,
      title: "Marketing Automation Best Practices for 2024",
      excerpt: "Stay ahead of the curve with the latest marketing automation strategies and AI-powered tools.",
      author: "Emma Davis",
      date: "2024-01-08",
      readTime: "8 min read",
      category: "Marketing",
      image: "/api/placeholder/400/250",
    },
    {
      id: 5,
      title: "Custom AI Solutions: When Off-the-Shelf Isn't Enough",
      excerpt: "Understanding when your business needs a custom AI solution and how to approach the development process.",
      author: "Ryan Mitchell",
      date: "2024-01-05",
      readTime: "10 min read",
      category: "Custom Solutions",
      image: "/api/placeholder/400/250",
    },
    {
      id: 6,
      title: "Workflow Optimization Through Intelligent Automation",
      excerpt: "Transform your business processes with smart automation strategies that adapt and improve over time.",
      author: "Lisa Wang",
      date: "2024-01-03",
      readTime: "6 min read",
      category: "Workflow",
      image: "/api/placeholder/400/250",
    },
  ];

  const categories = ["All", "AI Technology", "Lead Generation", "CRM Integration", "Marketing", "Custom Solutions", "Workflow"];

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/20 rounded-full animate-float"></div>
          <div className="absolute top-40 right-20 w-24 h-24 bg-secondary/20 rounded-full animate-float" style={{ animationDelay: '2s' }}></div>
          <div className="absolute bottom-40 left-1/4 w-40 h-40 bg-accent/20 rounded-full animate-float" style={{ animationDelay: '4s' }}></div>
        </div>

        <div className="container mx-auto max-w-6xl relative z-10">
          <div className="text-center mb-16">
            <div className="inline-flex items-center justify-center px-4 py-2 rounded-full bg-primary/20 backdrop-blur-sm border border-primary/30 mb-6">
              <span className="text-sm font-medium text-muted-foreground">Insights & Resources</span>
            </div>
            <h1 className="text-5xl md:text-6xl font-bold mb-6 text-gradient-primary">
              HiveMind Blog
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Stay updated with the latest insights, trends, and best practices in AI automation, business optimization, and digital transformation.
            </p>
          </div>

          {/* Category Filter */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => (
              <Button
                key={category}
                variant={category === "All" ? "default" : "outline"}
                className={category === "All" ? "button-3d" : "glass-button-outline"}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Posts Grid */}
      <section className="pb-20 px-6">
        <div className="container mx-auto max-w-6xl">
          {/* Featured Post */}
          {blogPosts.filter(post => post.featured).map((post) => (
            <div key={post.id} className="card-3d p-8 mb-12">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="inline-flex items-center px-3 py-1 rounded-full bg-primary/20 text-primary text-sm font-medium mb-4">
                    Featured
                  </div>
                  <h2 className="text-3xl md:text-4xl font-bold mb-4 text-gradient-primary">
                    {post.title}
                  </h2>
                  <p className="text-lg text-muted-foreground mb-6">
                    {post.excerpt}
                  </p>
                  <div className="flex items-center gap-6 text-sm text-muted-foreground mb-6">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4" />
                      {new Date(post.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {post.readTime}
                    </div>
                  </div>
                  <Button className="button-3d group">
                    Read Article
                    <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
                <div className="lg:order-first">
                  <div className="aspect-video bg-gradient-to-br from-primary/20 to-secondary/20 rounded-lg border border-primary/30 flex items-center justify-center">
                    <span className="text-muted-foreground">Featured Article Image</span>
                  </div>
                </div>
              </div>
            </div>
          ))}

          {/* Regular Posts Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {blogPosts.filter(post => !post.featured).map((post) => (
              <article key={post.id} className="glass-card group cursor-pointer">
                <div className="aspect-video bg-gradient-to-br from-primary/10 to-secondary/10 rounded-t-lg border-b border-primary/20 flex items-center justify-center mb-6">
                  <span className="text-muted-foreground text-sm">Article Image</span>
                </div>
                
                <div className="p-6">
                  <div className="inline-flex items-center px-2 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium mb-3">
                    {post.category}
                  </div>
                  
                  <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-primary transition-colors">
                    {post.title}
                  </h3>
                  
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                  
                  <div className="flex items-center justify-between text-sm text-muted-foreground">
                    <div className="flex items-center gap-2">
                      <User className="h-3 w-3" />
                      {post.author}
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-3 w-3" />
                      {post.readTime}
                    </div>
                  </div>
                </div>
              </article>
            ))}
          </div>

          {/* Load More Button */}
          <div className="text-center mt-12">
            <Button variant="outline" className="glass-button-outline">
              Load More Articles
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Blog;