
import React from 'react';
import { Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import banner1 from '../../../public/banner1.png'
import banner2 from '../../../public/banner2.png'
import banner3 from '../../../public/banner3.png'

import "swiper/css";
import "swiper/css/autoplay";
import "swiper/css/pagination";
import Image from 'next/image';

const Carousel: React.FC = () => {
    return (
        <div className="my-[50px]">
            <Swiper
                className="carouselTwo"
                modules={[Pagination, Autoplay]}
                pagination={{ clickable: true }}
                autoplay={{
                    delay: 2500,
                    disableOnInteraction: false,
                }}
            >
                <SwiperSlide>
                    <Image className='w-full h-[450px]'
                        src={banner1}
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image className='w-full h-[450px]'
                        src={banner2}
                        alt=""
                    />
                </SwiperSlide>
                <SwiperSlide>
                    <Image className='w-full h-[450px]'
                        src={banner3}
                        alt=""
                    />
                </SwiperSlide>
            </Swiper>
        </div>
    );
};

export default Carousel;