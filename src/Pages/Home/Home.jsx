import React from "react";

import Loading from "../../componants/Loading/Loading";
import axios from "axios";
import { useEffect } from "react";
import { useState } from "react";
import Card from "../../componants/Card/Card";
import HomeSlider from "../../componants/HomeSlider/HomeSlider";
import SliderCategory from "../../componants/SliderCategory/SliderCategory";

export default function Home() {
  const [products, setProducts] = useState(null);

  async function getProduct() {
    const options = {
      url: "https://ecommerce.routemisr.com/api/v1/products",
      method: "GET",
    };
    const { data } = await axios.request(options);

    setProducts(data.data);
  }
  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="space-y-8 py-8">
      {/* static slide */}

      <HomeSlider />

      {/* category slide     */}
      <div className="">
        <SliderCategory />
      </div>

      {/* card */}
      {products ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6  gap-3 pt-5">
          {products.map((product) => (
            <Card productInfo={product} key={product.id} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
