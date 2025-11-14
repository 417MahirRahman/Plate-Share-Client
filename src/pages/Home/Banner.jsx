import React, { useRef } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import styles from "./style.module.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function Banner() {
  const progressCircle = useRef(null);
  const progressContent = useRef(null);

  const onAutoplayTimeLeft = (swiper, time, progress) => {
    if (progressCircle.current) {
      // Animate stroke smoothly
      progressCircle.current.style.strokeDashoffset = `${
        125.6 * (1 - progress)
      }`;
    }
    if (progressContent.current) {
      progressContent.current.textContent = `${Math.ceil(time / 1000)}s`;
    }
  };

  return (
    <div className="relative w-full">
      <Swiper
        spaceBetween={30}
        centeredSlides={true}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        onAutoplayTimeLeft={onAutoplayTimeLeft}
        className="overflow-hidden w-full h-[600px] bg-base-300"
      >
        
          <SwiperSlide>
            <div className="h-full pt-13 md:pt-1">
              <img
                src="https://i.ibb.co.com/Fb12THSc/2.jpg"
                alt=""
                className="h-[400px] md:h-[590px] mx-auto object-cover rounded-xl "
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full pt-13 md:pt-1">
              <img
                src="https://i.ibb.co.com/Zph2rgpL/3.jpg"
                alt=""
                className="h-[400px] md:h-[590px] mx-auto object-cover rounded-xl "
              />
            </div>
          </SwiperSlide>
          <SwiperSlide>
            <div className="h-full pt-13 md:pt-1">
              <img
                src="https://i.ibb.co.com/7tzC43Zs/4.jpg"
                alt=""
                className="h-[400px] md:h-[590px] mx-auto object-cover rounded-xl "
              />
            </div>
          </SwiperSlide>
        

        <div
          className="absolute bottom-5 right-5 w-12 h-12 flex items-center justify-center"
          slot="container-end"
        >
          <svg
            viewBox="0 0 48 48"
            className="w-12 h-12"
            style={{
              fill: "transparent",
              strokeDasharray: 125.6,
              transition: "stroke-dashoffset 0.3s linear",
            }}
            ref={progressCircle}
          >
            <circle
              cx="24"
              cy="24"
              r="20"
              className="stroke-yellow-400 stroke-2"
              style={{
                strokeDashoffset: "125.6",
                transform: "rotate(-90deg)",
                transformOrigin: "center",
                transition: "stroke-dashoffset 0.3s linear",
              }}
            ></circle>
          </svg>
          <div className={styles.autoplay_progress} slot="container-end">
            <svg viewBox="0 0 48 48" ref={progressCircle}>
              <circle cx="24" cy="24" r="20"></circle>
            </svg>
            <span ref={progressContent}></span>
          </div>
        </div>
      </Swiper>
    </div>
  );
}
