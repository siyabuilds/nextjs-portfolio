import React from "react";
import Link from "next/link";

const About = () => {
  return (
    <section>
      <section className="p-8 text-white">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg mt-12 md:w-4/5 md:mx-auto">
          <h2 className="text-4xl font-bold mb-4">About Me</h2>
          <p className="text-xl mb-4 text-white">
            Hi there! I'm Samson, a passionate web developer with a deep love
            for software development. I specialize in JavaScript and full-stack
            development, always eager to learn and create innovative solutions.
            I enjoy building seamless, user-friendly applications and exploring
            how technology can drive meaningful change. Outside of coding, I
            love playing basketball and diving into online trading—both of which
            sharpen my strategic thinking and adaptability. I'm always open to
            new opportunities and collaborations, so let’s connect and create
            something great!
          </p>
          <div className="font-mono flex flex-wrap gap-4 justify-center py-4">
            <span className="bg-green-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform duration-300 hover:bg-green-700 hover:-translate-y-1">
              <i className="fa fa-globe mr-2"></i>Web Developer
            </span>
            <span className="bg-orange-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform duration-300 hover:bg-orange-700 hover:-translate-y-1">
              <i className="fab fa-linux mr-2" aria-hidden="true"></i>
              Linux Engineer
            </span>
            <span className="bg-blue-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform duration-300 hover:bg-blue-700 hover:-translate-y-1">
              <i className="fa fa-code-fork mr-2"></i>DevOps Engineer
            </span>
            <span className="bg-purple-500 text-white font-bold py-2 px-4 rounded-lg shadow-lg transition-transform duration-300 hover:bg-purple-700 hover:-translate-y-1">
              <i className="fa fa-graduation-cap mr-2" aria-hidden="true"></i>
              Continuous Learner
            </span>
          </div>
        </div>
      </section>
      <section className="p-8 text-white">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg mt-12 md:w-4/5 md:mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Skills</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Frontend */}
            <div className="bg-green-600 rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold flex items-center">
                <i className="fas fa-code mr-2"></i> Frontend
              </h3>
              <div className="mt-3 space-y-3">
                <div className="bg-green-500 p-3 rounded-lg text-lg flex items-center hover:bg-green-400 transition-colors duration-300">
                  <i className="fab fa-js-square mr-2"></i> JavaScript
                </div>
                <div className="bg-green-500 p-3 rounded-lg text-lg flex items-center hover:bg-green-400 transition-colors duration-300">
                  <i className="fab fa-react mr-2"></i> React
                </div>
                <div className="bg-green-500 p-3 rounded-lg text-lg flex items-center hover:bg-green-400 transition-colors duration-300">
                  <i className="fab fa-html5 mr-2"></i> HTML & CSS
                </div>
              </div>
            </div>

            {/* Backend */}
            <div className="bg-orange-600 rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold flex items-center">
                <i className="fas fa-server mr-2"></i> Backend
              </h3>
              <div className="mt-3 space-y-3">
                <div className="bg-orange-500 p-3 rounded-lg text-lg flex items-center hover:bg-orange-400 transition-colors duration-300">
                  <i className="fab fa-node-js mr-2"></i> Node.js
                </div>
                <div className="bg-orange-500 p-3 rounded-lg text-lg flex items-center hover:bg-orange-400 transition-colors duration-300">
                  <i className="fas fa-code mr-2"></i> APIs
                </div>
                <div className="bg-orange-500 p-3 rounded-lg text-lg flex items-center hover:bg-orange-400 transition-colors duration-300">
                  <i className="fas fa-database mr-2"></i> SQL
                </div>
              </div>
            </div>

            {/* DevOps */}
            <div className="bg-blue-600 rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold flex items-center">
                <i className="fas fa-tools mr-2"></i> DevOps
              </h3>
              <div className="mt-3 space-y-3">
                <div className="bg-blue-500 p-3 rounded-lg text-lg flex items-center hover:bg-blue-400 transition-colors duration-300">
                  <i className="fab fa-docker mr-2"></i> Docker
                </div>
                <div className="bg-blue-500 p-3 rounded-lg text-lg flex items-center hover:bg-blue-400 transition-colors duration-300">
                  <i className="fas fa-sync-alt mr-2"></i> CI/CD
                </div>
                <div className="bg-blue-500 p-3 rounded-lg text-lg flex items-center hover:bg-blue-400 transition-colors duration-300">
                  <i className="fab fa-git mr-2"></i> Git
                </div>
              </div>
            </div>

            {/* Methodologies */}
            <div className="bg-purple-600 rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold flex items-center">
                <i className="fas fa-lightbulb mr-2"></i> Methodologies
              </h3>
              <div className="mt-3 space-y-3">
                <div className="bg-purple-500 p-3 rounded-lg text-lg flex items-center hover:bg-purple-400 transition-colors duration-300">
                  <i className="fas fa-tasks mr-2"></i> Agile
                </div>
                <div className="bg-purple-500 p-3 rounded-lg text-lg flex items-center hover:bg-purple-400 transition-colors duration-300">
                  <i className="fas fa-users mr-2"></i> Scrum
                </div>
                <div className="bg-purple-500 p-3 rounded-lg text-lg flex items-center hover:bg-purple-400 transition-colors duration-300">
                  <i className="fas fa-columns mr-2"></i> Kanban
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="p-8 text-white">
        <div className="bg-gray-700 p-6 rounded-lg shadow-lg mt-12 md:w-4/5 md:mx-auto">
          <h2 className="text-4xl font-bold mb-4 text-center">Education</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Matric Card */}
            <div className="bg-blue-600 rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold flex items-center">
                <i className="fas fa-graduation-cap mr-2"></i> Matric
                Certificate
              </h3>
              <p className="mt-2 text-lg">Graduated: 2021</p>
              <p className="mt-2">Subjects:</p>
              <p className="mt-1 bg-blue-500 p-2 rounded-lg hover:bg-blue-400 transition-colors duration-300">
                &gt;&gt; Physical Sciences
              </p>
              <p className="mt-1 bg-blue-500 p-2 rounded-lg hover:bg-blue-400 transition-colors duration-300">
                &gt;&gt; Mathematics
              </p>
              <p className="mt-1 bg-blue-500 p-2 rounded-lg hover:bg-blue-400 transition-colors duration-300">
                &gt;&gt; Life Sciences
              </p>
              <p className="mt-1 bg-blue-500 p-2 rounded-lg hover:bg-blue-400 transition-colors duration-300">
                &gt;&gt; Geography
              </p>
              <p className="mt-2">Achieved a diploma aggregate.</p>
            </div>

            {/* Umuzi Further Upskilling Card */}
            <div className="bg-green-600 rounded-lg shadow-lg p-6 hover:scale-105 transition-transform duration-300">
              <h3 className="text-2xl font-bold flex items-center">
                <i className="fas fa-graduation-cap mr-2"></i> Umuzi Further
                Upskilling
              </h3>
              <p className="mt-2 text-lg">June 11, 2024 - December 2024</p>
              <p className="mt-2">Focused on:</p>
              <p className="mt-1 bg-green-500 p-2 rounded-lg hover:bg-green-400 transition-colors duration-300">
                &gt;&gt; Problem Solving
              </p>
              <p className="mt-1 bg-green-500 p-2 rounded-lg hover:bg-green-400 transition-colors duration-300">
                &gt;&gt; Web Development Fundamentals
              </p>
              <p className="mt-1 bg-green-500 p-2 rounded-lg hover:bg-green-400 transition-colors duration-300">
                &gt;&gt; Behavior Driven Development (BDD)
              </p>
            </div>
          </div>
        </div>
      </section>
      <section className="mb-2 mt-8 text-center">
        <p className="text-xl mb-4">
          Want to know more about me? Feel free to explore my projects or get in
          touch!
        </p>
        <div className="mt-6">
          <Link
            href="/projects"
            className="font-mono inline-block bg-gradient-to-r from-blue-500 to-blue-400 text-white py-3 px-6 rounded-lg hover:from-blue-400 hover:to-blue-500 transition-all duration-300 mr-4 text-lg"
          >
            Projects
          </Link>
          <Link
            href="/contact"
            className="font-mono inline-block border border-light-blue text-light-blue py-3 px-6 rounded-lg hover:bg-light-blue hover:text-white transition duration-300 text-lg"
          >
            Contact
          </Link>
        </div>
      </section>
    </section>
  );
};

export default About;
