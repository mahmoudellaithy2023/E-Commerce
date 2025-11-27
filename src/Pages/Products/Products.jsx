import axios from "axios";
import React, { useEffect, useState } from "react";
import Loading from "../../componants/Loading/Loading";
import Card from "../../componants/Card/Card";
import toast from "react-hot-toast";

export default function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  async function getProducts() {
    try {
      const { data } = await axios.get(
        "https://ecommerce.routemisr.com/api/v1/products"
      );
      setProducts(data.data);
    } catch (err) {
      toast.error("Failed to load products");
      console.error(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getProducts();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="container mx-auto space-y-4 py-6">
      <h1 className="text-3xl font-bold text-mainColor">All Products</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <Card key={product.id} productInfo={product} />
        ))}
      </div>
    </div>
  );
}
