import "./index.css";
import NavBar from "./components/Navbar";
import Footer from "./components/Footer";

export const metadata = {
  title: "Samson Lukhele - Full Stack Developer",
  description:
    "Portfolio of Samson Lukhele, a Full Stack Web Developer specializing in React, Next.js, and modern web technologies.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=IBM+Plex+Mono:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;1,100;1,200;1,300;1,400;1,500;1,600;1,700&family=IBM+Plex+Sans:ital,wght@0,100..700;1,100..700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased font-sans">
        <NavBar />
        <div className="mt-6">{children}</div>
        <Footer />
      </body>
    </html>
  );
}
