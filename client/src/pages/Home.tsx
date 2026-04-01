import { useState, useEffect } from "react";
import { trpc } from "@/lib/trpc";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Mail, Play, BookOpen, Users } from "lucide-react";
import { useLocation } from "wouter";

type Language = "en" | "ar";

const translations = {
  en: {
    title: "Hidden Narratives",
    subtitle: "Deep historical analysis. Power structures. Lost civilizations.",
    episodes: "Explore Episodes",
    newsletter: "Join the Inner Circle",
    newsletterDesc: "Receive strategic historical insights directly to your inbox.",
    subscribe: "Subscribe",
    featured: "Featured Episode",
    about: "About Hidden Narratives",
    aboutText: "An independent research platform dedicated to uncovering forgotten historical structures and power dynamics through cinematic storytelling.",
    contact: "Get in Touch",
    contactDesc: "Have questions or feedback? We'd love to hear from you.",
    name: "Your Name",
    email: "Your Email",
    subject: "Subject",
    message: "Your Message",
    send: "Send Message",
    language: "العربية",
    videos: "Videos",
    privacy: "Privacy Policy",
    terms: "Terms of Service",
    disclaimer: "Disclaimer",
    youtube: "YouTube",
    facebook: "Facebook",
    linkedin: "LinkedIn",
    whatsapp: "WhatsApp",
    copyright: "© 2026 Hidden Narratives. All rights reserved.",
    emailSent: "Email sent successfully!",
    subscribedSuccess: "Successfully subscribed!",
    error: "An error occurred. Please try again.",
  },
  ar: {
    title: "ما وراء الرواية",
    subtitle: "تحليل عميق للتاريخ، هياكل القوة، والحضارات المفقودة.",
    episodes: "استكشف الحلقات",
    newsletter: "انضم إلى الدائرة الخاصة",
    newsletterDesc: "احصل على تحليلات تاريخية عميقة مباشرة إلى بريدك الإلكتروني.",
    subscribe: "اشترك",
    featured: "الحلقة المميزة",
    about: "حول ما وراء الرواية",
    aboutText: "منصة بحثية مستقلة تهدف إلى كشف الهياكل الخفية للتاريخ والحضارات من خلال سرد وثائقي عميق.",
    contact: "تواصل معنا",
    contactDesc: "هل لديك أسئلة أو ملاحظات؟ نود أن نسمع منك.",
    name: "اسمك",
    email: "بريدك الإلكتروني",
    subject: "الموضوع",
    message: "رسالتك",
    send: "إرسال الرسالة",
    language: "English",
    videos: "الفيديوهات",
    privacy: "سياسة الخصوصية",
    terms: "شروط الخدمة",
    disclaimer: "إخلاء المسؤولية",
    youtube: "يوتيوب",
    facebook: "فيسبوك",
    linkedin: "لينكدإن",
    whatsapp: "واتساب",
    copyright: "© 2026 ما وراء الرواية. جميع الحقوق محفوظة.",
    emailSent: "تم إرسال البريد بنجاح!",
    subscribedSuccess: "تم الاشتراك بنجاح!",
    error: "حدث خطأ. يرجى المحاولة مرة أخرى.",
  },
};

export default function Home() {
  const [language, setLanguage] = useState<Language>("en");
  const [contactForm, setContactForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [, navigate] = useLocation();

  const t = translations[language];

  useEffect(() => {
    document.documentElement.lang = language;
    document.documentElement.dir = language === "ar" ? "rtl" : "ltr";

    // Update meta tags
    document.title = `${t.title} - ${t.subtitle}`;
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute("content", t.subtitle);
    }
  }, [language, t]);

  const contactMutation = trpc.contact.submit.useMutation();
  const newsletterMutation = trpc.newsletter.subscribe.useMutation();

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await contactMutation.mutateAsync({
        ...contactForm,
        language,
      });
      setContactForm({ name: "", email: "", subject: "", message: "" });
      alert(t.emailSent);
    } catch (error) {
      alert(t.error);
    }
  };

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await newsletterMutation.mutateAsync({
        email: newsletterEmail,
        language,
      });
      setNewsletterEmail("");
      alert(t.subscribedSuccess);
    } catch (error) {
      alert(t.error);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white">
      {/* Navigation */}
      <nav className="fixed top-0 w-full bg-black/80 backdrop-blur-md border-b border-amber-900/30 z-50">
        <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-amber-600">{t.title}</div>
          <div className="flex gap-4 items-center">
            <button
              onClick={() => navigate("/episodes")}
              className="hover:text-amber-600 transition"
            >
              {t.episodes}
            </button>
            <button
              onClick={() => setLanguage(language === "en" ? "ar" : "en")}
              className="px-3 py-1 bg-amber-600 text-black rounded-full font-semibold hover:bg-amber-500 transition"
            >
              {t.language}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-amber-600/10 to-transparent pointer-events-none" />
        <div className="max-w-4xl mx-auto relative z-10">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
            {t.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 mb-8">{t.subtitle}</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Button
              onClick={() => navigate("/episodes")}
              className="bg-amber-600 hover:bg-amber-700 text-black font-bold px-8 py-6 text-lg"
            >
              <BookOpen className="mr-2" />
              {t.episodes}
            </Button>
            <Button
              onClick={() => navigate("/videos")}
              variant="outline"
              className="border-amber-600 text-amber-600 hover:bg-amber-600/10 font-bold px-8 py-6 text-lg"
            >
              <Play className="mr-2" />
              {t.videos}
            </Button>
          </div>
        </div>

        {/* Ad Placement Zone - Header */}
        <div className="mt-16 max-w-4xl mx-auto bg-slate-800/50 border border-amber-900/30 rounded-lg p-4 text-sm text-gray-400">
          [AdSense Zone - Header - 728x90]
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 px-4 bg-amber-600/5 border-y border-amber-900/30">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2">{t.newsletter}</h2>
            <p className="text-gray-400">{t.newsletterDesc}</p>
          </div>
          <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
            <Input
              type="email"
              placeholder={t.email}
              value={newsletterEmail}
              onChange={(e) => setNewsletterEmail(e.target.value)}
              className="bg-slate-800 border-amber-900/30 text-white"
              required
            />
            <Button type="submit" className="bg-amber-600 hover:bg-amber-700 text-black font-bold">
              <Mail className="mr-2" />
              {t.subscribe}
            </Button>
          </form>
        </div>
      </section>

      {/* Featured Episode */}
      <section className="py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold mb-8 text-amber-400">{t.featured}</h2>
          <Card className="bg-slate-800 border-amber-900/30">
            <CardHeader>
              <CardTitle className="text-amber-400">The Deep Political Structure of Ancient Egypt</CardTitle>
              <CardDescription>A comprehensive analysis of governance and power in ancient Egypt</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-gray-300 mb-4">
                Ancient Egypt maintained political continuity for nearly three millennia through a deeply structured system combining religion, bureaucracy, economic control, and symbolic authority.
              </p>
              <Button
                onClick={() => navigate("/episodes/deep-power-ancient-egypt")}
                className="bg-amber-600 hover:bg-amber-700 text-black font-bold"
              >
                Read Full Analysis →
              </Button>
            </CardContent>
          </Card>
        </div>

        {/* Ad Placement Zone - Sidebar */}
        <div className="mt-8 max-w-4xl mx-auto bg-slate-800/50 border border-amber-900/30 rounded-lg p-4 text-sm text-gray-400">
          [AdSense Zone - Sidebar - 300x250]
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-4 bg-slate-800/50 border-y border-amber-900/30">
        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-gradient-to-br from-amber-600/20 to-amber-900/20 rounded-lg h-64" />
            <div>
              <h2 className="text-3xl font-bold mb-4 text-amber-400">{t.about}</h2>
              <p className="text-gray-300 mb-6">{t.aboutText}</p>
              <Button
                onClick={() => navigate("/about")}
                className="bg-amber-600 hover:bg-amber-700 text-black font-bold"
              >
                Learn More →
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section className="py-16 px-4">
        <div className="max-w-2xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-amber-400">{t.contact}</h2>
            <p className="text-gray-400">{t.contactDesc}</p>
          </div>
          <Card className="bg-slate-800 border-amber-900/30">
            <CardContent className="pt-6">
              <form onSubmit={handleContactSubmit} className="space-y-4">
                <Input
                  placeholder={t.name}
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="bg-slate-700 border-amber-900/30 text-white"
                  required
                />
                <Input
                  type="email"
                  placeholder={t.email}
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="bg-slate-700 border-amber-900/30 text-white"
                  required
                />
                <Input
                  placeholder={t.subject}
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="bg-slate-700 border-amber-900/30 text-white"
                  required
                />
                <Textarea
                  placeholder={t.message}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="bg-slate-700 border-amber-900/30 text-white min-h-32"
                  required
                />
                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-black font-bold">
                  {t.send}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>

        {/* Ad Placement Zone - In-Content */}
        <div className="mt-8 max-w-2xl mx-auto bg-slate-800/50 border border-amber-900/30 rounded-lg p-4 text-sm text-gray-400">
          [AdSense Zone - In-Content - 300x250]
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t border-amber-900/30 py-12 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            <div>
              <h3 className="text-amber-400 font-bold mb-4">Navigation</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate("/")} className="hover:text-amber-400">Home</button></li>
                <li><button onClick={() => navigate("/episodes")} className="hover:text-amber-400">{t.episodes}</button></li>
                <li><button onClick={() => navigate("/videos")} className="hover:text-amber-400">{t.videos}</button></li>
                <li><button onClick={() => navigate("/about")} className="hover:text-amber-400">{t.about}</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-amber-400 font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li><button onClick={() => navigate("/privacy")} className="hover:text-amber-400">{t.privacy}</button></li>
                <li><button onClick={() => navigate("/terms")} className="hover:text-amber-400">{t.terms}</button></li>
                <li><button onClick={() => navigate("/disclaimer")} className="hover:text-amber-400">{t.disclaimer}</button></li>
              </ul>
            </div>
            <div>
              <h3 className="text-amber-400 font-bold mb-4">Follow Us</h3>
              <div className="flex flex-col gap-2 text-gray-400">
                <a href="https://www.youtube.com/@hiddennarrativesbymuhammed" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
                  {t.youtube}
                </a>
                <a href="https://www.facebook.com/profile.php?id=61588578182976" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
                  {t.facebook}
                </a>
                <a href="https://www.linkedin.com/in/muhammed-alaa" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
                  {t.linkedin}
                </a>
                <a href="https://wa.me/201001234567" target="_blank" rel="noopener noreferrer" className="hover:text-amber-400">
                  {t.whatsapp}
                </a>
              </div>
            </div>
          </div>

          {/* Ad Placement Zone - Footer */}
          <div className="bg-slate-800/50 border border-amber-900/30 rounded-lg p-4 text-sm text-gray-400 mb-8">
            [AdSense Zone - Footer - 728x90]
          </div>

          <div className="border-t border-amber-900/30 pt-8 text-center text-gray-400">
            <p>{t.copyright}</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
