"use client"
import React from "react";
import Tabs from "./Tabs";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const path = usePathname();
  return (
    <header className="flex flex-col h-[80px] justify-between bg-white">
      <div className="relative flex flex-row items-center justify-between bg-white px-2 py-2 md:px-6 md:pb-0">
        <Link
          href="https://escuela-ray-bolivar-sosa.com/"
          className="text-block flex items-center font-bold"
        >
          <svg
            className="mr-1"
            xmlns="http://www.w3.org/2000/svg"
            width="25px"
            height="25px"
            viewBox="0 0 256 256"
          >
            <defs>
              <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop
                  offset="0%"
                  style={{ stopColor: "rgba(255, 0, 254, 1)", stopOpacity: 1 }}
                />
                <stop
                  offset="100%"
                  style={{ stopColor: "rgba(147, 51, 234, 1)", stopOpacity: 1 }}
                />
              </linearGradient>
            </defs>
            <path
              fill="url(#grad1)"
              d="M232 93.17c0 41-29.69 52.47-53.55 61.67c-8.41 3.24-16.35 6.3-22.21 10.28c-11.39 7.72-18.59 21.78-25.55 35.38c-9.94 19.42-20.23 39.5-43.17 39.5c-12.91 0-24.61-11.64-33.85-33.66s-14.31-51-13.61-77.45c1.08-40.65 14.58-62.68 25.7-74c14.95-15.2 35.24-25.3 58.68-29.2c21.79-3.62 44.14-1.38 62.93 6.3C215.73 43.6 232 65.9 232 93.17"
            />
          </svg>
          Ray chatbot
        </Link>
        {path != "/" && (
          <Link
            href={"/"}
            className="px-4 py-1 rounded-full border-2 border-slate-600 hover:bg-slate-200 text-sm font-semibold"
          >
            Back
          </Link>
        )}
      </div>
      <Tabs />
    </header>
  );
}
