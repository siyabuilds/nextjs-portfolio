import AboutSection from "../components/AboutSection";

export const metadata = {
  title: "About - Siyabonga Lukhele",
  description:
    "Learn about Siyabonga Lukhele's journey as an aspiring Full Stack Web Developer, currently advancing his skills at Umuzi Experience Labs.",
};

export default function About() {
  return (
    <div className="bg-black min-h-screen">
      <AboutSection />
    </div>
  );
}
