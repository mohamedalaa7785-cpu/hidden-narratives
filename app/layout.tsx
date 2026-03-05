import "./globals.css"
import type { Metadata } from "next"
import Link from "next/link"
import Image from "next/image"
import Script from "next/script"

export const metadata: Metadata = {

metadataBase: new URL("https://mohamedalaa7785-cpu-hidden-narratives-2f5g4sdqp-hamo-projects.vercel.app"),

title:{
default:"Hidden Narratives",
template:"%s | Hidden Narratives"
},

description:"Deep historical analysis, ancient civilizations, lost empires, and hidden stories behind history.",

keywords:[
"history",
"ancient civilizations",
"ancient egypt",
"hidden narratives",
"dark history",
"documentary history",
"historical analysis"
],

authors:[{name:"Mohamed Alaa"}],

openGraph:{
title:"Hidden Narratives",
description:"Deep historical storytelling platform",
type:"website",
locale:"en_US",
siteName:"Hidden Narratives",
url:"https://mohamedalaa7785-cpu-hidden-narratives-2f5g4sdqp-hamo-projects.vercel.app",
images:[
{
url:"/logo.jpg",
width:1200,
height:630,
alt:"Hidden Narratives"
}
]
},

twitter:{
card:"summary_large_image",
title:"Hidden Narratives",
description:"Deep historical storytelling platform",
images:["/logo.jpg"]
},

robots:{
index:true,
follow:true
}

}

export default function RootLayout({
children
}:{children:React.ReactNode}){

return(

<html lang="en">

<head>

<meta name="viewport" content="width=device-width, initial-scale=1" />

<link rel="preconnect" href="https://fonts.googleapis.com"/>
<link rel="preconnect" href="https://www.googletagmanager.com"/>

{/* Google AdSense */}

<Script
async
strategy="afterInteractive"
src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2457467624248791"
crossOrigin="anonymous"
/>

{/* Google Analytics */}

<Script
async
src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX"
/>

<Script id="google-analytics" strategy="afterInteractive">

{`
window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-XXXXXXXXXX');
`}

</Script>

{/* Structured Data */}

<Script
id="structured-data"
type="application/ld+json"
strategy="afterInteractive"
>

{`
{
"@context":"https://schema.org",
"@type":"WebSite",
"name":"Hidden Narratives",
"url":"https://mohamedalaa7785-cpu-hidden-narratives-2f5g4sdqp-hamo-projects.vercel.app",
"publisher":{
"@type":"Organization",
"name":"Hidden Narratives",
"logo":{
"@type":"ImageObject",
"url":"https://mohamedalaa7785-cpu-hidden-narratives-2f5g4sdqp-hamo-projects.vercel.app/logo.jpg"
}
}
}
`}

</Script>

</head>

<body>

{/* NAVBAR */}

<header className="navbar">

<div className="nav-container">

<Link href="/" className="logo">

<Image
src="/logo.jpg"
alt="Hidden Narratives"
width={40}
height={40}
priority
/>

<span>Hidden Narratives</span>

</Link>

<nav className="nav-links">

<Link href="/">Home</Link>

<Link href="/episodes">Episodes</Link>

<Link href="/videos">Videos</Link>

<Link href="/about">About</Link>

<Link href="/contact">Contact</Link>

<a
href="https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow"
target="_blank"
rel="noopener noreferrer"
className="social-btn youtube"
>

YouTube

</a>

<a
href="https://www.facebook.com/share/182DKYKmki/"
target="_blank"
rel="noopener noreferrer"
className="social-btn facebook"
>

Facebook

</a>

<a
href="https://www.linkedin.com/in/muhammed-alaa-0169b3385"
target="_blank"
rel="noopener noreferrer"
className="social-btn linkedin"
>

LinkedIn

</a>

</nav>

</div>

</header>

{/* MAIN */}

<main className="main-content">

{children}

</main>

{/* WHATSAPP FLOAT */}

<a
href="https://wa.me/201210708572"
target="_blank"
rel="noopener noreferrer"
className="whatsapp-btn"
>

WhatsApp

</a>

{/* FOOTER */}

<footer className="footer">

<div className="footer-links">

<Link href="/privacy">Privacy</Link>

<Link href="/terms">Terms</Link>

<Link href="/disclaimer">Disclaimer</Link>

</div>

<div className="footer-social">

<a
href="https://www.youtube.com/channel/UCIq_kU6XE1WuEmQXKaGF6ow"
target="_blank"
rel="noopener noreferrer"
>

YouTube

</a>

<a
href="https://www.facebook.com/share/182DKYKmki/"
target="_blank"
rel="noopener noreferrer"
>

Facebook

</a>

<a
href="https://wa.me/201210708572"
target="_blank"
rel="noopener noreferrer"
>

WhatsApp

</a>

</div>

<p>© {new Date().getFullYear()} Hidden Narratives</p>

</footer>

</body>

</html>

)

  }
