import React from "react";
import BlueButton from "./blue-button";

interface Props {
  title: string;
  description: string;
  isArrow: boolean;
  btnText: string;
  btnHref: string;
  marginB?: string;
}

const CTA = ({
  title,
  description,
  isArrow,
  btnText,
  btnHref,
  marginB,
}: Props) => {
  return (
    <div
      className={`px-4 sm:px-6 lg:px-8 py-10 sm:py-14 ${
        marginB ? marginB : "mb-20"
      }`}
    >
      <div className="text-center bg-gradient-to-r from-sky-50 to-sky-200 dark:from-slate-800 dark:to-slate-700 rounded-2xl p-6 sm:p-10 md:p-12">
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-slate-800 dark:text-white mb-3 sm:mb-4">
          {title}
        </h2>
        <p className="text-base sm:text-lg md:text-xl text-slate-600 dark:text-slate-300 mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed">
          {description}
        </p>
        <div className="flex justify-center">
          <BlueButton text={btnText} href={btnHref} isArrow={isArrow} />
        </div>
      </div>
    </div>
  );
};

export default CTA;
