import AboutSection from "../components/AboutSection";
import QuoteSection from "../components/QuoteSection";

export const metadata = {
  title: "About - Siyabonga Lukhele",
  description:
    "Learn about Siyabonga Lukhele's journey as an aspiring Full Stack Web Developer, currently advancing his skills at Umuzi Experience Labs.",
};

export default function About() {
  return (
    <div className="bg-black min-h-screen">
      <AboutSection />
      <div className="px-6 md:px-16 pb-16">
        <QuoteSection />
      </div>
    </div>
  );
}
