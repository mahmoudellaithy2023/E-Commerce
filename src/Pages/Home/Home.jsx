import React, { useEffect, useState } from "react";
import axios from "axios";
import Loading from "../../componants/Loading/Loading";
import Card from "../../componants/Card/Card";
import HomeSlider from "../../componants/HomeSlider/HomeSlider";
import SliderCategory from "../../componants/SliderCategory/SliderCategory";

export default function Home() {
  const [products, setProducts] = useState(null);

  async function getProduct() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <div className="space-y-8 py-8 container mx-auto">
      <HomeSlider />
      <SliderCategory />

      {products ? (
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4 pt-5">
          {products.map((product) => (
            <Card key={product.id} productInfo={product} />
          ))}
        </div>
      ) : (
        <Loading />
      )}
    </div>
  );
}
