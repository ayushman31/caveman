import Image from "next/image";
import { homeTexts } from "@/lib/dummyData";

export default function Intro() {
  return (
      <div className="relative flex flex-col gap-6 md:flex-row md:items-start md:gap-10">
        <svg
          aria-hidden="true"
          viewBox="0 0 24 176"
          className="pointer-events-none absolute top-1/2 right-[-3.5rem] hidden h-40 w-6 -translate-y-1/3 text-neutral-900 lg:block xl:right-[-5rem]"
          fill="none"
        >
          <line
            x1="12"
            y1="4"
            x2="12"
            y2="152"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
          />
          <path
            d="M4 144 L12 152 L20 144"
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="square"
            strokeLinejoin="miter"
          />
        </svg>
        <div className="w-full md:w-[40%]">
          <div className="segmented-frame rounded-none">
            <Image
              src="/caveman.jpg"
              alt="Profile photo"
              width={800}
              height={800}
              unoptimized
              className="relative z-0 block aspect-square w-full rounded-none object-cover"
            />
            <div className="pointer-events-none absolute inset-x-0 bottom-4 z-10 flex justify-center px-4">
              <span className="border border-black/80 bg-[#f4f1eb]/68 px-3 py-1 text-[0.72rem] font-medium tracking-[0.2em] text-neutral-900 uppercase backdrop-blur-[2px]">
                Anshuman Singh
              </span>
            </div>
          </div>
        </div>
  
        <div className="flex w-full max-w-2xl flex-col md:w-[60%]">
          <h2 className="text-hollow mb-2 font-display text-4xl font-semibold leading-none tracking-tight">
            Unreal Engine Systems Programmer
          </h2>
          <div className="mt-3 flex flex-col gap-2">
            {homeTexts.map((text, index) => (
              <p key={index} className="text-outer-glow text-[1.4625rem] leading-[1.35]">
                {text}
              </p>
            ))}
            <div className="mt-2 flex items-center gap-3 text-neutral-700/80">
              <span className="h-px w-10 bg-neutral-900/70" aria-hidden="true" />
              <p className="text-[0.78rem] tracking-[0.14em] lowercase">
                intro video and portfolio below
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }
