import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, BookOpen, Globe } from "lucide-react";

type Language = "en" | "ar";

const translations = {
  en: {
    about: "About Hidden Narratives",
    mission: "Our Mission",
    missionText: "Hidden Narratives is an independent research platform dedicated to uncovering forgotten historical structures and power dynamics through cinematic storytelling. We explore the hidden forces that shaped civilizations and continue to influence our world.",
    values: "Our Values",
    research: "Deep Research",
    researchText: "We conduct thorough historical analysis, examining primary sources and scholarly research to provide accurate, nuanced perspectives.",
    independence: "Independence",
    independenceText: "We operate independently, free from corporate or political influence, ensuring our analysis remains objective and unbiased.",
    storytelling: "Cinematic Storytelling",
    storytellingText: "We believe history should be engaging and accessible. Our narratives combine rigorous research with compelling storytelling.",
    contact: "Get in Touch",
    backHome: "Back to Home",
  },
  ar: {
    about: "حول ما وراء الرواية",
    mission: "مهمتنا",
    missionText: "ما وراء الرواية هي منصة بحثية مستقلة تهدف إلى كشف الهياكل التاريخية المخفية وديناميكيات القوة من خلال السرد الوثائقي السينمائي. نستكشف القوى الخفية التي شكلت الحضارات وتستمر في التأثير على عالمنا.",
    values: "قيمنا",
    research: "البحث العميق",
    researchText: "نجري تحليلاً تاريخياً شاملاً، نفحص المصادر الأولية والأبحاث العلمية لتقديم وجهات نظر دقيقة ومتوازنة.",
    independence: "الاستقلالية",
    independenceText: "نعمل بشكل مستقل، بعيداً عن التأثير الشركاتي أو السياسي، مما يضمن بقاء تحليلنا موضوعياً ومحايداً.",
    storytelling: "السرد السينمائي",
    storytellingText: "نؤمن بأن التاريخ يجب أن يكون جذاباً وسهل الوصول إليه. تجمع رواياتنا بين البحث الصارم والسرد الجذاب.",
    contact: "تواصل معنا",
    backHome: "العودة إلى الرئيسية",
  },
};

export default function About() {
  const [language, setLanguage] = useState<Language>("en");
  const [, navigate] = useLocation();

  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";
  }, [language]);

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
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold text-amber-400 mb-4">{t.about}</h1>
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-amber-600 hover:text-amber-400"
          >
            ← {t.backHome}
          </Button>
        </div>
      </section>

      {/* Mission */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <Card className="bg-slate-800 border-amber-900/30 mb-8">
            <CardHeader>
              <CardTitle className="text-amber-400">{t.mission}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 text-lg">{t.missionText}</p>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Values */}
      <section className="px-4 py-12 bg-slate-800/50 border-y border-amber-900/30">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-amber-400 mb-8">{t.values}</h2>
          <div className="grid md:grid-cols-3 gap-6">
            {/* Research */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <BookOpen className="text-amber-600 mb-2" size={32} />
                <CardTitle className="text-amber-400">{t.research}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.researchText}</p>
              </CardContent>
            </Card>

            {/* Independence */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <Globe className="text-amber-600 mb-2" size={32} />
                <CardTitle className="text-amber-400">{t.independence}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.independenceText}</p>
              </CardContent>
            </Card>

            {/* Storytelling */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <Users className="text-amber-600 mb-2" size={32} />
                <CardTitle className="text-amber-400">{t.storytelling}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.storytellingText}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="px-4 py-12">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-amber-400 mb-6">{t.contact}</h2>
          <Button
            onClick={() => navigate("/")}
            className="bg-amber-600 hover:bg-amber-700 text-black font-bold px-8 py-6"
          >
            {t.contact}
          </Button>
        </div>
      </section>
    </div>
  );
}
