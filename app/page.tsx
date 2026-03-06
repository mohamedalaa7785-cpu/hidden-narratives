"use client"

import Link from "next/link"
import { useState, useEffect } from "react"

export default function Home() {

const [lang,setLang] = useState<"en"|"ar">("en")

useEffect(()=>{
document.documentElement.lang = lang
document.documentElement.dir = lang === "ar" ? "rtl" : "ltr"
},[lang])

const content = {

en:{
title:"Hidden Narratives",
subtitle:"Deep historical analysis. Power structures. Lost civilizations.",
episodes:"Explore Episodes",
newsletterTitle:"Join the Inner Circle",
newsletterText:"Receive strategic historical insights directly to your inbox.",
subscribe:"Subscribe",
featuredTitle:"Featured Analysis",
featuredArticle:"The Deep Political Structure of Ancient Egypt",
featuredText:"A professional breakdown of governance, power hierarchy, economic control, and religious authority in ancient Egypt.",
premiumTitle:"Unlock Premium Historical Intelligence",
premiumText:"Access exclusive research reports and deep strategic breakdowns.",
support:"Support The Project",
aboutTitle:"About Hidden Narratives",
aboutText:"An independent research platform dedicated to uncovering forgotten historical structures and power dynamics through cinematic storytelling."
},

ar:{
title:"ما وراء الرواية",
subtitle:"تحليل عميق للتاريخ، هياكل القوة، والحضارات المفقودة.",
episodes:"استكشف الحلقات",
newsletterTitle:"انضم إلى الدائرة الخاصة",
newsletterText:"احصل على تحليلات تاريخية عميقة مباشرة إلى بريدك الإلكتروني.",
subscribe:"اشترك",
featuredTitle:"تحليل مميز",
featuredArticle:"البنية السياسية العميقة لمصر القديمة",
featuredText:"تحليل احترافي لنظام الحكم والسلطة والاقتصاد والهيمنة الدينية في مصر القديمة.",
premiumTitle:"افتح الوصول للتحليل التاريخي المتقدم",
premiumText:"احصل على تقارير بحثية حصرية وتحليلات استراتيجية عميقة.",
support:"ادعم المشروع",
aboutTitle:"حول ما وراء الرواية",
aboutText:"منصة بحثية مستقلة تهدف إلى كشف الهياكل الخفية للتاريخ والحضارات من خلال سرد وثائقي عميق."
}

}

const t = content[lang]

return (

<>

{/* HERO */}

<section className="hero">

<div className="hero-overlay"></div>

<div className="hero-content">

<h1 className="hero-title">
{t.title}
</h1>

<p className="hero-subtitle">
{t.subtitle}
</p>

<Link href="/episodes" className="hero-btn">
{t.episodes}
</Link>

<div style={{marginTop:"25px"}}>

<button
onClick={()=>setLang(lang==="en"?"ar":"en")}
style={{
padding:"8px 16px",
background:"#b08d57",
border:"none",
borderRadius:"6px",
cursor:"pointer",
fontWeight:"bold"
}}
>
{lang==="en"?"العربية":"English"}
</button>

</div>

</div>

</section>

{/* NEWSLETTER */}

<section className="newsletter">

<h2>{t.newsletterTitle}</h2>

<p>{t.newsletterText}</p>

<form
action="https://YOUR_MAILCHIMP_URL"
method="post"
target="_blank"
className="newsletter-form"
>

<input
type="email"
name="EMAIL"
placeholder="Your email address"
required
/>

<button type="submit">
{t.subscribe}
</button>

</form>

</section>

{/* FEATURED */}

<section className="featured">

<h2>{t.featuredTitle}</h2>

<div className="featured-card">

<div className="featured-text">

<h3>{t.featuredArticle}</h3>

<p>
{t.featuredText}
</p>

<Link href="/episodes/deep-power-ancient-egypt-en">
Read Full Analysis →
</Link>

</div>

</div>

</section>

{/* PREMIUM */}

<section className="premium-cta">

<h2>{t.premiumTitle}</h2>

<p>{t.premiumText}</p>

<a
href="https://buymeacoffee.com/YOUR_LINK"
target="_blank"
className="premium-btn"
>
{t.support}
</a>

</section>

{/* ABOUT */}

<section className="about-preview">

<div className="about-image"></div>

<div className="about-text">

<h2>{t.aboutTitle}</h2>

<p>
{t.aboutText}
</p>

<Link href="/about">
Learn More →
</Link>

</div>

</section>

</>

)

  }
