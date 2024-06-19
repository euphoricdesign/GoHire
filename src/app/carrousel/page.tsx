"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import data from "../../utils/mock-publication.json";
import "swiper/css";
import { useEffect } from "react";
import Image from "next/image";

const page = () => {
  useEffect(() => {
    console.log(data);
  }, []);

  return (
    <Swiper
      modules={[Autoplay]}
      className="border border-red-600 mt-28 h-64"
      spaceBetween={50}
      slidesPerView={2}
      autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
      onSlideChange={() => console.log("slide change")}
      onSwiper={(swiper) => console.log(swiper)}
    >
      {data.map((element, index) => (
        <SwiperSlide key={index} className="border border-blue-700 text-center">
          <div>
            <h1>{element.title}</h1>
            <span>{element.category}</span>
          </div>
          <div>
            {/* <Image alt={element.title} src={element.imgUrl} /> */}
            {/* aca hiria la imagen */}
            <p>{element.description}</p>
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default page;
