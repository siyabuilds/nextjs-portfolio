import "./index.css";
import NavBar from "./components/Navbar";
import { Analytics } from "@vercel/analytics/next";
import Footer from "./components/Footer";
import { SUSE } from "next/font/google";

const suse = SUSE({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800"],
  style: ["normal"],
  variable: "--font-suse",
});

const suseMono = {
  variable: "--font-suse-mono",
};

export const metadata = {
  title: "Siyabonga Lukhele - Full Stack Developer",
  description:
    "Portfolio of Siyabonga Lukhele, a Full Stack Web Developer specializing in React, Next.js, and modern web technologies.",
  icons: {
    icon: "/favicon.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=SUSE:ital,wght@0,100..800;1,100..800&family=SUSE+Mono:wght@400..800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`antialiased font-sans ${suse.variable} ${suseMono.variable}`}
      >
        <NavBar />
        <div className="mt-6">{children}</div>
        <Analytics />
        <Footer />
      </body>
    </html>
  );
}
