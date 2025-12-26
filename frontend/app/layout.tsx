import type React from "react";
import type { Metadata } from "next";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import { Analytics } from "@vercel/analytics/next";
import { Suspense } from "react";
import "./globals.css";
import { ReactQueryProvider } from "@/components/react-query-provider";
import { ThemeProvider } from "@/components/theme-provider";
import Script from "next/script";
import wlogo from "../public/wlogo.png"

export const metadata: Metadata = {
  title: "Webify - Smart Web & Software Solutions",
  description:
    "Transform your digital presence with Webify's expert web development, design, and digital solutions. We build modern, scalable websites that drive results.",
  metadataBase: new URL("https://yourdomain.com"),
  alternates: {
    canonical: "https://yourdomain.com/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://yourdomain.com",
    siteName: "Webify",
    // images: [
    //   {
    //     url: {wlogo},
    //     width: 1200,
    //     height: 630,
    //     alt: "Webify website preview",
    //   },
    // ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Webify - Smart Web & Software Solutions",
    description:
      "We build fast, scalable, SEO-optimized websites that help businesses grow.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
  generator: "Next.js",
  keywords: [
    "web development",
    "SEO",
    "Next.js",
    "Express",
    "Webify",
    "digital solutions",
    "software development",
    "web design",
    "e-commerce",
    "mobile apps",
    "cloud services",
    "UI/UX design",
    "digital marketing",
    "content management",
    "website optimization",
    "custom software",
    "tech solutions",
    "full-stack development",
    "web applications",
    "business growth",
    "online presence",
    "scalable websites",
    "Graphic Design",
    "Branding",
    "Social Media Management",
    "Email Marketing",
    "Video Editing",
    "Consulting Services",],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <ReactQueryProvider>
          <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
            <Suspense fallback={null}>{children}</Suspense>
          </ThemeProvider>
        </ReactQueryProvider>

        {/* Structured data for SEO */}
        <Script
          id="ld-json"
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Webify",
              url: "https://yourdomain.com",
              logo: "https://yourdomain.com/logo.png",
              sameAs: [
                "https://www.linkedin.com/company/webify",
                "https://twitter.com/webify",
              ],
            }),
          }}
        />

        <Analytics />
      </body>
    </html>
  );
}
