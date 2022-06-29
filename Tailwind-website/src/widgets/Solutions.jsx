import React from "react";
import SectionHeading from "./SectionHeading";
import Image1 from "../assets/pexels-photo-8348457.jpg";
import ThunderIcon from "./svg/ThunderIcon"


function Solutions() {
  return (
    <div>
      <SectionHeading
        title="解决方案"
        subTitle="解决方案.................."
      />
      <div className="grid lg:grid-cols-2 mt-20 gap-20">
        <div>
          <h3 className="mt-7 text-[32px] font-fold">强有力的工具</h3>
          <p className="mt-4 mb-8 text-gray-500">
            强有力的工具...................................................
          </p>
          <ul className="grid gap-3">
            {[1, 2, 3].map((v) => (
              <li
                className={`p-5 justify-between rounded border border-zinc-100 ${
                  v === 1 && "bg-zinc-100"
                }`}
                key={v}
              >
                <p className="text-lg font-bold">构建简单的生态系统</p>
                <div className="flex justify-between relative">
                  <p className="text-lg leading-10 mt-1">
                    构建简单的生态系统........................
                  </p>
                  <ThunderIcon />
                </div>
              </li>
            ))}
          </ul>
        </div>
        <img src={Image1} width="80%" alt="" />
      </div>
    </div>
  );
}

export default Solutions;
