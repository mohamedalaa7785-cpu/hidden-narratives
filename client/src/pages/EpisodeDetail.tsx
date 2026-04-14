import { useEffect, useMemo, useState } from "react";
import { useRoute, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Bookmark, Share2 } from "lucide-react";
import { Streamdown } from "streamdown";
import Breadcrumb from "@/components/Breadcrumb";
import { useBehaviorTracker } from "@/hooks/useBehaviorTracker";

export default function EpisodeDetail() {
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [readProgress, setReadProgress] = useState(0);
  const [match, params] = useRoute("/episodes/:slug");
  const [, navigate] = useLocation();
  useBehaviorTracker(`/episodes/${params?.slug ?? ""}`);

  const { data: episode, isLoading } = trpc.episodes.bySlug.useQuery(params?.slug || "", { enabled: Boolean(params?.slug) });
  const { data: allEpisodes } = trpc.episodes.list.useQuery();

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("language") : null;
    if (stored === "en" || stored === "ar") setLanguage(stored);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      const h = document.documentElement;
      const percent = Math.min(100, Math.round((h.scrollTop / (h.scrollHeight - h.clientHeight || 1)) * 100));
      setReadProgress(percent);
      if (episode?.slug) {
        localStorage.setItem(`read-progress:${episode.slug}`, String(percent));
      }
    };
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, [episode?.slug]);

  const related = useMemo(() => {
    if (!episode || !allEpisodes) return [];
    return allEpisodes
      .filter((ep: any) => ep.slug !== episode.slug)
      .sort((a: any, b: any) => {
        const aScore = Number(a.category === episode.category) + Number((a.keywordsEn || "").includes(episode.keywordsEn || ""));
        const bScore = Number(b.category === episode.category) + Number((b.keywordsEn || "").includes(episode.keywordsEn || ""));
        return bScore - aScore;
      })
      .slice(0, 3);
  }, [episode, allEpisodes]);

  if (!match) return null;
  const content = language === "en" ? episode?.contentEn : episode?.contentAr;
  const title = language === "en" ? episode?.titleEn : episode?.titleAr;
  const description = language === "en" ? episode?.descriptionEn : episode?.descriptionAr;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-amber-900/30 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={() => navigate("/")} className="text-2xl font-bold text-amber-600">Hidden Narratives</button>
          <button onClick={() => setLanguage(language === "en" ? "ar" : "en")} className="px-3 py-1 bg-amber-600 text-black rounded-full font-semibold">{language === "en" ? "العربية" : "English"}</button>
        </div>
      </nav>

      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb items={[{ label: "Stories", href: "/episodes" }, { label: title || "Story", href: `/episodes/${params?.slug}` }]} language={language} />
          <div className="w-full bg-slate-800 rounded h-2 mt-4 mb-4"><div className="bg-amber-500 h-2 rounded" style={{ width: `${readProgress}%` }} /></div>
          <Button onClick={() => navigate("/episodes")} variant="ghost" className="text-amber-600 hover:text-amber-400 mb-8"><ArrowLeft className="mr-2" size={20} />Back to Stories</Button>

          {isLoading ? <div className="text-center text-gray-400">Loading story...</div> : !episode ? <div className="text-center text-gray-400">Story not found.</div> : (
            <>
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">{title}</h1>
                <p className="text-xl text-gray-400 mb-6">{description}</p>
                <div className="flex gap-4">
                  <Button onClick={() => navigator.clipboard.writeText(window.location.href)} className="bg-amber-600 hover:bg-amber-700 text-black font-bold"><Share2 className="mr-2" size={20} />Share</Button>
                  <Button variant="outline" onClick={() => localStorage.setItem(`saved-story:${episode.slug}`, "1")}><Bookmark className="mr-2" size={18} />Save Story</Button>
                </div>
              </div>

              <Card className="bg-slate-800 border-amber-900/30 mb-8"><CardContent className="pt-6"><div className="prose prose-invert max-w-none"><Streamdown>{content}</Streamdown></div></CardContent></Card>

              {related.length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-amber-400 mb-6">Related Stories</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {related.map((ep: any) => (
                      <Card key={ep.slug} className="bg-slate-800 border-amber-900/30 hover:border-amber-600/50 transition cursor-pointer" onClick={() => navigate(`/episodes/${ep.slug}`)}>
                        <CardHeader><CardTitle className="text-amber-400 line-clamp-2">{language === "en" ? ep.titleEn : ep.titleAr}</CardTitle></CardHeader>
                        <CardContent><p className="text-gray-300 line-clamp-2">{language === "en" ? ep.descriptionEn : ep.descriptionAr}</p></CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
