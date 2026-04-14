/* eslint-disable @next/next/no-img-element */
import React, { useState, useMemo, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { MenuIcon, XIcon } from "@heroicons/react/outline";
import Router from "next/router";
import { NotchNav } from "./ui/notch-nav";

const Navbar = ({ exploreRef }) => {
  const [nav, setNav] = useState(false);
  const [socialOpen, setSocialOpen] = useState(false);
  const socialRef = useRef(null);
  const router = useRouter();
  
  const handleClick = () => setNav(!nav);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (socialRef.current && !socialRef.current.contains(event.target)) {
        setSocialOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

        {/* ✅ Social Dropdown - Right side (desktop only) */}
        <div className="hidden md:flex flex-shrink-0 relative" ref={socialRef}>
          <button
            onClick={() => setSocialOpen(!socialOpen)}
            className="flex items-center gap-2 px-4 py-2 text-white hover:text-[#00ffaa] transition-colors relative group"
            title="Follow us on social media"
          >
            <span className="text-xl">🔗</span>
            <span className="text-sm font-medium">Social</span>
            <span className={`transition-transform ${socialOpen ? 'rotate-180' : ''}`}>▼</span>
          </button>

          {/* Social Dropdown Menu */}
          {socialOpen && (
            <div className="absolute top-full right-0 mt-2 bg-gradient-to-b from-[#1a1a3d] to-[#0f0f25] border border-[#00ffaa]/40 rounded-lg shadow-lg z-50 min-w-[180px] overflow-hidden">
              <a
                href="https://www.linkedin.com/company/acumen-ece-vce"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#00ffaa]/20 transition-colors border-b border-[#00ffaa]/20 font-medium"
              >
                <span className="text-lg">💼</span>
                <span>LinkedIn</span>
              </a>
              <a
                href="https://www.instagram.com/acumen.ece?igsh=OHVpNWdtMGlpbmtw"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#00ffaa]/20 transition-colors font-medium"
              >
                <img src="/instagram.png" alt="Instagram" className="w-6 h-6" />
                <span>Instagram</span>
              </a>
            </div>
          )}
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
          className="px-4 py-3 text-white text-left hover:bg-[#00ffaa]/10 transition-colors border-b border-[#00ffaa]/10 font-medium"
          onClick={() => {
            Router.push("/gallery");
            setNav(false);
          }}
        >
          📸 Gallery
        </button>
        <div className="border-t border-[#00ffaa]/20">
          <a
            href="https://www.linkedin.com/company/acumen-ece-vce"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#00ffaa]/10 transition-colors border-b border-[#00ffaa]/10 font-medium"
          >
            <span className="text-lg">💼</span>
            <span>LinkedIn</span>
          </a>
          <a
            href="https://www.instagram.com/acumen.ece?igsh=OHVpNWdtMGlpbmtw"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 px-4 py-3 text-white hover:bg-[#00ffaa]/10 transition-colors font-medium"
          >
            <img src="/instagram.png" alt="Instagram" className="w-6 h-6" />
            <span>Instagram</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
