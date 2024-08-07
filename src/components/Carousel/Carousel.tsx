'use client'
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import { useEffect, useState } from "react";

// Define the interface for the data
interface DataElement {
  title: string;
  description: string;
  category: string;
  // Add other properties if needed
}

const Carousel = () => {

  const [data, setData] = useState<DataElement[] | null>(null)

  const FEATURED_POST = process.env.FEATURED_POST

  const fetchData = async () => {
    const response = await fetch("https://gohire-back-production.up.railway.app/publication/premium")
    const data: DataElement[] = await response.json()
    setData(data)
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="mb-[100px] relative">
      <Swiper
        modules={[Autoplay, Navigation]}
        className="swiper-container"
        spaceBetween={30}
        slidesPerView={3}
        autoplay={{ delay: 2000, pauseOnMouseEnter: true }}
        onSlideChange={() => console.log("slide change")}
        navigation={{
          nextEl: ".swiper-button-next",
          prevEl: ".swiper-button-prev",
        }}
      >
        {data && data.map((element: DataElement, index: number) => (
          <SwiperSlide key={index} className="bg-[ghostwhite] rounded-lg border border-gray-100 h-full">
            <div className="relative block overflow-hidden h-full cursor-pointer rounded-lg">
              <span className="absolute inset-x-0 bottom-0 h-2 bg-gradient-to-r from-green-300 via-blue-500 to-purple-600"></span>
              <div className="sm:flex sm:flex-col sm:justify-between sm:gap-4 px-7 pt-5">
                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-bold text-black sm:text-xl">{element.title}</h3>
                  <div className="bg-[#3C65F5] text-white text-center text-sm px-2 py-2 rounded-xl hover:opacity-80 transition-all duration-300">
                    Apply Now
                  </div>
                </div>
                <div className="flex flex-col text-xs text-gray-500 text-left">
                  Posted a few seconds ago{" "}
                  <span>
                    by <span className="font-bold">Fulano de Tal</span>
                  </span>
                </div>
                <div>
                  <h3 className="text-gray-900 min-h-16 text-left">{element.description}</h3>
                </div>
              </div>
              <div className="border-t border-gray-300 px-4 py-2">
                <h6 className="font-bold text-xs text-[#05264E] text-left">Looking for:</h6>
                <ul className="list-none text-sm text-[#05264E] flex flex-wrap">
                  <li className="border border-slate-300 rounded-lg inline-block my-4 p-1">{element.category}</li>
                </ul>
              </div>
            </div>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
};

export default Carousel;
