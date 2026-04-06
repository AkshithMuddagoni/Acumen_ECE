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
  const isGalleryPage = router.pathname === "/gallery";
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
        className={`${styles.xPaddings} py-8 relative bg-transparent`}
      >
        <div className="footer-gradient" />

        <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
          {/* ✅ REGISTER BUTTON (GLOBAL MODAL) */}
          <div className="flex items-center justify-center">
            {!isGalleryPage && (
              <button
                type="button"
                onClick={handleRegisterClick}
                className="p-[2px] bg-gradient-to-r from-[#008080] to-[#3A3335] rounded-[32px] hover:scale-105 active:scale-95 transition cursor-pointer"
              >
                <span className="block bg-[#000029] px-6 py-4 text-[#F5F5F5] rounded-[30px] pointer-events-none">
                  Register Here
                </span>
              </button>
            )}
          </div>

          {/* ===== CONTENT ===== */}
          <div className="flex flex-col">
            {/* Divider */}
            <div className="mb-[50px] h-[2px] bg-[#008080] opacity-40" />

            <div className="flex items-center justify-between flex-wrap gap-6">
              {/* Title */}
              <h4 className="w-full font-extrabold text-[24px] text-[#F5F5F5]">
                ACUMEN ECE
              </h4>

              {/* Contact */}
              <div>
                <dl className="text-[#F5F5F5]">
                  <dt className="font-bold">Contact:-</dt>
                  <dd>MD. Armaan Hussian: +91-9550591228</dd>
                </dl>
              </div>

              {/* Address */}
              <div className="flex items-center gap-3">
                <p className="text-[#F5F5F5]">
                  <span className="font-bold">Address:-</span>
                  <br />
                  Vasavi College of Engineering, Ibrahim Bagh,
                  <br />
                  Hyderabad, Telangana 500031
                </p>

                <a
                  href="https://maps.app.goo.gl/3mLZbXydNwfadCDU6"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    src="/maps.png"
                    alt="maps"
                    className="w-[40px] h-[40px]"
                  />
                </a>
              </div>

              {/* Socials */}
              <div className="flex gap-4">
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
                      className="w-[44px] h-[44px]"
                    />
                    <span className="text-[#F5F5F5] text-sm">
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
            <a href="https://forms.gle/YOUR_TECH_FORM" target="_ blank">
              <button className="w-full mb-4 p-3 rounded-lg bg-gradient-to-r from-[#008080] to-[#3A3335] text-white">
                Technical Events
              </button>
            </a>

            {/* Non Technical */}
            <a href="https://forms.gle/YOUR_NONTECH_FORM" target="_ blank">
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
