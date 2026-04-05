import Image from "next/image";
import { Boldonse } from "next/font/google";

const boldonse = Boldonse({
  subsets: ["latin"],
  weight: "400",
});

const skillBullets = [
  "Gameplay architecture and GAS",
  "Multiplayer replication and gameplay systems",
  "Data-driven workflows and progression systems",
  "UI/UX with UMG and Photoshop",
  "AI and Behavior Trees",
  "Some experience with Niagara System",
] as const;

/*
const introCards = [
  {
    description:
      "The work that feels most exciting is the kind that connects gameplay, design, and technical structure instead of treating them as separate problems.",
    title: "About Me",
  },
  {
    description:
      "Around 3 years of focused Unreal work across gameplay programming, multiplayer features, and tools that help iteration move faster.",
    title: "Experience",
  },
  {
    description:
      "Most projects sit somewhere between mechanic design, systems architecture, and giving the rest of the project cleaner tools and structure to build on.",
    title: "What I Work On",
  },
  {
    description:
      "Outside of programming, I love drawing, good music, and diving into new Unreal systems like Mover and Lyra to keep learning and expanding my range.",
    title: "Beyond Programming",
  },
] as const;
*/

export default function Intro() {
  return (
    <section className="relative flex flex-col gap-5 md:gap-6">
      <div className="pointer-events-none absolute top-1/2 right-[-3.5rem] hidden -translate-y-[28%] items-center gap-px text-neutral-900 lg:flex xl:right-[-5rem]">
        <svg aria-hidden="true" viewBox="0 0 24 176" className="h-40 w-6" fill="none">
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
        <p className="-mt-1 text-[0.78rem] tracking-[0.01em] lowercase [writing-mode:vertical-rl] [text-orientation:mixed]">
          intro video below
        </p>
      </div>

      <div className="straight-outline [--outline-color:#000] [--outline-thickness:0.05px] bg-[#fbf6ef] px-6 pt-7 pb-3 backdrop-blur-sm md:px-7 md:pt-7 md:pb-3">
        <h2
          className={`${boldonse.className} text-4xl leading-none tracking-tight text-[#8a6a55] md:text-[2.8rem]`}
          style={{ WebkitTextStroke: "0.7px #000" }}
        >
          Unreal Engine Systems Programmer
        </h2>

        <div className="mt-6 grid gap-5 border-t border-[#d8c8b6]/80 pt-6 md:grid-cols-[minmax(0,0.17fr)_minmax(0,0.83fr)] md:items-stretch md:gap-5">
          <div className="w-full max-w-[10rem] md:-mt-3 md:max-w-none md:pt-4">
            <div className="segmented-frame rounded-none">
              <Image
                src="/cavemanbutboring.jpg"
                alt="Profile photo"
                width={1280}
                height={1600}
                unoptimized
                className="relative z-0 block aspect-[5/6] w-full rounded-none object-cover object-center"
              />
              <div className="pointer-events-none absolute top-0 left-1.5 z-10 -translate-y-px">
                <span className="border border-black/80 bg-[#f4f1eb]/68 px-1.5 py-px text-[0.56rem] font-medium tracking-[0.14em] text-neutral-900 uppercase backdrop-blur-[2px]">
                  Anshuman Singh
                </span>
              </div>
            </div>
          </div>

          <div className="flex flex-col justify-center bg-[#fbf6ef] px-6 py-5 md:-mt-2 md:px-7 md:py-5">
            <p className="text-[1.2rem] leading-[1.42] text-neutral-900 md:text-[1.32rem]">
              I love working on systems-heavy gameplay: gameplay architecture,
              GAS, replication, data-driven design, and polished mechanics
              that feel good to play while still scaling cleanly under the
              hood.
            </p>
            <ul className="mt-3 grid list-disc gap-x-6 gap-y-1 pl-5 text-[0.9rem] leading-[1.45] text-neutral-700 md:text-[0.95rem] lg:grid-cols-2">
              {skillBullets.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      {/*
      <div className="grid gap-3 md:grid-cols-2">
        {introCards.map((card) => (
          <div
            key={card.title}
            className="straight-outline bg-white/42 px-5 py-4 backdrop-blur-sm"
          >
            <h3 className="mb-2 text-lg font-semibold tracking-tight text-neutral-900">
              {card.title}
            </h3>
            <p className="text-[0.98rem] leading-relaxed text-neutral-700">
              {card.description}
            </p>
          </div>
        ))}
      </div>
      */}
    </section>
  );
}
