"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import Typed from "typed.js";

const Hero = () => {
  const el = useRef(null);
  useEffect(() => {
    const options = {
      strings: [
        "Web Developer",
        "Basketball Enthusiast",
        "DevOps Engineer",
        "Learner",
      ],
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
  });
  return (
    <section className="flex flex-col items-center justify-center min-h-screen text-center text-white p-8">
      <h1 className="text-5xl sm:text-6xl font-bold">
        Hi, I am Samson Lukhele.
      </h1>
      <p className="text-xl sm:text-2xl mt-4">
        I'm a{" "}
        <span className="font-mono text-light-blue rounded-md">
          ["
          <span ref={el} />
          "]
        </span>
        .
      </p>
    </section>
  );
};

export default Hero;
