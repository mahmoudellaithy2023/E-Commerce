import { useParams } from "react-router-dom";

import axios from "axios";
import { useContext, useEffect, useState } from "react";
import Loading from "../../componants/Loading/Loading";
import { CartContext } from "../../Context/Cart.context";
import Card from "../../componants/Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import "react-image-gallery/styles/css/image-gallery.css";
import ReactImageGallery from "react-image-gallery";

export default function Details() {
  const { addToCart } = useContext(CartContext);
  const { id } = useParams();
  const [productDetails, setProductDetails] = useState(null);
  const [relatedDetails, setRealtedDetails] = useState();
  async function getSpesficProduct() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products/${id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    setProductDetails(data.data);
    console.log(data.data);
  }
  async function getRelatedDetails() {
    const options = {
      url: `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`,
      method: "GET",
    };
    const { data } = await axios.request(options);
    console.log(data.data);
    setRealtedDetails(data.data);
  }
  useEffect(() => {
    getSpesficProduct();
  }, [id]);
  useEffect(() => {
    if (productDetails) {
      getRelatedDetails();
    }
  }, [productDetails]);

  return (
    <>
      {productDetails == null ? (
        <Loading />
      ) : (
        <>
          <div className="grid grid-cols-12 gap-6 py-10">
            <div className="col-span-4">
              <ReactImageGallery
                showPlayButton={false}
                items={productDetails.images.map((image) => {
                  return { original: image, thumbnail: image };
                })}
              />
            </div>
            <div className=" col-span-8 py-5 space-y-5 mt-20">
              <div>
                <h2 className="text-xl">{productDetails.title}</h2>
                <h2 className="text-xl font-semibold text-mainColor">
                  {productDetails.category.name}
                </h2>
              </div>

              <p>{productDetails.description}</p>
              <div className="flex items-center justify-between">
                <h4>{productDetails.price} Egp</h4>
                <h5>
                  {productDetails.ratingsAverage}
                  <i className="fa-solid fa-star text-yellow-500"></i>
                </h5>
              </div>
              <button
                onClick={() => {
                  addToCart(id);
                }}
                className="btn w-full"
              >
                Add to Cart
              </button>
            </div>
          </div>
          <div>
            <h2 className="text-mainColor text-2xl font-semibold">
              Related product
            </h2>
            <Swiper
              spaceBetween={10}
              autoplay={{
                delay: 3000,
                disableOnInteraction: false,
              }}
              modules={[Autoplay]}
              breakpoints={{
                0: { slidesPerView: 1 },
                480: { slidesPerView: 2 },
                768: { slidesPerView: 3 },
                1024: { slidesPerView: 4 },
                1280: { slidesPerView: 6 },
              }}
            >
              {relatedDetails?.map((product) => (
                <SwiperSlide key={product.id}>
                  <Card productInfo={product} />
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </>
      )}
    </>
  );
}
