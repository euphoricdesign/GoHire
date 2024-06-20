'use client'
import React from "react";
import SearchBar from "../SearchBar/SearchBar";
import imagenHome from "../../../public/location.svg";
import Image from "next/image";
import { useSpring, animated } from "react-spring";
import { useInView } from "react-intersection-observer";

const Home = () => {
  const [ref, inView] = useInView({
    triggerOnce: true,
    rootMargin: "-100px 0px",
  });

  const contentAnimation = useSpring({
    opacity: inView ? 1 : 0,
    y: inView ? 0 : 50,
    config: { mass: 1, tension: 280, friction: 25 },
    delay: 200,
  });

  const imageAnimation = useSpring({
    opacity: inView ? 1 : 0,
    x: inView ? 0 : 100,
    config: { mass: 1, tension: 280, friction: 25 },
    delay: 400,
  });

  return (
    <>
      <div className="md:min-h-screen mobile:px-[30px] xl:px-[124px] md:px-[60px] dark:bg-black">
        <div className="md:flex items-center justify-between">
          <div ref={ref} className="flex flex-col gap-14 xl:mt-[247px] md:mt-[170px] mobile:mt-[200px]">
            <animated.h1
              style={contentAnimation}
              className="xl:text-6xl md:text-[45px] mobile:text-4xl font-bold text-[#05264E] md:w-[500px] dark:text-slate-200 leading-[63px]"
            >
              Your{" "}
              <span className="text-[#3C65F5] relative spanAfter">
                perfect job
              </span>{" "}
              awaits
            </animated.h1>
            <animated.p style={contentAnimation} className="text-[#05264E] font-normal text-[1.3rem] xl:text-2xl dark:text-slate-200">
              25.478 Offers Worldwide
            </animated.p>
            <animated.div style={contentAnimation}>
              <SearchBar />
            </animated.div>
            <animated.p style={contentAnimation} className="text-[#6c757d] text-sm mt-10">
              Don't know where to start?
            </animated.p>
            <animated.div style={contentAnimation}>
              <a
                href=""
                className="inline-block bg-[#f0f8ff] rounded px-4 py-2 text-xs text-[#3C65F5] mr-2 mb-2 transition-colors duration-300 ease-in"
              >
                Sales
              </a>
              
              <a href=""
                className="inline-block bg-[#f0f8ff] rounded px-4 py-2 text-xs text-[#3C65F5] mr-2 mb-2 transition-colors duration-300 ease-in"
              >
                Customer Service
              </a>
              
              <a href=""
                className="inline-block bg-[#f0f8ff] rounded px-4 py-2 text-xs text-[#3C65F5] mr-2 mb-2 transition-colors duration-300 ease-in"
              >
                Accounting
              </a>
            </animated.div>
          </div>
          <animated.div style={imageAnimation}>
            <Image
              className="mobile:hidden md:block w-[400px] md:w-[400px] xl:w-[560px]"
              src={imagenHome}
              alt=""
            />
          </animated.div>
        </div>
      </div>
    </>
  );
};

export default Home;