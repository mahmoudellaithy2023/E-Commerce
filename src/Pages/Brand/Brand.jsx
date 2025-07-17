import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import Loading from "../../componants/Loading/Loading";
import { BrandContext } from "../../Context/Brand.context";
import toast from "react-hot-toast";

export default function Brands() {
  const [brands, setBrands] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const { activeBrand, openBrandModal, closeBrandModal } =
    useContext(BrandContext);

  async function getBrands() {
    try {
      const options = {
        url: `https://ecommerce.routemisr.com/api/v1/brands`,
        method: "GET",
      };
      const { data } = await axios.request(options);
      setBrands(data.data);
    } catch (error) {
      setError("Something went wrong while fetching brands.");
      toast.error("Error fetching brands");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    getBrands();
  }, []);

  return (
    <>
      {loading ? (
        <Loading />
      ) : (
        <div className="container mx-auto p-4">
          <h1 className="text-3xl font-bold text-mainColor mb-6 text-center">
            All Brands
          </h1>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {brands.map((brand) => (
              <div
                key={brand._id}
                onClick={() => openBrandModal(brand)}
                className="border rounded-md p-4 text-center shadow-sm hover:shadow-mainColor hover:shadow-md transition cursor-pointer"
              >
                <img
                  src={brand.image}
                  alt={brand.name}
                  className="w-full h-40 object-contain mb-4"
                />
                <h2 className="font-medium">{brand.name}</h2>
              </div>
            ))}
          </div>

          {activeBrand && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
              onClick={closeBrandModal}
            >
              <div
                className="bg-white rounded p-6 max-w-lg w-full relative animate-fadeIn"
                onClick={(e) => e.stopPropagation()}
              >
                <button
                  className="absolute top-2 right-2 text-2xl"
                  onClick={closeBrandModal}
                >
                  &times;
                </button>
                <h2 className="text-2xl font-bold text-mainColor mb-4">
                  {activeBrand.name.toUpperCase()}
                </h2>
                <img
                  src={activeBrand.image}
                  className="w-full h-40 object-contain mb-4"
                />
                <p className="text-gray-700">{activeBrand.slug}</p>
                <button
                  onClick={closeBrandModal}
                  className="mt-4 px-4 py-2 bg-gray-500 text-white rounded"
                >
                  Close
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </>
  );
}
