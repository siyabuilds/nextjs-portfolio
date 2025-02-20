"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Typed from "typed.js";

const Hero = () => {
  const el = useRef(null);
  useEffect(() => {
    const options = {
      strings: ["Web Developer", "Linux Admin", "Learner"],
      typeSpeed: 75,
      backSpeed: 60,
      loop: true,
      showCursor: false,
      contentType: "html",
    };

    const typed = new Typed(el.current, options);
    return () => {
      typed.destroy();
    };
  });
  return (
    <section className="flex flex-col md:flex-row items-center justify-center min-h-screen text-center text-white p-8">
      <div className="md:w-1/2 mb-4 md:mb-0">
        <img
          src="https://github.com/markuptitan.png"
          alt="Avatar"
          className="rounded-full w-64 h-64 md:w-48 md:h-48 mx-auto"
        />
      </div>
      <div className="md:w-1/2 mt-4 md:mt-0">
        <h1 className="text-6xl sm:text-4xl font-bold">
          Hi, I am Samson Lukhele.
        </h1>
        <p className="text-2xl mt-4">
          I'm a{" "}
          <span className="font-mono text-light-blue rounded-md text-bold">
            ["
            <span ref={el} />
            "]
          </span>
          .
        </p>
      </div>
    </section>
  );
};

export default Hero;
