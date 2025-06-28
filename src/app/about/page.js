import AboutSection from "../components/AboutSection";

export const metadata = {
  title: "About - Samson Lukhele",
  description:
    "Learn about Samson Lukhele's journey as an aspiring Full Stack Web Developer, currently advancing his skills at Umuzi Experience Labs.",
};

export default function About() {
  return (
    <div className="bg-black min-h-screen">
      <AboutSection />
    </div>
  );
}
