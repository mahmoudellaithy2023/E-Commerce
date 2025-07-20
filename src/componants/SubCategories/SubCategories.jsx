import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../Loading/Loading";

export default function SubCategories() {
  const { id } = useParams();
  const [subCategories, setSubCategories] = useState(null);

  async function getAllSubCat() {
    try {
      const { data } = await axios.get(
        `https://ecommerce.routemisr.com/api/v1/categories/${id}/subcategories`
      );
      setSubCategories(data.data);
    } catch (error) {
      console.error("Failed to fetch subcategories:", error);
      setSubCategories([]);
    }
  }

  useEffect(() => {
    getAllSubCat();
  }, [id]);

  return (
    <div className="p-4 max-w-screen-xl mx-auto">
      <h1 className="text-xl sm:text-2xl font-bold mb-6 text-green-600 text-center">
        Sub Categories
      </h1>

      {subCategories === null ? (
        <Loading />
      ) : subCategories.length > 0 ? (
        <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {subCategories.map((sub) => (
            <div
              key={sub._id}
              className="border rounded-lg shadow-md hover:shadow-green-500 hover:shadow-lg transition duration-300 p-4 bg-white text-center"
            >
              <h2 className="text-base sm:text-lg font-semibold text-gray-800">
                {sub.name}
              </h2>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">No subcategories available.</p>
      )}
    </div>
  );
}
