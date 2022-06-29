import React from "react";
import BackGroundCircleSVG from "./svg/BackGroundCircleSVG";

export default function Contact() {
  return (
    <div className="bg-black md:w-4/5 mx-auto relative overflow-hidden">
      <div className="w-full py-16 px-12">
        <h2 className="text-3xl text-white font-bold">来吧！强化你的公司！</h2>
        <p className="text-lg text-white mt-2 mb-6">
          这是增强信息
        </p>
        <div className="flex flex-col md:flex-row items-start gap-4">
          <input
            type="text"
            name=""
            id=""
            className="bg-zinc-800 py-3 px-4 border border-zinc-700"
            placeholder="您的邮箱"
          />
          <button className="py-3 px-8 bg-blue-500 text-white text-base font-medium md:ml-2">
            立即开始
          </button>
        </div>
        <p className="text-sm text-zinc-400 mt-3">7天免费试用，无需支付</p>
      </div>
      <div className="absolute -right-10 bottom-0">
        <BackGroundCircleSVG />
      </div>
    </div>
  );
};