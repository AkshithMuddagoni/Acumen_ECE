/* eslint-disable */
/* eslint-disable @next/next/no-img-element */
'use client';

import { motion } from 'framer-motion';
import { socials } from '../constants';
import { useRouter } from 'next/router';

import styles from '../styles';
import { footerVariants } from '../utils/motion';

const Footer = () => {
  const router = useRouter();
  const isGalleryPage = router.pathname === '/gallery';

  return (
    <motion.footer
      variants={footerVariants}
      initial="hidden"
      whileInView="show"
      className={`${styles.xPaddings} py-8 relative`}
    >
      <div className="footer-gradient" />
      <div className={`${styles.innerWidth} mx-auto flex flex-col gap-8`}>
        <div className="flex items-center justify-center flex-wrap gap-5">
          
          {!isGalleryPage && (
            <a
              href="https://events.studenttribe.in/event/67e63e31e5c536d5ced28d72"
              target="_blank"
              rel="noreferrer"
            >
              {/*<button className="relative p-[2px] bg-gradient-to-r from-[#ff3bff] to-[#5C24FF] rounded-[32px]">*/}
              <button className="relative p-[2px] bg-gradient-to-r from-[#008080] to-[#3A3335] rounded-[32px]">
              {/*<span className="block bg-black px-6 py-4 text-white text-[16px] font-normal rounded-[30px]">*/}
              <span className="block bg-[#000029] px-6 py-4 text-[#F5F5F5] text-[16px] font-normal rounded-[30px]">
                  Register Here
                </span>
              </button>
            </a>
          )}
          
        </div>

        <div className="flex flex-col">
         {/* <div className="mb-[50px] h-[2px] bg-white opacity-10" />*/}
           <div className="mb-[50px] h-[2px] bg-[#008080] opacity-40" />
          <div className="flex items-center justify-between h-50 flex-wrap gap-4">

            <h4 className="w-screen font-extrabold mb-2 text-[24px] text-white">
              ACUMEN ECE
            </h4>
            <div className='mb-5'>
              <dl className='text-white'>
                <dt className='font-bold' key='contact'>Contact:-</dt>
                <dd key='name1'>MD. Armaan Hussian: +91-9550591228 </dd>
                {/*<dd key='name2'>Sai Swetha: +91-9182596791 </dd>*/}
              </dl>

            </div>
            <div className='flex-col mb-5'>
              <div className='flex flex-row justify-center align-middle items-center gap-3'>
                <p className='text-white '><span className='font-bold'>Address:-</span> Vasavi College of Engineering, Ibrahim Bagh, <br />Hyderabad, Telangana 500031</p>
                <div className="">
                  <a href="https://maps.app.goo.gl/3mLZbXydNwfadCDU6" target="_blank" rel="noopener noreferrer" className='cursor-pointer'>
                    <img src="/maps.png" alt="maps" className="object-contain cursor-pointer w-[40px] h-[100px] " />
                  </a>
                </div>


              </div>
            </div>

            <div className="flex gap-4">
              {socials.map((social) => (
                <a href={social.url} target='_blank' rel='noreferrer' key={social.name}>
                  <img
                    src={social.imgUrl}
                    alt={social.name}
                    className="w-[44px] h-[44px] object-contain cursor-pointer"
                  />
                  <label className='text-white'>{social.name}</label>
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
