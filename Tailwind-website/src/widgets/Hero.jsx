import React from "react";
import Video from "../assets/production_ID_4167404.mp4";
import play_button from '../assets/play_button.svg'
import big_right_circle from '../assets/big_right_circle.svg'
import sm_left_circle from '../assets/sm_left_circle.svg'


function Hero() {
  return (
    <div className="grid justify-items-center gap-8 pb-28 relative">
      <p className="text-4xl md:text-6xl font-black text-center leading-normal md:leading-normal">
        打造充满创造力的网站
      </p>
      <p className="text-xl text-gray-700 md:w-1/2 text-center"> 这是一个完美的工具 </p>
      <div>
        <button className="rounded bg-blue-500 text-base text-white py-3 px-8">
          立即试用
        </button>
        <button className="rounded bg-gray-900 text-base text-white py-3 px-8 ml-3">
          了解更多
        </button>
      </div>
      <div className="relative w-full">
        <img src={big_right_circle} width="256" height="256"
          viewBox="0 0 256 256" className="absolute right-0 -z-10" />
      </div>
      <div className="relative grid justify-items-center">
        <video
          src={Video}
          controls
          className="w-[768px] h-[432px] object-cover object-top rounded"
        ></video>
        <div className="flex absolute rounded-full bg-white -bottom-7 px-5 py-4 drop-shadow-xl">
          <img src={play_button} />
          查看2分钟演示视频
        </div>
      </div>
      <img src={sm_left_circle} className="absolute bottom-0 md:bottom-20 -left-10 -z-10" alt=".."/>
    </div>
  );
}

export default Hero;
