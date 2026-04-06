/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useRouter } from "next/router";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Router from "next/router";

const Navbar = ({ exploreRef }) => {
  const [nav, setNav] = useState(false);
  const handleClick = () => setNav(!nav);
  const router = useRouter();
  const isGalleryPage = router.pathname === "/gallery";

  const handleScrollToExplore = () => {
    if (router.pathname === "/") {
      exploreRef?.current?.scrollIntoView({ behavior: "smooth" });
    } else {
      router.push("/").then(() => {
        setTimeout(() => {
          document
            .getElementById("explore-section")
            ?.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 500);
      });
    }
  };

  return (
    <div className="w-screen h-[80px] z-50 navbar-gradient fixed drop-shadow-lg">
      <div className="px-2 flex justify-between items-center w-full h-full">
        {/* ✅ Show VCE Logo only on larger screens */}
        <div className="hidden md:block">
          <a
            href="https://vce.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <img
              src="/logo_vce.png"
              alt="VCE Logo"
              className="w-[100px] h-[80px] object-contain"
            />
          </a>
        </div>

        <ul className="hidden md:flex gap-2 cursor-pointer mx-11">
          <li className="text-center flex flex-col justify-center">
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 text-sm font-medium text-white rounded-lg group"
              onClick={() => Router.push("/")}
            >
              <span className="px-5 py-2.5 rounded-md">Home</span>
            </button>
          </li>
          <li className="text-center flex flex-col justify-center">
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 text-sm font-medium text-white rounded-lg group"
              onClick={handleScrollToExplore}
            >
              <span className="px-5 py-2.5 rounded-md">Events</span>
            </button>
          </li>
          <li className="text-center flex flex-col justify-center">
            <button
              className="relative inline-flex items-center justify-center p-0.5 mb-2 text-sm font-medium text-white rounded-lg group"
              onClick={() => Router.push("/core-team")}
            >
              <span className="px-5 py-2.5 rounded-md">Core Team</span>
            </button>
          </li>
          {!isGalleryPage && (
            <li className="text-center flex flex-col justify-center">
              <button
                className="relative inline-flex items-center justify-center p-0.5 mb-2 text-sm font-medium text-white rounded-lg group"
                onClick={() => Router.push("/gallery")}
              >
                <span className="px-5 py-2.5 rounded-md">Gallery</span>
              </button>
            </li>
          )}
        </ul>

        {/* ✅ Acumen Logo - Always Visible */}
        <div className="cursor-pointer" onClick={() => Router.push("/")}>
          <img
            src="/logo_acumen.png"
            alt="Acumen Logo"
            className="w-[100px] h-[80px] object-contain"
          />
        </div>

        <div className="md:hidden mr-4 bg-indigo-600" onClick={handleClick}>
          {!nav ? <MenuIcon className="w-5" /> : <XIcon className="w-5" />}
        </div>
      </div>

      <ul className={!nav ? "hidden" : "absolute bg-black w-full px-8"}>
        <li
          className="border-b-2 bg-black border-black text-white w-full cursor-pointer py-2"
          onClick={() => Router.push("/")}
        >
          Home
        </li>
        <li
          className="border-b-2 bg-black border-black text-white w-full cursor-pointer py-2"
          onClick={handleScrollToExplore}
        >
          Events
        </li>
        <li
          className="border-b-2 bg-black border-black text-white w-full cursor-pointer py-2"
          onClick={() => Router.push("/core-team")}
        >
          Core Team
        </li>
        {!isGalleryPage && (
          <li
            className="border-b-2 bg-black border-black text-white w-full cursor-pointer py-2"
            onClick={() => Router.push("/gallery")}
          >
            Gallery
          </li>
        )}
      </ul>
    </div>
  );
};

export default Navbar;
