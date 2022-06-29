import React from "react";
import SectionHeading from "./SectionHeading";
import Facebook from "./svg/facebook";
import Tinder from "./svg/Tinder"
import Airbnb from "./svg/Airbnb"
import Hubspot from "./svg/Hubspot"
import Amazon from "./svg/Amazon"


export default function Clients() {
  return (
    <div>
      <SectionHeading
        title="被全球100000个客户信任"
        subTitle="被全球100000个客户信任"
      />
      {/* 各个公司 Icon */}
      <div className="flex flex-col lg:flex-row items-center md:justify-between gap-8 my-16">
        <Facebook />
        <Tinder />
        <Airbnb />
        <Hubspot />
        <Amazon />
      </div>
      <div className="grid justify-items-center border-2 rounded px-14 mt-28">
        <img
          alt=""
          className="w-24 h-24 rounded-full bg-gray-400 -translate-y-1/2"
        />
        <p className="mt-5 mb-4 text-xl font-medium">
          "我非常信任这家公司......"
        </p>
        <p className="text-lg font-bold">无名氏</p>
        <p className="text-gray-500 mb-8">
          XX 公司老总{" "}
          <a href="#" className="text-blue-500"> @Company</a>
        </p>
      </div>
    </div>
  );
};
