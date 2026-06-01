import type { Metadata } from "next";
import { Montserrat, Permanent_Marker } from "next/font/google";
import localFont from "next/font/local";
import "./globals.css";

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
        url: "https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=1200&h=630",
        width: 1200,
        height: 630,
        alt: "Ryzr Exchange Aviation Community",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ryzr Exchange | Your Aviation Career Starts Here",
    description: "Real training. Real opportunities. A global community for Gen Z dreamers.",
    images: ["https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&q=80&w=1200&h=630"],
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
