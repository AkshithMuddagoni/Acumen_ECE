/* eslint-disable @next/next/no-img-element */
import React, { useState, useMemo } from "react";
import { useRouter } from "next/router";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Router from "next/router";
import { NotchNav } from "./ui/notch-nav";

const Navbar = ({ exploreRef }) => {
  const [nav, setNav] = useState(false);
  const router = useRouter();
  
  const handleClick = () => setNav(!nav);

  const handleScrollToExplore = () => {
    if (router.isReady && router.pathname === "/") {
      // Scroll to explore section on home page
      const exploreSection = document.getElementById("explore-section");
      if (exploreSection) {
        exploreSection.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    } else {
      // Navigate to home page first, then scroll to explore
      router.push("/").then(() => {
        setTimeout(() => {
          const exploreSection = document.getElementById("explore-section");
          if (exploreSection) {
            exploreSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 600);
      });
    }
  };

  // Determine current active nav item
  const getActiveNav = () => {
    if (router.pathname === "/") return "home";
    if (router.pathname === "/core-team") return "team";
    if (router.pathname === "/gallery") return "gallery";
    return "home";
  };

  const navItems = [
    { value: "home", label: "🏠 Home" },
    { value: "events", label: "🎯 Events" },
    { value: "team", label: "👥 Team" },
    { value: "gallery", label: "📸 Gallery" },
  ];

  const handleNavChange = (value) => {
    if (value === "home") Router.push("/");
    else if (value === "events") handleScrollToExplore();
    else if (value === "team") Router.push("/core-team");
    else if (value === "gallery") Router.push("/gallery");
  };

  const activeValue = useMemo(() => getActiveNav(), [router.pathname]);

  return (
    <div className="w-screen h-[80px] z-50 navbar-gradient fixed">
      <div className="px-2 md:px-6 flex justify-between items-center w-full h-full">
        {/* ✅ VCE Logo - Left side (desktop only) */}
        <div className="hidden md:block flex-shrink-0">
          <a
            href="https://vce.ac.in/"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:opacity-80 transition-opacity"
          >
            <img
              src="/logo_vce.png"
              alt="Vasavi College of Engineering"
              className="w-[70px] h-[56px] object-contain"
            />
          </a>
        </div>

        {/* ✅ Notch Nav - Center (desktop only) */}
        <div className="hidden md:flex flex-1 justify-center">
          <NotchNav
            items={navItems}
            value={activeValue}
            onValueChange={handleNavChange}
            ariaLabel="Main Navigation"
            className="scale-90"
          />
        </div>

        {/* ✅ Acumen Eagle Logo - Right side */}
        <div
          className="cursor-pointer flex-shrink-0 hover:opacity-80 transition-opacity"
          onClick={() => Router.push("/")}
        >
          <img
            src="/Glowing-Eagle-Vector-2.svg"
            alt="Acumen"
            className="w-[70px] h-[56px] object-contain"
          />
        </div>

        {/* ✅ Mobile Menu Toggle */}
        <div className="md:hidden ml-4 text-white" onClick={handleClick}>
          {!nav ? <MenuIcon className="w-6 h-6" /> : <XIcon className="w-6 h-6" />}
        </div>
      </div>

      {/* ✅ Mobile Menu */}
      <div
        className={`absolute top-full left-0 right-0 bg-gradient-to-b from-[#1a1a3d] to-[#0f0f25] border-b border-[#00ffaa]/20 z-40 ${
          !nav ? "hidden" : "flex"
        } flex-col`}
      >
        <button
          className="px-4 py-3 text-white text-left hover:bg-[#00ffaa]/10 transition-colors border-b border-[#00ffaa]/10 font-medium"
          onClick={() => {
            Router.push("/");
            setNav(false);
          }}
        >
          🏠 Home
        </button>
        <button
          className="px-4 py-3 text-white text-left hover:bg-[#00ffaa]/10 transition-colors border-b border-[#00ffaa]/10 font-medium"
          onClick={() => {
            handleScrollToExplore();
            setNav(false);
          }}
        >
          🎯 Events
        </button>
        <button
          className="px-4 py-3 text-white text-left hover:bg-[#00ffaa]/10 transition-colors border-b border-[#00ffaa]/10 font-medium"
          onClick={() => {
            Router.push("/core-team");
            setNav(false);
          }}
        >
          👥 Team
        </button>
        <button
          className="px-4 py-3 text-white text-left hover:bg-[#00ffaa]/10 transition-colors font-medium"
          onClick={() => {
            Router.push("/gallery");
            setNav(false);
          }}
        >
          📸 Gallery
        </button>
      </div>
    </div>
  );
};

export default Navbar;
