'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

import styles from '../styles';
import { exploreWorlds } from '../constants';
import { staggerContainer } from '../utils/motion';
import { ExploreCard, TitleText, TypingText } from '../components';

const Explore = () => {
  const [active, setActive] = useState('world-2');

  return (
   /* <section className={`${styles.paddings} bg-[#000029] h-100vh`} id="explore">*/
      <section className={`${styles.paddings} bg-gradient-to-b from-[#000029] via-[#000029] to-[#3A3335] `} id = "explore">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: false, amount: 0.25 }}
        className={`${styles.innerWidth} mx-auto flex flex-col`}
      >

       {/*<TitleText
          title={<>The Events</>}
         /* textStyles="text-center text-white text-[40px]"*/
          /*className="text-white text-4xl font-bold text-center"
        /> 
        */}
       {/*<h2 className="text-[#F5F5F5] text-4xl font-bold text-center drop-shadow-[0_0_15px_#008080]">*/}
        <h2 className="text-[#F5F5F5] text-4xl font-bold text-center drop-shadow-[0_0_15px_#008080]">
          The Events
        </h2>
        <div className="mt-[50px] flex lg:flex-row flex-col min-h-[70vh] gap-5">
          {exploreWorlds.map((world, index) => (
            <ExploreCard
              key={world.id}
              {...world}
              index={index}
              active={active}
              handleClick={setActive}
            />
          ))}
        </div>
      </motion.div>
     {/* <div className="absolute bottom-0 w-full h-40 bg-gradient-to-b from-transparent to-[#000029]" />*/}
    </section>
  );
};

export default Explore;
