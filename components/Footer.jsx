/* eslint-disable */
/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { socials } from "../constants";
import { useRouter } from "next/router";
import { useState } from "react";

import styles from "../styles";
import { footerVariants } from "../utils/motion";

const Footer = ({ setOpen: parentSetOpen }) => {
  const router = useRouter();
  const [localOpen, setLocalOpen] = useState(false);

  // Use parent's setOpen if provided, otherwise use local state
  const effectiveSetOpen = parentSetOpen || setLocalOpen;
  const effectiveOpen = parentSetOpen ? undefined : localOpen;

  const handleRegisterClick = () => {
    if (parentSetOpen) {
      parentSetOpen(true);
    } else {
      setLocalOpen(true);
    }
  };

  const handleCloseModal = () => {
    if (parentSetOpen) {
      parentSetOpen(false);
    } else {
      setLocalOpen(false);
    }
  };

  return (
    <>
      <motion.footer
        variants={footerVariants}
        initial="hidden"
        whileInView="show"
        className={`py-8 md:py-12 px-3 sm:px-4 md:px-6 lg:px-8 relative bg-transparent`}
      >
        <div className="footer-gradient" />

        <div className={`${styles.innerWidth} mx-auto flex flex-col gap-6 md:gap-8`}>
          {/* ✅ REGISTER BUTTON (GLOBAL MODAL) */}
          <div className="flex items-center justify-center">
            <button
              type="button"
              onClick={handleRegisterClick}
              className="p-[2px] bg-gradient-to-r from-[#008080] to-[#3A3335] rounded-[32px] hover:scale-105 active:scale-95 transition cursor-pointer"
            >
              <span className="block bg-[#000029] px-4 sm:px-6 py-3 sm:py-4 text-sm sm:text-base md:text-lg text-[#F5F5F5] rounded-[30px] pointer-events-none">
                Register Here
              </span>
            </button>
          </div>

          {/* ===== CONTENT ===== */}
          <div className="flex flex-col">
            {/* Divider */}
            <div className="mb-6 md:mb-12 h-[2px] bg-[#008080] opacity-40" />

            <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 flex-wrap">
              {/* Title */}
              <h4 className="w-full font-extrabold text-xl sm:text-2xl md:text-[24px] text-[#F5F5F5]">
                ACUMEN ECE
              </h4>

              {/* Contact */}
              <div>
                <dl className="text-sm sm:text-base text-[#F5F5F5]">
                  <dt className="font-bold">Contact:-</dt>
                  <dd className="whitespace-normal break-words">MD. Armaan Hussian: +91-9550591228</dd>
                </dl>
              </div>

              {/* Address */}
              <div className="flex flex-col md:flex-row gap-2 md:gap-3 items-start md:items-center">
                <p className="text-sm sm:text-base text-[#F5F5F5] leading-relaxed">
                  <span className="font-bold block md:inline md:mr-2">Address:-</span>
                  <span className="block md:inline">Vasavi College of Engineering, Ibrahim Bagh,</span>
                  <span className="block md:inline">Hyderabad, Telangana 500031</span>
                </p>

                <a
                  href="https://maps.app.goo.gl/3mLZbXydNwfadCDU6"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 mt-2 md:mt-0"
                >
                  <img
                    src="/maps.png"
                    alt="maps"
                    className="w-8 sm:w-10 h-8 sm:h-10 md:w-[40px] md:h-[40px]"
                  />
                </a>
              </div>

              {/* Socials */}
              <div className="flex gap-3 sm:gap-4 justify-start md:justify-end w-full md:w-auto">
                {socials.map((social) => (
                  <a
                    href={social.url}
                    target="_blank"
                    rel="noreferrer"
                    key={social.name}
                    className="flex flex-col items-center"
                  >
                    <img
                      src={social.imgUrl}
                      alt={social.name}
                      className="w-8 sm:w-10 h-8 sm:h-10 md:w-[44px] md:h-[44px]"
                    />
                    <span className="text-[#F5F5F5] text-xs sm:text-sm mt-1">
                      {social.name}
                    </span>
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </motion.footer>

      {/* ✅ LOCAL MODAL (when parent doesn't manage state) */}
      {!parentSetOpen && localOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50">
          <div className="bg-[#000029] p-8 rounded-2xl text-center w-[300px] shadow-lg">
            <h2 className="text-white text-xl mb-6">Choose Event Type</h2>

            {/* Technical */}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLSeYCluNgFEkYtMb5uVdfotvmqKduGwDhof92pWDRueX-V_Plw/viewform?usp=header" target="_ blank">
              <button className="w-full mb-4 p-3 rounded-lg bg-gradient-to-r from-[#008080] to-[#3A3335] text-white">
                Technical Events
              </button>
            </a>

            {/* Non Technical */}
            <a href="https://docs.google.com/forms/d/e/1FAIpQLScTDNff49n1LQCitTSIFDPUSABn-FnItnwoSYN8ztqfFeOrbA/viewform?usp=header" target="_ blank">
              <button className="w-full p-3 rounded-lg bg-gradient-to-r from-[#3A3335] to-[#008080] text-white">
                Non-Technical Events
              </button>
            </a>

            {/* Close */}
            <button
              onClick={handleCloseModal}
              className="mt-4 text-gray-400 text-sm"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Footer;
