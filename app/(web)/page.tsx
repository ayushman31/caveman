import Content from "@/components/Content";
import ContentItem from "@/components/ContentItem";
import Intro from "@/components/Intro";
import MultiText from "@/components/MultiText";
import Video from "@/components/Video";
import Image from "next/image";
import Link from "next/link";

const categoryCardImages = {
  experimental: "/Experimental&Advanced.png",
  gameplay: "/GameplayMechanics.png",
  multiplayer: "/Multiplayer&Performance.png",
  systems: "/SystemsEngineering.png",
} as const;

const featuredWork = [
  {
    category: "Systems Engineering",
    description:
      "A designer-driven territory framework with brush-based creation, contest flow, and dynamic world map rendering for multiplayer gameplay.",
    href: "/first/multiplayer-territory-system",
    title: "Multiplayer Territory System",
  },
  {
    category: "Gameplay Mechanics",
    description:
      "A polished combat and locomotion setup built around responsive movement, reusable ability structure, and strong player feel.",
    href: "/second/wizard-combat-movement",
    title: "Wizard Combat & Movement",
  },
  {
    category: "Multiplayer & Performance",
    description:
      "A shared gameplay architecture connecting abilities, replication, and data-driven systems for long-term multiplayer development.",
    href: "/third/multiplayer-gameplay-architecture",
    title: "Multiplayer Gameplay Architecture",
  },
  {
    category: "Experimental / Advanced",
    description:
      "A modular RPG extension on Lyra covering progression, crafting, gathering, and multiplayer-facing runtime architecture.",
    href: "/fourth/lyra-rpg-systems",
    title: "Lyra RPG Systems",
  },
] as const;

export default function HomePage() {
  const heroVideoUrl = "https://youtu.be/3otpWB4YWp4";
  const systemsTexts = [
    "Interconnected, data-driven systems-from territories and factions to growth-designed to work together and add depth to gameplay.",
  ];
  const gameplayTexts = [
    "Responsive combat and movement systems built on strong gameplay architecture, combining polished player feel with reusable GAS-driven frameworks for scalable mechanic design.",
  ];
  const multiplayerTexts = [
    "Scalable multiplayer architecture covering replication strategy, relevance-driven world systems, and the shared gameplay foundations that support complex networked mechanics.",
  ];
  const experimentalTexts = [
    "Pushing into advanced Unreal Engine systems-from Mover-based locomotion to extending Lyra with full RPG-style mechanics-applied in real gameplay scenarios, bridging experimentation with production-ready implementation.",
  ];

  const items = [
    <ContentItem
      key="home-1"
      video={
        <div className="straight-outline-video relative w-full overflow-hidden bg-white/35 pt-[56.25%]">
          <div className="absolute inset-0 flex items-center justify-center p-1">
            <div className="relative aspect-[3/2] h-full max-h-[calc(100%-0.25rem)] w-auto max-w-full overflow-hidden border border-black/20 bg-white/50">
              <Image
                src={categoryCardImages.systems}
                alt="Systems Engineering category artwork"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      }
      texts={
        <MultiText
          title="Systems Engineering"
          texts={systemsTexts}
          footerLabel="Includes:"
          footerText="Territory System · Pack & Faction System · Growth System"
        />
      }
      url="/first"
    />,
    <ContentItem
      key="home-2"
      video={
        <div className="straight-outline-video relative w-full overflow-hidden bg-white/35 pt-[56.25%]">
          <div className="absolute inset-0 flex items-center justify-center p-1">
            <div className="relative aspect-[3/2] h-full max-h-[calc(100%-0.25rem)] w-auto max-w-full overflow-hidden border border-black/20 bg-white/50">
              <Image
                src={categoryCardImages.gameplay}
                alt="Gameplay Mechanics category artwork"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      }
      texts={
        <MultiText
          title="Gameplay Mechanics"
          texts={gameplayTexts}
          footerLabel="Includes:"
          footerText="Pounce & Latch · Wizard Combat · Ability Framework"
        />
      }
      url="/second"
    />,
    <ContentItem
      key="home-3"
      video={
        <div className="straight-outline-video relative w-full overflow-hidden bg-white/35 pt-[56.25%]">
          <div className="absolute inset-0 flex items-center justify-center p-1">
            <div className="relative aspect-[3/2] h-full max-h-[calc(100%-0.25rem)] w-auto max-w-full overflow-hidden border border-black/20 bg-white/50">
              <Image
                src={categoryCardImages.multiplayer}
                alt="Multiplayer and Performance category artwork"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      }
      texts={
        <MultiText
          title="Multiplayer & Performance"
          texts={multiplayerTexts}
          footerLabel="Includes:"
          footerText="Footprint Tracking · Replication Strategy · Networked Architecture"
        />
      }
      url="/third"
    />,
    <ContentItem
      key="home-4"
      video={
        <div className="straight-outline-video relative w-full overflow-hidden bg-white/35 pt-[56.25%]">
          <div className="absolute inset-0 flex items-center justify-center p-1">
            <div className="relative aspect-[3/2] h-full max-h-[calc(100%-0.25rem)] w-auto max-w-full overflow-hidden border border-black/20 bg-white/50">
              <Image
                src={categoryCardImages.experimental}
                alt="Experimental and Advanced category artwork"
                fill
                className="object-cover object-center"
              />
            </div>
          </div>
        </div>
      }
      texts={
        <MultiText
          title="Experimental/Advanced"
          texts={experimentalTexts}
          footerLabel="Includes:"
          footerText="Mover Locomotion · Lyra RPG Extension"
        />
      }
      url="/fourth"
    />,

  ];

  return (
    <>
      {/* intor */}
      <div className="mx-auto max-w-5xl px-4 pt-10 pb-1 md:px-6 md:pt-6">
       <Intro/>
        
      </div>

      {/* intro video */}
      <div className="mx-auto max-w-5xl px-4 pt-2 pb-4 md:px-6 md:pt-2">
        <Video videoUrl={heroVideoUrl} outlined />
      </div>

      <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-5 px-4 pt-2 pb-1 md:px-6 md:pb-2">
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
        <div className="straight-outline bg-white/45 px-6 py-5 backdrop-blur-sm">
          <p className="mb-2 text-[0.76rem] font-semibold tracking-[0.12em] text-neutral-700/75 uppercase">
            Featured Work
          </p>
          <h2 className="text-[1.65rem] font-semibold tracking-tight text-neutral-900 md:text-[1.8rem]">
            Four projects that best represent the range of the work.
          </h2>
        </div>

        <div className="grid gap-4 md:grid-cols-2">
          {featuredWork.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="straight-outline bg-white/50 px-5 py-5 backdrop-blur-sm transition-[transform,background-color,box-shadow] duration-200 hover:-translate-y-0.5 hover:bg-[#fbf5e8]/95 hover:shadow-[0_10px_22px_rgba(180,156,112,0.12)]"
            >
              <p className="mb-3 text-[0.72rem] font-semibold tracking-[0.12em] text-neutral-700/75 uppercase">
                {item.category}
              </p>
              <h3 className="mb-3 text-xl font-semibold tracking-tight text-neutral-900">
                {item.title}
              </h3>
              <p className="text-[0.98rem] leading-relaxed text-neutral-700">
                {item.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* cards section */}
      <div className="-mt-5 md:-mt-8">
        <Content items={items} />
      </div>
    </>
  );
}
