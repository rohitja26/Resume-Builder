import Footer from "@/components/custom/Footer";
import Header from "@/components/custom/Header";
import { UserButton } from "@clerk/clerk-react";
import React from "react";
import { Link } from "react-router-dom";
function HomePage() {
  return (
    <div>
      <Header />
      <section className="bg-gray-900 text-white">
        <div className="mx-auto max-w-screen-xl px-4 py-32 lg:flex lg:h-[88vh] lg:items-center">
          <div className="mx-auto max-w-4xl text-center">
            <h1 className="  bg-clip-text text-3xl font-extrabold text-white sm:text-5xl">
              Create your{" "}
              <span className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Perfect Resume
              </span>{" "}
              <span className="text-2xl my-3 sm:block">
                Create a Resume that Speaks Your Industry’s Language.
              </span>
            </h1>

            <p className="mx-auto mt-4 max-w-xl sm:text-xl/relaxed">
              Let’s Craft Your Industry-Focused{" "}
              <span className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-transparent">
                Resume
              </span>{" "}
              Now!👉
            </p>

            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <Link
                to={"/auth/sign-in"}
                className="block w-full rounded border border-blue-600 bg-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-transparent hover:text-white focus:outline-none focus:ring active:text-opacity-75 sm:w-auto"
                href="#"
              >
                Get Started
              </Link>

              <a
                className="block w-full rounded border border-blue-600 px-12 py-3 text-sm font-medium text-white hover:bg-blue-600 focus:outline-none focus:ring active:bg-blue-500 sm:w-auto"
                href="#"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}

export default HomePage;
