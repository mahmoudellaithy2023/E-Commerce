import React from "react";
import photo1 from "../../assets/images/amazon-pay.png";
import photo2 from "../../assets/images/American-Express-Color.png";
import photo3 from "../../assets/images/mastercard.webp";
import photo4 from "../../assets/images/paypal.png";
import photo5 from "../../assets/images/get-apple-store.png";
import photo6 from "../../assets/images/get-google-play.png";

export default function Footer() {
  return (
    <footer className="bg-slate-200  w-full py-8 mt-8">
      <div className="container space-y-5">
        <div>
          <h2 className="text-2xl">Get The Fresh Cart App</h2>
          <p className="text-slate-500">
            Lorem, ipsum dolor sit amet consectetur adipisicing elit.
          </p>
        </div>
        <div className="flex items-center gap-3 pt-2">
          <input className="input ms-3" type="email" placeholder="Emaill...." />
          <button className="btn">Share App Link</button>
        </div>
        <div className="pt-6 flex items-center justify-between">
          <div className="left flex   ">
            <h3 className="text-[20px]">Payment Partenrs</h3>
            <ul className="flex items-center gap-2 ps-2">
              <li>
                <img className="w-[40px]" src={photo1} alt="" />
              </li>
              <li>
                <img className="w-[40px]" src={photo2} alt="" />
              </li>
              <li>
                <img className="w-[40px]" src={photo3} alt="" />
              </li>
              <li>
                <img className="w-[40px]" src={photo4} alt="" />
              </li>
            </ul>
          </div>
          <div className="right flex">
            <h3 className="text-[20px]">Get Delivers With FreshCart</h3>
            <ul className="flex items-center gap-2 ps-2">
              <li>
                <img className="w-[70px]" src={photo5} alt="" />
              </li>
              <li>
                <img className="w-[70px]" src={photo6} alt="" />
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
}
