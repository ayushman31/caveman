import Link from "next/link";

import PageIntro from "@/components/PageIntro";
import { getLyraSectionPage, lyraOverviewCards, lyraSectionPages } from "@/lib/lyraRpgContent";
import { notFound } from "next/navigation";

const architectureDetails = [
  {
    points: [
      "Lyra remains the host for the replicated ability system, player state, inventory definitions and instances, quick-bar flows, equipment, and gameplay messaging.",
      "The custom module depends on Lyra directly and plugs into those seams instead of rebuilding them from scratch.",
      "Most of the interesting runtime behavior lives in data assets, components, actors, attribute sets, and gameplay abilities rather than heavyweight module startup code.",
    ],
    title: "Module layering",
  },
  {
    points: [
      "A custom ability-set type can grant abilities, gameplay effects, and attribute sets while tracking the handles needed for later cleanup.",
      "A higher-level item definition separates stable item identity from lower-level runtime inventory behavior.",
      "Custom reward payload structs move crafting and gathering data cleanly through GAS target-data replication.",
    ],
    title: "Reusable extension seams",
  },
] as const;

const progressionDetails = [
  {
    points: [
      "The player state swaps in a custom ability system component while preserving Lyra's normal replicated architecture.",
      "That component reacts to skill XP, stat XP, point gains, and chained follow-up effects.",
      "Blueprint events expose progression changes for UI and feedback without mixing those concerns into the gameplay math itself.",
    ],
    title: "Custom progression brain",
  },
  {
    points: [
      "Skill points are derived from a square-root XP curve, making higher levels progressively more expensive.",
      "Stat points follow the same idea on a separate curve, which keeps long-term growth from turning into runaway linear scaling.",
      "A dampening rule slows max-skill growth in the higher ranges, giving the system a softer late-game tail.",
    ],
    title: "Non-linear growth model",
  },
  {
    points: [
      "Skills map to relevant stats through gameplay tags and designer-authored relevance factors.",
      "Skill XP can therefore drive related stat XP, and stat gains can then expand future skill capacity.",
      "Because the relationships are data-driven, the same framework supports combat, crafting, and gathering professions without separate bespoke pipelines.",
    ],
    title: "Data-driven relationships",
  },
] as const;

const craftingDetails = [
  {
    points: [
      "Stations are lightweight actors backed by data definitions rather than hard-coded one-off behavior.",
      "When a player begins interacting, the station manager grants temporary ability sets to the player and revokes them on exit.",
      "That makes station abilities contextual and temporary, which is a clean fit for crafting and specialized interactions.",
    ],
    title: "Station flow",
  },
  {
    points: [
      "Crafting recipes are table-driven and keyed by stable item asset identities instead of raw item classes.",
      "The crafting ability resolves a recipe payload, verifies ingredient counts, consumes the right items, and then packages the crafted result as a reward payload.",
      "Ingredient consumption updates both inventory storage and quick-bar state so the player's runtime state remains consistent.",
    ],
    title: "Crafting pipeline",
  },
  {
    points: [
      "Gathering abilities stay generic: Blueprint can own the trace and interaction feel, while C++ packages reward payloads and handles replication-friendly transport.",
      "World resource nodes hold reward data and replicated health, giving the system a clear world-side source of truth.",
      "The result is a flexible gathering pipeline that can award XP, items, and durability costs without hard-coding each profession separately.",
    ],
    title: "Gathering pipeline",
  },
] as const;

const networkingDetails = [
  {
    points: [
      "The implementation leans on the same authoritative multiplayer approach Lyra and GAS are built for.",
      "Progression internals like many XP tracks replicate owner-only, while gameplay-visible values can replicate more broadly where needed.",
      "Stations, interaction state, resource-node health, and similar runtime state replicate through focused actors and components rather than one oversized system.",
    ],
    title: "Replication boundaries",
  },
  {
    points: [
      "Gathering and crafting actions package their reward payloads through GAS target data so local interaction and server authority can meet in a predictable way.",
      "This keeps the transport format explicit and lets the reward path stay extensible as the systems grow.",
      "It is a strong multiplayer pattern because the client can drive interaction feel without becoming the final source of truth for the outcome.",
    ],
    title: "Action result transport",
  },
  {
    points: [
      "The most obvious next hardening step is stronger server validation after crafting and gathering payloads arrive.",
      "There is also room for richer client-side response to replicated station state, even though the authority model itself is already solid.",
      "Those are the kinds of follow-up tasks I would expect when moving a strong feature architecture toward final production hardening.",
    ],
    title: "Remaining hardening work",
  },
] as const;

const sectionDetails = {
  "architecture-foundation": architectureDetails,
  "crafting-stations-gathering": craftingDetails,
  "networking-validation": networkingDetails,
  "progression-systems": progressionDetails,
} as const;

export function generateStaticParams() {
  return lyraSectionPages.map((section) => ({ section: section.slug }));
}

export default async function LyraSectionPage({
  params,
}: {
  params: Promise<{ section: string }>;
}) {
  const { section } = await params;
  const page = getLyraSectionPage(section);

  if (!page) {
    notFound();
  }

  const otherSections = lyraOverviewCards.filter((item) => item.slug !== section);
  const details = sectionDetails[section as keyof typeof sectionDetails];

  return (
    <>
      <PageIntro title={page.title} description={page.description} />

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
        <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            Overview
          </h2>
          <p className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
            {page.intro}
          </p>
        </div>

        <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            Key points
          </h2>
          <ul className="flex list-disc flex-col gap-4 pl-5 text-[1rem] leading-relaxed text-neutral-700 md:text-[1.05rem]">
            {page.highlights.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="straight-outline bg-white/45 px-5 py-5 backdrop-blur-sm"
            >
              <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900 md:text-[1.22rem]">
                {detail.title}
              </h3>
              <ul className="flex list-disc flex-col gap-3 pl-5 text-[0.98rem] leading-relaxed text-neutral-700">
                {detail.points.map((point) => (
                  <li key={point}>{point}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
          <div className="mb-5 flex items-center justify-between gap-4">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Explore other sections
            </h2>
            <Link
              href="/fourth/lyra-rpg-systems"
              className="text-sm font-medium text-neutral-800 underline decoration-black/30 underline-offset-4"
            >
              Back to overview
            </Link>
          </div>
          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {otherSections.map((item) => (
              <Link
                key={item.slug}
                href={`/fourth/lyra-rpg-systems/${item.slug}`}
                className="straight-outline bg-white/55 px-4 py-4 transition-transform duration-200 hover:-translate-y-0.5"
              >
                <h3 className="mb-2 text-lg font-semibold tracking-tight text-neutral-900">
                  {item.title}
                </h3>
                <p className="text-[0.98rem] leading-relaxed text-neutral-700">
                  {item.description}
                </p>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
