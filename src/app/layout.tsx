import type { Metadata } from "next";
import { Montserrat, Permanent_Marker } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";
import "swiper/css";
import "swiper/css/navigation";

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
});

const permanentMarker = Permanent_Marker({
  variable: "--font-marker",
  weight: "400",
  subsets: ["latin"],
});

const thirdRail = localFont({
  src: "../../public/Third Rail - Demo.ttf",
  variable: "--font-third-rail",
});

export const metadata: Metadata = {
  title: "Ryzr Exchange | Your Aviation Career Starts Here",
  description: "Real training, real opportunities, and a global community for Gen Z aviation dreamers. Join Ryzr Exchange to discover pilot, cabin crew, maintenance, and ground staff careers.",
  keywords: [
    "aviation careers",
    "pilot training",
    "cabin crew career",
    "aircraft maintenance",
    "airport ground staff",
    "aviation community",
    "Gen Z aviation network",
    "aviation academy",
    "Ryzr Exchange",
    "RyzrX"
  ],
  authors: [{ name: "Ryzr Exchange Team" }],
  creator: "Ryzr Exchange",
  publisher: "Ryzr Exchange",
  metadataBase: new URL("https://ryzrexchange.com"),
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/favicon.ico",
  },
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ryzrexchange.com",
    title: "Ryzr Exchange | Your Aviation Career Starts Here",
    description: "Discover training, opportunities, and a premium community for Gen Z aviation dreamers. Takeoff into your aviation career today.",
    siteName: "Ryzr Exchange",
    images: [
      {
        url: "/favicon.ico",
        alt: "Ryzr Exchange",
      },
    ],
  },
  twitter: {
    card: "summary",
    title: "Ryzr Exchange | Your Aviation Career Starts Here",
    description: "Real training. Real opportunities. A global community for Gen Z dreamers.",
    images: ["/favicon.ico"],
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
    <html
      lang="en"
      className={`${montserrat.variable} ${permanentMarker.variable} ${thirdRail.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-background text-foreground selection:bg-primary-light selection:text-primary">
        {children}
      </body>
    </html>
  );
}
