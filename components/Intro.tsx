import Image from "next/image";

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
      "Gameplay architecture, GAS, replication, data-driven workflows, progression systems, UI/UX with UMG and Photoshop, AI and Behavior Trees, some Niagara System experience, and polished mechanics that still scale cleanly under the hood.",
    title: "What I Work On",
  },
  {
    description:
      "Outside of programming, I love drawing, good music, and diving into new Unreal systems like Mover and Lyra to keep learning and expanding my range.",
    title: "Beyond Programming",
  },
] as const;

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

      <div className="straight-outline bg-white/42 px-6 py-5 backdrop-blur-sm md:px-7 md:py-5">
        <h2 className="text-hollow font-display text-4xl font-semibold leading-none tracking-tight md:text-[2.8rem]">
          Unreal Engine Systems Programmer
        </h2>
      </div>

      <div className="grid gap-5 md:grid-cols-[minmax(0,0.26fr)_minmax(0,0.74fr)] md:items-stretch md:gap-6">
        <div className="w-full max-w-[14rem] md:max-w-none">
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

        <div className="straight-outline flex flex-col justify-center bg-white/42 px-6 py-5 backdrop-blur-sm md:px-7 md:py-5">
          <p className="mb-3 text-[0.76rem] font-semibold tracking-[0.14em] text-neutral-700/75 uppercase">
            Building gameplay and multiplayer systems in Unreal Engine
          </p>
          <p className="text-outer-glow text-[1.2rem] leading-[1.42] text-neutral-900 md:text-[1.32rem]">
            I love working on systems-heavy gameplay: gameplay
            architecture, GAS, replication, data-driven design, and polished
            mechanics that feel good to play while still scaling cleanly under
            the hood.
          </p>
          <p className="mt-3 text-[1rem] leading-relaxed text-neutral-700 md:text-[1.05rem]">
            A lot of the enjoyment comes from finding that balance between
            strong player feel, clean technical structure, and giving the
            wider project room to iterate and grow.
          </p>
        </div>
      </div>

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
    </section>
  );
}
