import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { BookOpen, Search } from "lucide-react";
import { useLocation } from "wouter";

type Language = "en" | "ar";

const translations = {
  en: {
    episodes: "Episodes",
    search: "Search episodes...",
    loading: "Loading episodes...",
    noEpisodes: "No episodes found.",
    readMore: "Read More →",
  },
  ar: {
    episodes: "الحلقات",
    search: "ابحث عن الحلقات...",
    loading: "جاري تحميل الحلقات...",
    noEpisodes: "لم يتم العثور على حلقات.",
    readMore: "اقرأ المزيد →",
  },
};

export default function Episodes() {
  const [language, setLanguage] = useState<Language>("en");
  const [searchTerm, setSearchTerm] = useState("");
  const [, navigate] = useLocation();

  const t = translations[language];
  const { data: episodes, isLoading } = trpc.episodes.list.useQuery();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const filteredEpisodes = episodes?.filter((ep: any) => {
    const searchLower = searchTerm.toLowerCase();
    const title = language === "en" ? ep.titleEn : ep.titleAr;
    const description = language === "en" ? ep.descriptionEn : ep.descriptionAr;
    return title?.toLowerCase().includes(searchLower) || description?.toLowerCase().includes(searchLower);
  }) || [];

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-amber-900/30 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <button onClick={() => navigate("/")} className="text-2xl font-bold text-amber-600">
            Hidden Narratives
          </button>
          <button
            onClick={() => setLanguage(language === "en" ? "ar" : "en")}
            className="px-3 py-1 bg-amber-600 text-black rounded-full font-semibold hover:bg-amber-500 transition"
          >
            {language === "en" ? "العربية" : "English"}
          </button>
        </div>
      </nav>

      {/* Header */}
      <section className="pt-32 pb-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="text-amber-600" size={32} />
            <h1 className="text-4xl font-bold text-amber-400">{t.episodes}</h1>
          </div>
          <p className="text-gray-400">Explore our collection of deep historical analyses</p>
        </div>
      </section>

      {/* Search */}
      <section className="px-4 pb-8">
        <div className="max-w-7xl mx-auto">
          <div className="relative">
            <Search className="absolute left-3 top-3 text-gray-400" size={20} />
            <Input
              placeholder={t.search}
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="bg-slate-800 border-amber-900/30 text-white pl-10"
            />
          </div>
        </div>
      </section>

      {/* Episodes Grid */}
      <section className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          {isLoading ? (
            <div className="text-center text-gray-400">{t.loading}</div>
          ) : filteredEpisodes.length === 0 ? (
            <div className="text-center text-gray-400">{t.noEpisodes}</div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredEpisodes.map((episode: any) => (
                <Card key={episode.slug} className="bg-slate-800 border-amber-900/30 hover:border-amber-600/50 transition">
                  <CardHeader>
                    <CardTitle className="text-amber-400 line-clamp-2">
                      {language === "en" ? episode.titleEn : episode.titleAr}
                    </CardTitle>
                    <CardDescription className="text-gray-400">
                      {episode.category}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-gray-300 mb-4 line-clamp-3">
                      {language === "en" ? episode.descriptionEn : episode.descriptionAr}
                    </p>
                    <Button
                      onClick={() => navigate(`/episodes/${episode.slug}`)}
                      className="w-full bg-amber-600 hover:bg-amber-700 text-black font-bold"
                    >
                      {t.readMore}
                    </Button>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
