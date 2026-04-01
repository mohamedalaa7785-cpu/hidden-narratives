import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Play } from "lucide-react";

type Language = "en" | "ar";

const translations = {
  en: {
    videos: "Videos",
    subscribe: "Subscribe to Our Channel",
    subscribeDesc: "Watch our latest historical analyses on YouTube",
    visitChannel: "Visit YouTube Channel",
    backHome: "Back to Home",
    featured: "Featured Videos",
    description: "Explore our collection of documentary-style videos exploring hidden historical narratives and power structures.",
  },
  ar: {
    videos: "الفيديوهات",
    subscribe: "اشترك في قناتنا",
    subscribeDesc: "شاهد أحدث تحليلاتنا التاريخية على يوتيوب",
    visitChannel: "زيارة قناة يوتيوب",
    backHome: "العودة إلى الرئيسية",
    featured: "الفيديوهات المميزة",
    description: "استكشف مجموعتنا من مقاطع الفيديو بأسلوب وثائقي تستكشف الروايات التاريخية المخفية وهياكل القوة.",
  },
};

export default function Videos() {
  const [language, setLanguage] = useState<Language>("en");
  const [, navigate] = useLocation();

  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

  const videos = [
    {
      id: "dQw4w9WgXcQ",
      titleEn: "The Deep Political Structure of Ancient Egypt",
      titleAr: "البنية السياسية العميقة لمصر القديمة",
      descriptionEn: "A comprehensive analysis of governance and power dynamics in ancient Egypt",
      descriptionAr: "تحليل شامل لنظام الحكم وديناميكيات القوة في مصر القديمة",
    },
    {
      id: "dQw4w9WgXcQ",
      titleEn: "Patterns of Collapse: Why Great Empires Fall",
      titleAr: "أنماط الانهيار: لماذا تسقط الإمبراطوريات العظيمة",
      descriptionEn: "Exploring the recurring patterns that lead to the fall of civilizations",
      descriptionAr: "استكشاف الأنماط المتكررة التي تؤدي إلى سقوط الحضارات",
    },
    {
      id: "dQw4w9WgXcQ",
      titleEn: "Knights Templar: Rapid Rise and Dramatic Fall",
      titleAr: "فرسان الهيكل: الصعود السريع والسقوط الدرامي",
      descriptionEn: "The mysterious history of the Knights Templar and their influence on medieval Europe",
      descriptionAr: "التاريخ الغامض لفرسان الهيكل وتأثيرهم على أوروبا العصور الوسطى",
    },
  ];

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
            <Play className="text-amber-600" size={32} />
            <h1 className="text-4xl font-bold text-amber-400">{t.videos}</h1>
          </div>
          <p className="text-gray-400">{t.description}</p>
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-amber-600 hover:text-amber-400 mt-4"
          >
            ← {t.backHome}
          </Button>
        </div>
      </section>

      {/* Subscribe Section */}
      <section className="px-4 py-12 bg-amber-600/5 border-y border-amber-900/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-400 mb-4">{t.subscribe}</h2>
          <p className="text-gray-400 mb-6">{t.subscribeDesc}</p>
          <a
            href="https://www.youtube.com/@hiddennarrativesbymuhammed"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-8 py-3 rounded-lg transition"
          >
            {t.visitChannel}
          </a>
        </div>
      </section>

      {/* Videos Grid */}
      <section className="px-4 py-16">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-400 mb-8">{t.featured}</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {videos.map((video, idx) => (
              <Card key={idx} className="bg-slate-800 border-amber-900/30 hover:border-amber-600/50 transition overflow-hidden">
                <div className="relative bg-black overflow-hidden rounded-t-lg">
                  <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
                    <iframe
                      className="absolute top-0 left-0 w-full h-full"
                      src={`https://www.youtube.com/embed/${video.id}`}
                      title={language === "en" ? video.titleEn : video.titleAr}
                      frameBorder="0"
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      loading="lazy"
                    />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-amber-400 line-clamp-2">
                    {language === "en" ? video.titleEn : video.titleAr}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-300 line-clamp-2 mb-4">
                    {language === "en" ? video.descriptionEn : video.descriptionAr}
                  </p>
                  <a
                    href={`https://www.youtube.com/watch?v=${video.id}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold px-4 py-2 rounded transition"
                  >
                    Open on YouTube
                  </a>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        {/* Ad Zone */}
        <div className="mt-16 max-w-7xl mx-auto bg-slate-800/50 border border-amber-900/30 rounded-lg p-4 text-sm text-gray-400">
          [AdSense Zone - Videos Page]
        </div>
      </section>
    </div>
  );
}
