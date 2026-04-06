/* eslint-disable */
/* eslint-disable @next/next/no-img-element */
"use client";

import { motion } from "framer-motion";
import { socials } from "../constants";
import { useRouter } from "next/router";

import styles from "../styles";
import { footerVariants } from "../utils/motion";

const Footer = ({ setOpen }) => {
  const router = useRouter();
  const isGalleryPage = router.pathname === "/gallery";

  return (
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
              onClick={() => setOpen(true)}
              className="p-[2px] bg-gradient-to-r from-[#008080] to-[#3A3335] rounded-[32px] hover:scale-105 transition"
            >
              <span className="block bg-[#000029] px-6 py-4 text-[#F5F5F5] rounded-[30px]">
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
                <img src="/maps.png" alt="maps" className="w-[40px] h-[40px]" />
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
                  <span className="text-[#F5F5F5] text-sm">{social.name}</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </motion.footer>
  );
};

export default Footer;
