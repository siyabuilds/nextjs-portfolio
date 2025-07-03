import "./index.css";
import NavBar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import Footer from "./components/Footer";
import { IBM_Plex_Mono, IBM_Plex_Sans } from "next/font/google";

const ibmPlexMono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-mono",
});

const ibmPlexSans = IBM_Plex_Sans({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  variable: "--font-ibm-plex-sans",
});

export const metadata = {
  title: "Samson Lukhele - Full Stack Developer",
  description:
    "Portfolio of Samson Lukhele, a Full Stack Web Developer specializing in React, Next.js, and modern web technologies.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`antialiased font-sans ${ibmPlexMono.variable} ${ibmPlexSans.variable}`}
      >
        <NavBar />
        <div className="mt-6">{children}</div>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
