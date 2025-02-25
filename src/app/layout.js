import { Geist, Geist_Mono, Inter, Fira_Code, Sans } from "next/font/google";
import "./globals.css";
import Navbar from "./components/NavBar";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const firaCode = Fira_Code({
  variable: "--font-fira",
  subsets: ["latin"],
});

export const metadata = {
  title: "Samson Lukhele's Portfolio",
  description:
    "This is a Next.js Web Dev portfolio showcasing Samson Lukhele's projects",
  keywords: "web development, portfolio, Samson Lukhele, Next.js, React",
  openGraph: {
    title: "Samson Lukhele's Portfolio",
    description:
      "This is a Next.js Web Dev portfolio showcasing Samson Lukhele's projects",
    url: "https://nextjs.markuptitan.site",
    image: "https://github.com/markuptitan.png",
    site_name: "Samson Lukhele's Portfolio",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta property="og:title" content={metadata.openGraph.title} />
        <meta
          property="og:description"
          content={metadata.openGraph.description}
        />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:image" content={metadata.openGraph.image} />
        <meta property="og:site_name" content={metadata.openGraph.site_name} />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} antialiased bg-dark-gray text-white`}
      >
        <Navbar />
        <main className="container mx-auto px-4">{children}</main>
      </body>
    </html>
  );
}
