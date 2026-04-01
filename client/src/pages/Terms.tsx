import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Language = "en" | "ar";

const translations = {
  en: {
    terms: "Terms of Service",
    lastUpdated: "Last Updated: April 2026",
    backHome: "Back to Home",
    intro: "Welcome to Hidden Narratives. These Terms of Service govern your use of our website and services. By accessing and using this website, you accept and agree to be bound by the terms and provision of this agreement.",
    use: "Acceptable Use",
    useText: "You agree not to use this website for any unlawful purpose or in any way that could damage, disable, or impair the website. You agree not to reproduce, duplicate, or copy any content from this website without permission.",
    content: "Content and Intellectual Property",
    contentText: "All content on Hidden Narratives, including text, graphics, logos, and images, is the property of Hidden Narratives or its content suppliers and is protected by international copyright laws. You may not reproduce or distribute any content without permission.",
    liability: "Limitation of Liability",
    liabilityText: "Hidden Narratives is provided on an 'as is' basis. We make no warranties, expressed or implied, regarding the website or the information contained therein. We shall not be liable for any damages arising from the use of or inability to use the website.",
    external: "External Links",
    externalText: "Our website may contain links to external websites. We are not responsible for the content or practices of these external sites. Your use of external websites is at your own risk and subject to their terms of service.",
    changes: "Changes to Terms",
    changesText: "We reserve the right to modify these Terms of Service at any time. Changes will be effective immediately upon posting to the website. Your continued use of the website following the posting of revised Terms means that you accept and agree to the changes.",
    contact: "Contact Us",
    contactText: "If you have questions about these Terms of Service, please contact us through our contact form on the website.",
  },
  ar: {
    terms: "شروط الخدمة",
    lastUpdated: "آخر تحديث: أبريل 2026",
    backHome: "العودة إلى الرئيسية",
    intro: "مرحباً بك في ما وراء الرواية. تحكم شروط الخدمة هذه استخدامك لموقعنا وخدماتنا. بالوصول واستخدام هذا الموقع، فإنك توافق وتوافق على الالتزام بشروط وأحكام هذه الاتفاقية.",
    use: "الاستخدام المقبول",
    useText: "توافق على عدم استخدام هذا الموقع لأي غرض غير قانوني أو بأي طريقة قد تضر أو تعطل أو تضعف الموقع. توافق على عدم استنساخ أو نسخ أي محتوى من هذا الموقع بدون إذن.",
    content: "المحتوى والملكية الفكرية",
    contentText: "جميع المحتويات على ما وراء الرواية، بما في ذلك النصوص والرسومات والشعارات والصور، هي ملكية ما وراء الرواية أو موردي المحتوى الخاص بها وتحميها قوانين حقوق الطبع والنشر الدولية. لا يمكنك استنساخ أو توزيع أي محتوى بدون إذن.",
    liability: "تحديد المسؤولية",
    liabilityText: "يتم توفير ما وراء الرواية على أساس 'كما هو'. لا نقدم أي ضمانات، صريحة أو ضمنية، بشأن الموقع أو المعلومات الواردة فيه. لن نكون مسؤولين عن أي أضرار ناشئة عن استخدام أو عدم القدرة على استخدام الموقع.",
    external: "الروابط الخارجية",
    externalText: "قد يحتوي موقعنا على روابط لمواقع خارجية. نحن غير مسؤولين عن محتوى أو ممارسات هذه المواقع الخارجية. استخدامك للمواقع الخارجية يتم على مسؤوليتك الخاصة وتخضع لشروط الخدمة الخاصة بهم.",
    changes: "التغييرات على الشروط",
    changesText: "نحتفظ بالحق في تعديل شروط الخدمة هذه في أي وقت. ستصبح التغييرات سارية المفعول فوراً عند نشرها على الموقع. استمرارك في استخدام الموقع بعد نشر الشروط المعدلة يعني أنك توافق على التغييرات.",
    contact: "تواصل معنا",
    contactText: "إذا كان لديك أسئلة حول شروط الخدمة هذه، يرجى التواصل معنا من خلال نموذج الاتصال على الموقع.",
  },
};

export default function Terms() {
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

      {/* Content */}
      <section className="pt-32 pb-16 px-4">
        <div className="max-w-4xl mx-auto">
          <Button
            onClick={() => navigate("/")}
            variant="ghost"
            className="text-amber-600 hover:text-amber-400 mb-8"
          >
            ← {t.backHome}
          </Button>

          <h1 className="text-4xl font-bold text-amber-400 mb-2">{t.terms}</h1>
          <p className="text-gray-400 mb-8">{t.lastUpdated}</p>

          <div className="space-y-8">
            <Card className="bg-slate-800 border-amber-900/30">
              <CardContent className="pt-6">
                <p className="text-gray-300">{t.intro}</p>
              </CardContent>
            </Card>

            {/* Use */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">{t.use}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.useText}</p>
              </CardContent>
            </Card>

            {/* Content */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">{t.content}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.contentText}</p>
              </CardContent>
            </Card>

            {/* Liability */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">{t.liability}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.liabilityText}</p>
              </CardContent>
            </Card>

            {/* External */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">{t.external}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.externalText}</p>
              </CardContent>
            </Card>

            {/* Changes */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">{t.changes}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.changesText}</p>
              </CardContent>
            </Card>

            {/* Contact */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">{t.contact}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.contactText}</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}
