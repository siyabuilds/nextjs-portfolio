"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import Typed from "typed.js";

const Hero = () => {
  const el = useRef(null);
  useEffect(() => {
    const options = {
      strings: ["Web Developer", "UI/UX Designer", "Learner"],
      typeSpeed: 75,
      backSpeed: 60,
      loop: false,
      showCursor: false,
      contentType: "html",
    };

    const typed = new Typed(el.current, options);
    return () => {
      typed.destroy();
    };
  }, []);

  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen text-center text-white p-8">
      <div className="md:w-1/3 mb-4 md:mb-0">
        <img
          src="https://github.com/markuptitan.png"
          alt="Avatar"
          className="rounded-full w-64 h-64 md:w-48 md:h-48 mx-auto"
        />
      </div>
      <div className="md:w-2/3 mt-4 md:mt-0">
        <h1 className="text-6xl sm:text-4xl font-bold">
          Hi, I am Samson Lukhele.
        </h1>
        <p className="text-2xl mt-4">
          I&#39;m a{" "}
          <span className="font-mono text-light-blue rounded-md text-bold">
            [&quot;
            <span ref={el} />
            &quot;]
          </span>
          .
        </p>
        <div className="mt-6">
          <Link
            href="/about"
            className="font-mono inline-block bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 px-6 rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all duration-300 mr-4 text-lg"
          >
            About
          </Link>
          <Link
            href="/projects"
            className="font-mono inline-block border border-light-blue text-light-blue py-3 px-6 rounded-lg hover:bg-light-blue hover:text-white transition duration-300 text-lg"
          >
            Projects
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
