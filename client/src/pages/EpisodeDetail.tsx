import { useState, useEffect } from "react";
import { useRoute, useLocation } from "wouter";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowLeft, Share2 } from "lucide-react";
import { Streamdown } from "streamdown";
import Breadcrumb from "@/components/Breadcrumb";

type Language = "en" | "ar";

const translations = {
  en: {
    loading: "Loading episode...",
    notFound: "Episode not found.",
    back: "Back to Episodes",
    share: "Share",
    relatedEpisodes: "Related Episodes",
  },
  ar: {
    loading: "جاري تحميل الحلقة...",
    notFound: "لم يتم العثور على الحلقة.",
    back: "العودة إلى الحلقات",
    share: "مشاركة",
    relatedEpisodes: "حلقات ذات صلة",
  },
};

export default function EpisodeDetail() {
  const [language, setLanguage] = useState<Language>(() => {
    if (typeof window !== "undefined") {
      return (localStorage.getItem("language") as Language) || "en";
    }
    return "en";
  });
  const [match, params] = useRoute("/episodes/:slug");
  const [, navigate] = useLocation();

  const t = translations[language];
  const { data: episode, isLoading } = trpc.episodes.bySlug.useQuery(params?.slug || "");
  const { data: allEpisodes } = trpc.episodes.list.useQuery();

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
    localStorage.setItem("language", language);
  }, [language]);

  if (!match) return null;

  const getRelatedEpisodes = () => {
    if (!episode || !allEpisodes) return [];
    return allEpisodes
      .filter((ep: any) => ep.slug !== episode.slug && ep.category === episode.category)
      .slice(0, 3);
  };

  const content = language === "en" ? episode?.contentEn : episode?.contentAr;
  const title = language === "en" ? episode?.titleEn : episode?.titleAr;
  const description = language === "en" ? episode?.descriptionEn : episode?.descriptionAr;

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-amber-900/30 z-50">
        <div className="max-w-4xl mx-auto px-4 py-4 flex justify-between items-center">
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

      {/* Content */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Breadcrumb
            items={[
              { label: t.relatedEpisodes.replace(" Episodes", "").replace(" حلقات", ""), href: "/episodes" },
              { label: title || "Episode", href: `/episodes/${params?.slug}` },
            ]}
            language={language}
          />

          <Button
            onClick={() => navigate("/episodes")}
            variant="ghost"
            className="text-amber-600 hover:text-amber-400 mb-8 mt-4"
          >
            <ArrowLeft className="mr-2" size={20} />
            {t.back}
          </Button>

          {isLoading ? (
            <div className="text-center text-gray-400">{t.loading}</div>
          ) : !episode ? (
            <div className="text-center text-gray-400">{t.notFound}</div>
          ) : (
            <>
              {/* Header */}
              <div className="mb-8">
                <h1 className="text-4xl md:text-5xl font-bold text-amber-400 mb-4">{title}</h1>
                <p className="text-xl text-gray-400 mb-6">{description}</p>
                <div className="flex gap-4">
                  <Button
                    onClick={() => {
                      navigator.clipboard.writeText(window.location.href);
                      alert("Link copied!");
                    }}
                    className="bg-amber-600 hover:bg-amber-700 text-black font-bold"
                  >
                    <Share2 className="mr-2" size={20} />
                    {t.share}
                  </Button>
                </div>
              </div>

              {/* Ad Zone - Top */}
              <div className="bg-slate-800/50 border border-amber-900/30 rounded-lg p-4 text-sm text-gray-400 mb-8">
                [AdSense Zone - Top]
              </div>

              {/* Content */}
              <Card className="bg-slate-800 border-amber-900/30 mb-8">
                <CardContent className="pt-6">
                  <div className="prose prose-invert max-w-none">
                    <Streamdown>{content}</Streamdown>
                  </div>
                </CardContent>
              </Card>

              {/* Ad Zone - Bottom */}
              <div className="bg-slate-800/50 border border-amber-900/30 rounded-lg p-4 text-sm text-gray-400 mb-8">
                [AdSense Zone - Bottom]
              </div>

              {/* Related Episodes */}
              {getRelatedEpisodes().length > 0 && (
                <div>
                  <h2 className="text-2xl font-bold text-amber-400 mb-6">{t.relatedEpisodes}</h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {getRelatedEpisodes().map((ep: any) => (
                      <Card
                        key={ep.slug}
                        className="bg-slate-800 border-amber-900/30 hover:border-amber-600/50 transition cursor-pointer"
                        onClick={() => navigate(`/episodes/${ep.slug}`)}
                      >
                        <CardHeader>
                          <CardTitle className="text-amber-400 line-clamp-2">
                            {language === "en" ? ep.titleEn : ep.titleAr}
                          </CardTitle>
                        </CardHeader>
                        <CardContent>
                          <p className="text-gray-300 line-clamp-2">
                            {language === "en" ? ep.descriptionEn : ep.descriptionAr}
                          </p>
                        </CardContent>
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
