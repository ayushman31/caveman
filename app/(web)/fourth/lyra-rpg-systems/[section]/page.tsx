import Link from "next/link";
import Image from "next/image";

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
      "Like Lyra's ability flow, the progression pieces stay modular in C++ and are tied together at the higher level through Blueprint.",
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
      "Skill points = floor(sqrt(SkillXP / 25.0))",
      "Stat points = floor(sqrt(StatXP / 50.0))",
      "Max skill growth uses 20.0 skill points per stat point before high-range dampening.",
    ],
    title: "Progression formulae",
  },
  {
    points: [
      "Skills map to relevant stats through gameplay tags and designer-authored relevance factors.",
      "Skill XP can therefore drive related stat XP, and stat gains can then expand future skill capacity.",
      "Because the relationships are data-driven, the same framework supports combat, crafting, and gathering professions without separate bespoke pipelines.",
      "One practical example is a progression payload carrying a gained skill amount plus its linked relevance map, then resolving that into both Skill XP and weighted Stat XP in the receiving ability flow.",
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
      "The station logic stays modular too: low-level pieces live in components and abilities, while Blueprint can assemble the interaction flow the same way Lyra often does.",
    ],
    title: "Station flow",
  },
  {
    points: [
      "Crafting recipes are table-driven and keyed by stable item asset identities instead of raw item classes.",
      "The crafting ability resolves a recipe payload, verifies ingredient counts, consumes the right items, and then packages the crafted result as a reward payload.",
      "Ingredient consumption updates both inventory storage and quick-bar state so the player's runtime state remains consistent.",
      "A concrete example is sending crafted output item identity, consumed ingredient data, and reward values through target data so another ability step or receiver can finish the grant cleanly.",
    ],
    title: "Crafting pipeline",
  },
  {
    points: [
      "Gathering abilities stay generic: Blueprint can own the trace and interaction feel, while C++ packages reward payloads and handles replication-friendly transport.",
      "World resource nodes hold reward data and replicated health, giving the system a clear world-side source of truth.",
      "The result is a flexible gathering pipeline that can award XP, items, and durability costs without hard-coding each profession separately.",
      "That same split keeps the flow modular: data packaging and validation stay reusable in code, while Blueprint can drive the interaction cadence and presentation.",
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

        {section === "crafting-stations-gathering" ? (
          <div className="grid gap-6 xl:grid-cols-[1.05fr_0.95fr]">
            <div className="straight-outline bg-white/45 px-5 py-5 backdrop-blur-sm">
              <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                Item recipe setup
              </h3>
              <div className="straight-outline straight-outline-video relative aspect-[872/857] w-full overflow-hidden bg-white/35">
                <Image
                  src="/ItemRecipe.png"
                  alt="Item recipe data setup"
                  fill
                  className="object-contain object-center"
                />
              </div>
            </div>

            <div className="straight-outline bg-white/45 px-5 py-5 backdrop-blur-sm">
              <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                Primary asset item model
              </h3>
              <p className="mb-4 text-[1rem] leading-relaxed text-neutral-700">
                Items are treated as stable primary-asset identities rather than
                only as raw runtime classes. That gives crafting a clean way to
                reference ingredients and outputs across data tables, inventory,
                and reward flow.
              </p>
              <ul className="flex list-disc flex-col gap-3 pl-5 text-[0.98rem] leading-relaxed text-neutral-700">
                <li>
                  A custom item-asset fragment attaches a stable
                  `FPrimaryAssetId` to the Lyra inventory definition.
                </li>
                <li>
                  Crafting recipes are keyed by those asset IDs, not by raw item
                  classes and not by gameplay tags.
                </li>
                <li>
                  The top-level item asset holds the stable identity layer,
                  while Lyra&apos;s inventory item definition remains the runtime
                  item used by inventory systems.
                </li>
                <li>
                  During crafting, ingredient checks read the item asset
                  fragment from inventory items, match the stored asset IDs
                  against the recipe, and then remove the correct inputs from
                  both the inventory manager and quick bar.
                </li>
              </ul>
            </div>
          </div>
        ) : null}

        {section === "progression-systems" ? (
          <>
            <div className="grid gap-4 md:grid-cols-3">
              <div className="straight-outline bg-white/45 px-5 py-5 backdrop-blur-sm">
                <p className="mb-2 text-[0.76rem] font-semibold tracking-[0.08em] text-neutral-700/80">
                  KEY IDEA
                </p>
                <p className="text-[0.98rem] leading-relaxed text-neutral-800">
                  Skill XP and stat XP are linked, not isolated.
                </p>
              </div>

              <div className="straight-outline bg-white/45 px-5 py-5 backdrop-blur-sm">
                <p className="mb-2 text-[0.76rem] font-semibold tracking-[0.08em] text-neutral-700/80">
                  KEY IDEA
                </p>
                <p className="text-[0.98rem] leading-relaxed text-neutral-800">
                  Growth follows square-root curves, so higher levels cost more.
                </p>
              </div>

              <div className="straight-outline bg-white/45 px-5 py-5 backdrop-blur-sm">
                <p className="mb-2 text-[0.76rem] font-semibold tracking-[0.08em] text-neutral-700/80">
                  KEY IDEA
                </p>
                <p className="text-[0.98rem] leading-relaxed text-neutral-800">
                  Gameplay tags and relevance maps drive the tuning surface.
                </p>
              </div>
            </div>

            <div className="grid gap-6 xl:grid-cols-[1fr_1.1fr]">
              <div className="straight-outline bg-white/45 px-5 py-5 backdrop-blur-sm">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Stat relevance map image
                </h3>
                <div className="straight-outline straight-outline-video relative aspect-[542/390] w-full overflow-hidden bg-white/35">
                  <Image
                    src="/LyraStatRelevancy.png"
                    alt="Stat relevance map"
                    fill
                    className="object-fill object-center"
                  />
                </div>
              </div>

              <div className="straight-outline bg-white/45 px-5 py-5 backdrop-blur-sm">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Example relevance mapping
                </h3>
                <div className="flex flex-col gap-4">
                  <div className="mx-auto w-full max-w-xs border border-black/10 px-4 py-4 text-center">
                    <p className="text-sm font-semibold tracking-[0.06em] text-neutral-900">
                      LUMBERJACKING SKILL
                    </p>
                  </div>

                  <div className="relative hidden h-20 md:block">
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 400 100"
                      className="absolute inset-0 h-full w-full text-neutral-500"
                      fill="none"
                    >
                      <line
                        x1="200"
                        y1="6"
                        x2="200"
                        y2="34"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <line
                        x1="200"
                        y1="34"
                        x2="90"
                        y2="76"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                      <line
                        x1="200"
                        y1="34"
                        x2="310"
                        y2="76"
                        stroke="currentColor"
                        strokeWidth="1.8"
                      />
                    </svg>
                    <div className="absolute top-9 left-[13%] -translate-x-1/2 bg-[#f4ede4] px-2 py-1 font-mono text-[0.72rem] text-neutral-700">
                      1.0
                    </div>
                    <div className="absolute top-9 right-[13%] translate-x-1/2 bg-[#f4ede4] px-2 py-1 font-mono text-[0.72rem] text-neutral-700">
                      0.5
                    </div>
                  </div>

                  <div className="flex items-center justify-center md:hidden">
                    <p className="font-mono text-sm text-neutral-700">v</p>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="border border-black/10 px-4 py-4 text-center">
                      <p className="text-sm font-semibold tracking-[0.06em] text-neutral-900">
                        Strength
                      </p>
                      <p className="mt-2 font-mono text-[0.92rem] text-neutral-800">
                        Relevancy = 1.0
                      </p>
                    </div>

                    <div className="border border-black/10 px-4 py-4 text-center">
                      <p className="text-sm font-semibold tracking-[0.06em] text-neutral-900">
                        Dexterity
                      </p>
                      <p className="mt-2 font-mono text-[0.92rem] text-neutral-800">
                        Relevancy = 0.5
                      </p>
                    </div>
                  </div>

                  <p className="text-[0.96rem] leading-relaxed text-neutral-700">
                    This means Lumberjacking contributes more strongly to Strength
                    XP while still feeding Dexterity XP at a lower weight.
                  </p>
                </div>
              </div>
            </div>

            <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
              <h2 className="mb-5 text-2xl font-semibold tracking-tight text-neutral-900">
                Progression flow
              </h2>

              <div className="grid gap-6 xl:grid-cols-2">
                <div className="straight-outline bg-white/55 px-5 py-5">
                  <h3 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900">
                    Skill progression path
                  </h3>
                  <div className="flex flex-col gap-3">
                    <div className="border border-black/10 px-4 py-4">
                      <p className="text-sm font-semibold tracking-[0.05em] text-neutral-900">
                        1. Action grants Skill XP
                      </p>
                      <p className="mt-1 text-[0.98rem] leading-relaxed text-neutral-700">
                        Combat, gathering, or crafting adds XP to the relevant skill track.
                      </p>
                    </div>
                    <p className="text-center font-mono text-sm text-neutral-700">v</p>
                    <div className="border border-black/10 px-4 py-4">
                      <p className="text-sm font-semibold tracking-[0.05em] text-neutral-900">
                        2. Skill XP updates current skill points
                      </p>
                      <p className="mt-1 font-mono text-[0.9rem] leading-relaxed text-neutral-800">
                        Skill points = floor(sqrt(SkillXP / 25.0))
                      </p>
                    </div>
                    <p className="text-center font-mono text-sm text-neutral-700">v</p>
                    <div className="border border-black/10 px-4 py-4">
                      <p className="text-sm font-semibold tracking-[0.05em] text-neutral-900">
                        3. Skill XP also drives relevant Stat XP
                      </p>
                      <p className="mt-1 text-[0.98rem] leading-relaxed text-neutral-700">
                        Relevance maps decide which stats receive XP from that skill.
                      </p>
                    </div>
                  </div>
                </div>

                <div className="straight-outline bg-white/55 px-5 py-5">
                  <h3 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900">
                    Stat progression path
                  </h3>
                  <div className="flex flex-col gap-3">
                    <div className="border border-black/10 px-4 py-4">
                      <p className="text-sm font-semibold tracking-[0.05em] text-neutral-900">
                        4. Relevant Stat XP is accumulated
                      </p>
                      <p className="mt-1 text-[0.98rem] leading-relaxed text-neutral-700">
                        Stat XP is awarded from the linked skills instead of being fully separate.
                      </p>
                    </div>
                    <p className="text-center font-mono text-sm text-neutral-700">v</p>
                    <div className="border border-black/10 px-4 py-4">
                      <p className="text-sm font-semibold tracking-[0.05em] text-neutral-900">
                        5. Stat XP updates stat points
                      </p>
                      <p className="mt-1 font-mono text-[0.9rem] leading-relaxed text-neutral-800">
                        Stat points = floor(sqrt(StatXP / 50.0))
                      </p>
                    </div>
                    <p className="text-center font-mono text-sm text-neutral-700">v</p>
                    <div className="border border-black/10 px-4 py-4">
                      <p className="text-sm font-semibold tracking-[0.05em] text-neutral-900">
                        6. Stat points unlock more progression space
                      </p>
                      <p className="mt-1 text-[0.98rem] leading-relaxed text-neutral-700">
                        Higher stat totals expand skill capacity and support skill-tree style unlocks that can be purchased using skill points.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : null}

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
          {details.map((detail) => (
            <div
              key={detail.title}
              className="straight-outline bg-white/45 px-5 py-5 backdrop-blur-sm"
            >
              <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900 md:text-[1.22rem]">
                {detail.title}
              </h3>
              {detail.title === "Progression formulae" ? (
                <div className="space-y-3 text-neutral-800">
                  {detail.points.map((point) => (
                    <p
                      key={point}
                      className="border border-black/10 px-3 py-3 font-mono text-[0.9rem] leading-relaxed md:text-[0.94rem]"
                    >
                      {point}
                    </p>
                  ))}
                </div>
              ) : (
                <ul className="flex list-disc flex-col gap-3 pl-5 text-[0.98rem] leading-relaxed text-neutral-700">
                  {detail.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
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
