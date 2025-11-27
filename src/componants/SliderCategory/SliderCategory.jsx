import axios from "axios";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";
import Loading from "../Loading/Loading";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";

export default function CategorySlider() {
  const [categories, setCategories] = useState(null);

  async function getCategories() {
    try {
      const options = {
        url: "https://ecommerce.routemisr.com/api/v1/categories",
        method: "GET",
      };
      const { data } = await axios.request(options);
      setCategories(data.data);
    } catch (error) {
      toast.error("Error loading categories");
    }
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <>
      {categories ? (
        <Swiper
          loop={true}
          spaceBetween={"20px"}
          breakpoints={{
            0: {
              slidesPerView: 1,
            },
            640: {
              slidesPerView: 2,
            },
            768: {
              slidesPerView: 3,
            },
            1024: {
              slidesPerView: 6,
            },
          }}
        >
          {categories.map((category) => (
            <SwiperSlide key={category._id}>
              <Link to={`/SubCategories/${category._id}`}>
                <div className="">
                  <div className="border rounded-lg overflow-hidden shadow hover:shadow-mainColor hover:shadow-lg transition p-2 text-center">
                    <img
                      src={category.image}
                      alt={category.name}
                      className="w-full h-48 object-cover mb-2"
                    />
                    <h2 className="text-mainColorfont-semibold">
                      {category.name}
                    </h2>
                  </div>
                </div>
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      ) : (
        <Loading />
      )}
    </>
  );
}
