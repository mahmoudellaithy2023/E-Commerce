import React, { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Loading from "../../componants/Loading/Loading";
import { CartContext } from "../../Context/Cart.context";
import Card from "../../componants/Card/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Autoplay } from "swiper/modules";
import ReactImageGallery from "react-image-gallery";

export default function Details() {
  const { id } = useParams();
  const { addToCart } = useContext(CartContext);
  const [productDetails, setProductDetails] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);

  async function getProduct() {
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products/${id}`
    );
    setProductDetails(data.data);
  }

  async function getRelated() {
    if (!productDetails) return;
    const { data } = await axios.get(
      `https://ecommerce.routemisr.com/api/v1/products?category[in]=${productDetails.category._id}`
    );
    setRelatedProducts(data.data);
  }

  useEffect(() => {
    getProduct();
  }, [id]);
  useEffect(() => {
    getRelated();
  }, [productDetails]);

  if (!productDetails) return <Loading />;

  return (
    <div className="container mx-auto py-10 space-y-10">
      <div className="grid grid-cols-12 gap-6">
        <div className="col-span-12 md:col-span-4">
          <ReactImageGallery
            showPlayButton={false}
            items={productDetails.images.map((img) => ({
              original: img,
              thumbnail: img,
            }))}
          />
        </div>

        <div className="col-span-12 md:col-span-8 space-y-4">
          <h2 className="text-2xl font-semibold">{productDetails.title}</h2>
          <h3 className="text-mainColor font-semibold">
            {productDetails.category.name}
          </h3>
          <p>{productDetails.description}</p>
          <div className="flex justify-between items-center">
            <h4 className="font-bold">{productDetails.price} EGP</h4>
            <h5 className="text-yellow-400">
              {productDetails.ratingsAverage} ★
            </h5>
          </div>
          <button onClick={() => addToCart(id)} className="btn w-full">
            Add to Cart
          </button>
        </div>
      </div>

      <h2 className="text-mainColor text-2xl font-semibold">
        Related Products
      </h2>
      <Swiper
        spaceBetween={10}
        autoplay={{ delay: 3000, disableOnInteraction: false }}
        modules={[Autoplay]}
        breakpoints={{
          0: { slidesPerView: 1 },
          480: { slidesPerView: 2 },
          768: { slidesPerView: 3 },
          1024: { slidesPerView: 4 },
          1280: { slidesPerView: 6 },
        }}
      >
        {relatedProducts.map((product) => (
          <SwiperSlide key={product.id}>
            <Card productInfo={product} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
