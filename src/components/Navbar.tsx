import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { IoSunny } from "react-icons/io5";
import { MdMyLocation } from "react-icons/md";
import Searchbar from "./Searchbar";

type Props = {};

export default function Navbar({}: Props) {
  return (
    <nav className="shadow-sm sticky top-0 left-0 z-50 bg-white">
      <div className="h-[80px] w-full flex justify-between items-center max-w-7xl px-3 mx-auto">
        <p className="flex items-center justify-center gap-2">
          <h2 className="text-gray-500 text-3xl">Weather</h2>
          <IoSunny className="text-3xl mt-1 text-yellow-300" />
        </p>

        <section className="flex gap-2 items-center">
            <MdMyLocation className="text-3xl px-[px] text-gray-500 hover:opacity- 80 cursor-pointer " />
            <FaLocationDot className="text-3xl px-[5px] text-gray-500 hover:opacity- 80 cursor-pointer " />
            <p className="text-slate-900/80 text-sm">India</p>

            <div>
                <Searchbar/>
            </div>
        </section>
      </div>
    </nav>
  );
}
