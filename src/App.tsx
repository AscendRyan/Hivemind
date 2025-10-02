import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async"; // <-- NEW
import Index from "./pages/Index";
import Careers from "./pages/Careers";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import NotFound from "./pages/NotFound";
import Error404 from "./pages/Error404";
import Skin from "./pages/Skin";
import SkinHeader from "./pages/SkinHeader";
import SkinBG from "./pages/SkinBG";
import SkinFooter from "./pages/SkinFooter";
import SkinHeaderBare from "./pages/SkinHeaderBare";
import SkinFooterBare from "./pages/SkinFooterBare";

const queryClient = new QueryClient();

const App = () => (
  <HelmetProvider> {/* <-- NEW wrapper */}
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/careers" element={<Careers />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/blog/:slug" element={<BlogPost />} />
            <Route path="*" element={<Error404 />} />
            <Route path="/skin" element={<Skin />} />
            <Route path="/skin-header" element={<SkinHeader />} />
            <Route path="/skin-bg" element={<SkinBG />} />
            <Route path="/skin-footer" element={<SkinFooter />} />
            <Route path="/skin-header-bare" element={<SkinHeaderBare />} />
            <Route path="/skin-footer-bare" element={<SkinFooterBare />} />
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </TooltipProvider>
    </QueryClientProvider>
  </HelmetProvider>
);

export default App;
