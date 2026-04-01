import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Language = "en" | "ar";

const translations = {
  en: {
    disclaimer: "Disclaimer",
    lastUpdated: "Last Updated: April 2026",
    backHome: "Back to Home",
    intro: "This disclaimer governs your use of the Hidden Narratives website. By accessing and using this website, you acknowledge that you have read, understood, and agree to be bound by all the provisions of this disclaimer.",
    educational: "Educational Purpose",
    educationalText: "The content on Hidden Narratives is provided for educational and informational purposes only. While we strive for accuracy, we do not guarantee that all information is completely accurate, current, or error-free.",
    research: "Research and Analysis",
    researchText: "Our analyses and interpretations of historical events represent our research and professional judgment. Different historians and researchers may have different interpretations of the same events. We encourage critical thinking and independent research.",
    notAdvice: "Not Professional Advice",
    notAdviceText: "The content on this website is not intended to provide professional, legal, financial, or medical advice. For specific advice related to your situation, please consult with qualified professionals.",
    thirdParty: "Third-Party Content",
    thirdPartyText: "Our website may contain links to third-party websites and resources. We are not responsible for the accuracy, completeness, or reliability of any third-party content. Your access to and use of third-party websites is at your own risk.",
    liability: "Limitation of Liability",
    liabilityText: "In no event shall Hidden Narratives, its owners, or its content providers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on the website.",
    accuracy: "Accuracy of Information",
    accuracyText: "While we make efforts to ensure the accuracy of information on our website, we do not warrant the accuracy, completeness, or timeliness of any information. You use the information at your own risk.",
    changes: "Changes to Disclaimer",
    changesText: "We reserve the right to modify this disclaimer at any time. Your continued use of the website following the posting of revised terms means that you accept and agree to the changes.",
    contact: "Contact Us",
    contactText: "If you have questions about this disclaimer, please contact us through our contact form on the website.",
  },
  ar: {
    disclaimer: "إخلاء المسؤولية",
    lastUpdated: "آخر تحديث: أبريل 2026",
    backHome: "العودة إلى الرئيسية",
    intro: "يحكم هذا الإخلاء استخدامك لموقع ما وراء الرواية. بالوصول واستخدام هذا الموقع، فإنك تقر بأنك قد قرأت وفهمت وتوافق على الالتزام بجميع أحكام هذا الإخلاء.",
    educational: "الغرض التعليمي",
    educationalText: "يتم توفير المحتوى على ما وراء الرواية لأغراض تعليمية وإعلامية فقط. بينما نسعى للدقة، لا نضمن أن جميع المعلومات دقيقة تماماً أو حالية أو خالية من الأخطاء.",
    research: "البحث والتحليل",
    researchText: "تمثل تحليلاتنا وتفسيراتنا للأحداث التاريخية بحثنا وحكمنا المهني. قد يكون لدى المؤرخين والباحثين المختلفين تفسيرات مختلفة لنفس الأحداث. نشجع التفكير النقدي والبحث المستقل.",
    notAdvice: "ليس نصيحة مهنية",
    notAdviceText: "المحتوى على هذا الموقع لا يقصد به تقديم نصيحة مهنية أو قانونية أو مالية أو طبية. للحصول على نصيحة محددة تتعلق بحالتك، يرجى استشارة المتخصصين المؤهلين.",
    thirdParty: "محتوى الطرف الثالث",
    thirdPartyText: "قد يحتوي موقعنا على روابط لمواقع ومصادر الطرف الثالث. نحن غير مسؤولين عن دقة أو اكتمال أو موثوقية أي محتوى من طرف ثالث. الوصول واستخدام مواقع الطرف الثالث يتم على مسؤوليتك الخاصة.",
    liability: "تحديد المسؤولية",
    liabilityText: "في أي حال من الأحوال، لن تكون ما وراء الرواية أو مالكوها أو موردو المحتوى مسؤولين عن أي أضرار (بما في ذلك، على سبيل المثال لا الحصر، الأضرار الناجمة عن فقدان البيانات أو الأرباح، أو بسبب انقطاع العمل) الناشئة عن استخدام أو عدم القدرة على استخدام المواد على الموقع.",
    accuracy: "دقة المعلومات",
    accuracyText: "بينما نبذل جهوداً لضمان دقة المعلومات على موقعنا، لا نضمن دقة أو اكتمال أو حداثة أي معلومات. تستخدم المعلومات على مسؤوليتك الخاصة.",
    changes: "التغييرات على الإخلاء",
    changesText: "نحتفظ بالحق في تعديل هذا الإخلاء في أي وقت. استمرارك في استخدام الموقع بعد نشر الشروط المعدلة يعني أنك توافق على التغييرات.",
    contact: "تواصل معنا",
    contactText: "إذا كان لديك أسئلة حول هذا الإخلاء، يرجى التواصل معنا من خلال نموذج الاتصال على الموقع.",
  },
};

export default function Disclaimer() {
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

          <h1 className="text-4xl font-bold text-amber-400 mb-2">{t.disclaimer}</h1>
          <p className="text-gray-400 mb-8">{t.lastUpdated}</p>

          <div className="space-y-8">
            <Card className="bg-slate-800 border-amber-900/30">
              <CardContent className="pt-6">
                <p className="text-gray-300">{t.intro}</p>
              </CardContent>
            </Card>

            {/* Educational */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">{t.educational}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.educationalText}</p>
              </CardContent>
            </Card>

            {/* Research */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">{t.research}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.researchText}</p>
              </CardContent>
            </Card>

            {/* Not Advice */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">{t.notAdvice}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.notAdviceText}</p>
              </CardContent>
            </Card>

            {/* Third Party */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">{t.thirdParty}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.thirdPartyText}</p>
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

            {/* Accuracy */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">{t.accuracy}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.accuracyText}</p>
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
