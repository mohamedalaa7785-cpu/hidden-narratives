import { useState, useEffect, useMemo } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Search } from "lucide-react";
import { useLocation } from "wouter";
import { useBehaviorTracker } from "@/hooks/useBehaviorTracker";

const categoryOptions = ["all", "dark", "romantic", "psychological"] as const;

export default function Episodes() {
  useBehaviorTracker("/episodes");
  const [language, setLanguage] = useState<"en" | "ar">("en");
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState<(typeof categoryOptions)[number]>("all");
  const [, navigate] = useLocation();

  const { data: episodes, isLoading } = trpc.episodes.list.useQuery();

  useEffect(() => {
    const stored = typeof window !== "undefined" ? localStorage.getItem("language") : null;
    if (stored === "en" || stored === "ar") setLanguage(stored);
  }, []);

  const filteredEpisodes = useMemo(() => {
    return (
      episodes?.filter((ep: any) => {
        const searchLower = searchTerm.toLowerCase();
        const title = language === "en" ? ep.titleEn : ep.titleAr;
        const description = language === "en" ? ep.descriptionEn : ep.descriptionAr;
        const categoryMatch = category === "all" || (ep.category || "").toLowerCase() === category;
        return categoryMatch && (title?.toLowerCase().includes(searchLower) || description?.toLowerCase().includes(searchLower));
      }) ?? []
    );
  }, [episodes, searchTerm, language, category]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-amber-900/30 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={() => navigate("/")} className="text-2xl font-bold text-amber-600">Hidden Narratives</button>
          <button onClick={() => setLanguage(language === "en" ? "ar" : "en")} className="px-3 py-1 bg-amber-600 text-black rounded-full font-semibold">{language === "en" ? "العربية" : "English"}</button>
        </div>
      </nav>

      <section className="pt-32 pb-12 px-4 max-w-7xl mx-auto">
        <div className="flex items-center gap-3 mb-4"><BookOpen className="text-amber-600" size={32} /><h1 className="text-4xl font-bold text-amber-400">Story Engine</h1></div>
        <p className="text-gray-400">Explore dark, romantic, and psychological narratives with SEO-friendly slugs.</p>
      </section>

      <section className="px-4 pb-8 max-w-7xl mx-auto space-y-3">
        <div className="relative"><Search className="absolute left-3 top-3 text-gray-400" size={20} /><Input placeholder="Search stories..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} className="bg-slate-800 border-amber-900/30 text-white pl-10" /></div>
        <div className="flex gap-2 flex-wrap">
          {categoryOptions.map((option) => (
            <Button key={option} variant={category === option ? "default" : "outline"} onClick={() => setCategory(option)}>{option}</Button>
          ))}
        </div>
      </section>

      <section className="px-4 pb-16 max-w-7xl mx-auto">
        {isLoading ? <div className="text-gray-400">Loading stories...</div> : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEpisodes.map((episode: any) => (
              <Card key={episode.slug} className="bg-slate-800 border-amber-900/30 hover:border-amber-600/50 transition">
                <CardHeader>
                  <CardTitle className="text-amber-400 line-clamp-2">{language === "en" ? episode.titleEn : episode.titleAr}</CardTitle>
                  <CardDescription className="text-gray-400">{episode.category || "psychological"}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 mb-4 line-clamp-3">{language === "en" ? episode.descriptionEn : episode.descriptionAr}</p>
                  <Button onClick={() => navigate(`/episodes/${episode.slug}`)} className="w-full bg-amber-600 hover:bg-amber-700 text-black font-bold">Read Story</Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
