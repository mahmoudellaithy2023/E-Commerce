import axios from "axios";
import { useEffect, useState } from "react";

import toast from "react-hot-toast";
import Card from "../../componants/Card/Card";
import Loading from "../../componants/Loading/Loading";

export default function Products() {
  const [products, setProducts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  async function getProducts() {
    try {
      const option = {
        url: "https://ecommerce.routemisr.com/api/v1/products",
        method: "GET",
      };
      const { data } = await axios.request(option);
      setProducts(data.data);
    } catch (err) {
      setError("Failed to load products");
      toast.error("Error loading products");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <>
          <div className="container">
            <h1 className="text-3xl font-bold text-mainColor m-4">
              All Products
            </h1>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
            {products.map((product) => (
              <Card key={product.id} productInfo={product} />
            ))}
          </div>
        </>
      )}
    </>
  );
}
