import React from "react";
import wlogo from '../public/wlogo.png'
import Image from "next/image";


const Logo = () => {
  return (
    <>
      <div className="flex items-center gap-0 align-bottom space-x-2">
        <Image
          src={wlogo}
          alt="logo"
          className="h-12 w-18 m-0 mb-1 text-accent object-contain "
        />
        <span className="text-md font-bold m-0 mt-4 -ml-1 text-white">
          Webify
        </span>
      </div>
    </>
  );
};

export default Logo;
