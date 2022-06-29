import React from "react";
import SectionHeading from "./SectionHeading";
import WorkIcon from "./svg/WorkIcon"

export default function HowItWorks() {
  return (
    <div>
      <SectionHeading
        title="工作流程"
        subTitle="如何工作如何工作....."
      />
      <div className="mt-14 grid grid-cols-2 md:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((v) => (
          <div key={v} className="grid justify-items-center gap-y-2">           
            <WorkIcon />
            <p className="text-xl font-bold">初步沟通</p>
            <p className="text-gray-500">
              初步沟通初步沟通初步沟通初步沟通初步沟通初步沟通
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};