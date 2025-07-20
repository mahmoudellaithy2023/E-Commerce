import React from "react";
import photo1 from "../../assets/images/amazon-pay.png";
import photo2 from "../../assets/images/American-Express-Color.png";
import photo3 from "../../assets/images/mastercard.webp";
import photo4 from "../../assets/images/paypal.png";
import photo5 from "../../assets/images/get-apple-store.png";
import photo6 from "../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <footer className="bg-slate-200 w-full py-8 mt-8">
      <div className="container mx-auto space-y-5 px-4">
        <div className="text-center sm:text-left">
          <h2 className="text-2xl font-semibold">Get The Fresh Cart App</h2>
          <p className="text-slate-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
          <input
            className="input w-full  sm:w-auto px-3 py-2 rounded border"
            type="email"
            placeholder="Email..."
          />
          <button className="btn bg-green-600 text-white px-4 py-2 rounded">
            Share App Link
          </button>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row justify-between items-center gap-5 sm:gap-0">
          <div className="flex flex-col items-center sm:items-start">
            <h3 className="text-[20px] mb-2">Payment Partners</h3>
            <ul className="flex items-center gap-3">
              <li>
                <img className="w-[40px]" src={photo1} alt="Amazon Pay" />
              </li>
              <li>
                <img className="w-[40px]" src={photo2} alt="American Express" />
              </li>
              <li>
                <img className="w-[40px]" src={photo3} alt="Mastercard" />
              </li>
              <li>
                <img className="w-[40px]" src={photo4} alt="PayPal" />
              </li>
            </ul>
          </div>

          <div className="flex flex-col items-center sm:items-end">
            <h3 className="text-[20px] mb-2">Get Delivers With FreshCart</h3>
            <ul className="flex items-center gap-3">
              <li>
                <img className="w-[120px]" src={photo5} alt="Apple Store" />
              </li>
              <li>
                <img className="w-[120px]" src={photo6} alt="Google Play" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
