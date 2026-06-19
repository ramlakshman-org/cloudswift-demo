import type { Metadata } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";

const organizationSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://oncloudswift.com/#organization",
      name: "CloudSwift",
      url: "https://oncloudswift.com",
      logo: {
        "@type": "ImageObject",
        url: "https://oncloudswift.com/seo/icon-512.png",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+91-9071416809",
        contactType: "customer support",
        email: "support@oncloudswift.com",
        areaServed: "IN",
        availableLanguage: ["English", "Hindi"],
      },
      sameAs: [
        "https://www.linkedin.com/company/cloudswift",
      ],
    },
    {
      "@type": "LocalBusiness",
      "@id": "https://oncloudswift.com/#localbusiness",
      name: "CloudSwift",
      image: "https://oncloudswift.com/seo/icon-512.png",
      url: "https://oncloudswift.com",
      telephone: "+91-9071416809",
      email: "support@oncloudswift.com",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Bengaluru",
        addressRegion: "Karnataka",
        addressCountry: "IN",
      },
      geo: {
        "@type": "GeoCoordinates",
        latitude: 12.9716,
        longitude: 77.5946,
      },
      openingHoursSpecification: {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
        opens: "09:00",
        closes: "18:00",
      },
      priceRange: "$$",
    },
    {
      "@type": "WebSite",
      "@id": "https://oncloudswift.com/#website",
      url: "https://oncloudswift.com",
      name: "CloudSwift — Cloud Managed Services & Microsoft Solutions India",
      publisher: { "@id": "https://oncloudswift.com/#organization" },
    },
  ],
};

const plusJakartaSans = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://oncloudswift.com"),
  title: "Cloud Managed Services & Microsoft Solutions India | CloudSwift",
  description:
    "CloudSwift is an ISO 9001-2015 certified cloud and IT managed services company. Microsoft Azure, Dynamics 365, M365, Power BI, and managed cloud — based in Bengaluru & Mumbai.",
  icons: {
    icon: [
      { url: "/seo/icon-192.png", sizes: "192x192", type: "image/png" },
      { url: "/seo/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
    apple: "/seo/apple-touch-icon.png",
  },
  openGraph: {
    title: "Cloud Managed Services & Microsoft Solutions India | CloudSwift",
    description:
      "CloudSwift helps businesses build a secure, cloud-first foundation. Azure migration, M365 deployment, Dynamics 365, Power BI, and 24/7 managed cloud services across India.",
    url: "https://oncloudswift.com",
    siteName: "CloudSwift",
    locale: "en_IN",
    type: "website",
    images: [
      {
        url: "https://oncloudswift.com/opengraph-image",
        width: 1200,
        height: 630,
        alt: "CloudSwift — Cloud Managed Services & Microsoft Solutions India",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Cloud Managed Services & Microsoft Solutions India | CloudSwift",
    description:
      "CloudSwift helps businesses build a secure, cloud-first foundation. Azure migration, M365 deployment, Dynamics 365, Power BI, and 24/7 managed cloud services across India.",
    images: ["https://oncloudswift.com/opengraph-image"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${plusJakartaSans.variable} h-full antialiased`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
        />
      </head>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
