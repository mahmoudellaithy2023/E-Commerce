import React from "react";
import photo1 from "../../assets/images/amazon-pay.png";
import photo2 from "../../assets/images/American-Express-Color.png";
import photo3 from "../../assets/images/mastercard.webp";
import photo4 from "../../assets/images/paypal.png";
import photo5 from "../../assets/images/get-apple-store.png";
import photo6 from "../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <footer className="bg-mainColor text-white w-full py-10 mt-12">
      <div className="container mx-auto space-y-8 px-4">
        {/* Get the app section */}
        <div className="text-center sm:text-left space-y-2">
          <h2 className="text-2xl font-bold">Get The Fresh Cart App</h2>
          <p className="opacity-80">
            Download our app to get the latest products and offers directly on
            your phone.
          </p>
        </div>

        {/* Email subscribe */}
        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2 justify-center sm:justify-start">
          <input
            className="input w-full sm:w-auto px-3 py-2 rounded border border-gray-300 focus:border-white focus:ring-1 focus:ring-white transition-all duration-300"
            type="email"
            placeholder="Email..."
          />
          <button className="btn bg-secondary hover:bg-yellow-400 text-white px-4 py-2 rounded transition-all duration-300">
            Share App Link
          </button>
        </div>

        {/* Partners section */}
        <div className="pt-8 flex flex-col sm:flex-row justify-between items-center gap-6 sm:gap-0">
          {/* Payment partners */}
          <div className="flex flex-col items-center sm:items-start space-y-2">
            <h3 className="text-xl font-semibold">Payment Partners</h3>
            <ul className="flex items-center gap-4">
              {[photo1, photo2, photo3, photo4].map((img, i) => (
                <li
                  key={i}
                  className="transition-transform duration-300 hover:scale-110"
                >
                  <img className="w-10" src={img} alt={`Partner ${i + 1}`} />
                </li>
              ))}
            </ul>
          </div>

          {/* App store */}
          <div className="flex flex-col items-center sm:items-end space-y-2">
            <h3 className="text-xl font-semibold">
              Get Delivers With FreshCart
            </h3>
            <ul className="flex items-center gap-4">
              {[photo5, photo6].map((img, i) => (
                <li
                  key={i}
                  className="transition-transform duration-300 hover:scale-105"
                >
                  <img className="w-28" src={img} alt={`Store ${i + 1}`} />
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="text-center mt-6 text-sm opacity-80">
          &copy; 2025 FreshCart. All Rights Reserved.
        </div>
      </div>
    </footer>
  );
}
