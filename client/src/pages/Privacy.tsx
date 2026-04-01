import { useState, useEffect } from "react";
import { useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

type Language = "en" | "ar";

const translations = {
  en: {
    privacy: "Privacy Policy",
    lastUpdated: "Last Updated: April 2026",
    backHome: "Back to Home",
    intro: "At Hidden Narratives, we are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information.",
    collection: "Information We Collect",
    collectionText: "We collect information you voluntarily provide to us, such as your name, email address, and messages when you subscribe to our newsletter or contact us through our contact form.",
    usage: "How We Use Your Information",
    usageText: "We use the information we collect to send you newsletters, respond to your inquiries, and improve our services. We do not sell or share your personal information with third parties.",
    security: "Security of Your Information",
    securityText: "We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction.",
    cookies: "Cookies and Tracking",
    cookiesText: "Our website may use cookies and similar tracking technologies to enhance your browsing experience. You can control cookie settings through your browser preferences.",
    rights: "Your Rights",
    rightsText: "You have the right to access, correct, or delete your personal information. To exercise these rights, please contact us through our contact form.",
    contact: "Contact Us",
    contactText: "If you have questions about this Privacy Policy, please contact us through our contact form on the website.",
  },
  ar: {
    privacy: "سياسة الخصوصية",
    lastUpdated: "آخر تحديث: أبريل 2026",
    backHome: "العودة إلى الرئيسية",
    intro: "في ما وراء الرواية، نلتزم بحماية خصوصيتك. توضح سياسة الخصوصية هذه كيفية جمعنا واستخدامنا والكشف عن معلوماتك وحمايتها.",
    collection: "المعلومات التي نجمعها",
    collectionText: "نجمع المعلومات التي تقدمها لنا طواعية، مثل اسمك وعنوان بريدك الإلكتروني ورسائلك عند الاشتراك في نشرتنا الإخبارية أو التواصل معنا من خلال نموذج الاتصال.",
    usage: "كيف نستخدم معلوماتك",
    usageText: "نستخدم المعلومات التي نجمعها لإرسال النشرات الإخبارية لك والرد على استفساراتك وتحسين خدماتنا. لا نبيع أو نشارك معلوماتك الشخصية مع أطراف ثالثة.",
    security: "أمان معلوماتك",
    securityText: "نطبق تدابير تقنية وتنظيمية مناسبة لحماية معلوماتك الشخصية من الوصول غير المصرح به والتعديل والكشف أو الحذف.",
    cookies: "ملفات تعريف الارتباط والتتبع",
    cookiesText: "قد يستخدم موقعنا ملفات تعريف الارتباط وتقنيات تتبع مماثلة لتحسين تجربة التصفح لديك. يمكنك التحكم في إعدادات ملفات تعريف الارتباط من خلال تفضيلات المتصفح.",
    rights: "حقوقك",
    rightsText: "لديك الحق في الوصول إلى معلوماتك الشخصية أو تصحيحها أو حذفها. لممارسة هذه الحقوق، يرجى التواصل معنا من خلال نموذج الاتصال.",
    contact: "تواصل معنا",
    contactText: "إذا كان لديك أسئلة حول سياسة الخصوصية هذه، يرجى التواصل معنا من خلال نموذج الاتصال على الموقع.",
  },
};

export default function Privacy() {
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

          <h1 className="text-4xl font-bold text-amber-400 mb-2">{t.privacy}</h1>
          <p className="text-gray-400 mb-8">{t.lastUpdated}</p>

          <div className="space-y-8">
            <Card className="bg-slate-800 border-amber-900/30">
              <CardContent className="pt-6">
                <p className="text-gray-300">{t.intro}</p>
              </CardContent>
            </Card>

            {/* Collection */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">{t.collection}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.collectionText}</p>
              </CardContent>
            </Card>

            {/* Usage */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">{t.usage}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.usageText}</p>
              </CardContent>
            </Card>

            {/* Security */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">{t.security}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.securityText}</p>
              </CardContent>
            </Card>

            {/* Cookies */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">{t.cookies}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.cookiesText}</p>
              </CardContent>
            </Card>

            {/* Rights */}
            <Card className="bg-slate-800 border-amber-900/30">
              <CardHeader>
                <CardTitle className="text-amber-400">{t.rights}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-300">{t.rightsText}</p>
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
