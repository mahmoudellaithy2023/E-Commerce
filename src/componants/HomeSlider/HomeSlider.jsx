import React from "react";
import sliderHome1 from "../../assets/images/slider-image-3.jpeg";
import sliderHome2 from "../../assets/images/slider-image-2.jpeg";
import sliderHome3 from "../../assets/images/slider-image-1.jpeg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";

export default function HomeSlider() {
  return (
    <div className="grid grid-cols-12">
      <div className="col-span-8">
        <Swiper
          loop={true}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
        >
          <SwiperSlide>
            <img src={sliderHome1} alt="" className=" h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={sliderHome2} alt="" className=" h-full object-cover" />
          </SwiperSlide>
          <SwiperSlide>
            <img src={sliderHome3} alt="" className=" h-full object-cover" />
          </SwiperSlide>
        </Swiper>
      </div>
      <div className="col-span-4">
        <img src={sliderHome3} alt="" />
        <img src={sliderHome2} alt="" />
      </div>
    </div>
  );
}
