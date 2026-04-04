import PageIntro from "@/components/PageIntro";
import Video from "@/components/Video";
import { categoryPages, getCategoryFeature } from "@/lib/categoryContent";
import { notFound } from "next/navigation";

const territoryFeatureVideos = {
  brushTool: "https://youtu.be/K6m8qFo6kBg",
  showcase: "https://youtu.be/b_Gtu5fJeIs",
  worldMap: "https://youtu.be/JQMHRbODIFI",
} as const;

const growthFeatureVideos = {
  applicationScaling: "https://youtu.be/1GuvIZdjABE",
  physicalScaling: "https://youtu.be/0PpBRb7ahRw",
  showcase: "https://youtu.be/-raR3aQcT50",
} as const;

const packFeatureVideos = {
  struggle: null,
} as const;

const growthBreakdownItems = [
  "Core Growth Model",
  "Physical Scaling",
  "Animation",
  "Combat",
  "Attributes",
] as const;

const growthTechBreakdownDescription =
  "Growth is a data-driven, attribute based progression system built on top of GAS, designed to seamlessly scale both the character and all dependent gameplay systems.";

const growthCoreModel = {
  benefits: [
    "Fully integrates with GAS for consistency.",
    "Growth is extensible, very easy to rebalance.",
    "Allows for buffs & debuffs via gameplay effects.",
    "In these games we want different players to grow at different rates, depending on their playstyle, for eg:- a diet mechanic, having a good diet that's suited to your creature will make you grow faster!",
  ],
  description:
    "Growth is represented as a gameplay attribute that evolves over time via passive gameplay effects.",
  roles: [
    "Drives continous progression (not step based, but smooth and seamless).",
    "Feeds into all dependent systems (movement, combat, stats).",
    "Allows easy tuning via data tables and curves.",
  ],
} as const;

const growthPhysicalScaling = {
  benefits: [
    "This maintains a stable collision when scaling, transitions are smooth.",
  ],
  description:
    "Physical scaling handles the visible and gameplay-facing body transformation of the creature as it grows.",
  errorCorrection:
    "An upward offset is also added to prevent the character from sinking in the flooor, since scaling is calculated from capsule & skelmesh's origin. More corrections are also applied because these origins can be at different relative locations as well.",
  roles: [
    "For the visual and physical transformation of the player creature, there's relative scaling of the Skeletal Mesh, the player Collision Capsule, and the Collision Volumes of different body parts.",
    "The Movement Speed also scales with growth, with Jump Height and other parameters as well.",
  ],
} as const;

const growthSystems = [
  {
    description:
      "Adjusts animation presentation across growth stages so the creature continues to feel believable as proportions, timing, and locomotion change.",
    title: "Animation",
  },
  {
    description:
      "Ties growth into combat behavior so reach, threat, and gameplay impact scale with the creature's development.",
    title: "Combat",
  },
  {
    description:
      "Updates gameplay stats through growth so movement, survivability, and systemic progression stay aligned with the creature's stage.",
    extraDescription:
      "Since Growth is represented as a Gameplay Attribute, it can be read directly inside the Gameplay Effect Calculation classes and used for scaling calculations such as damage dealt, hit, scan distance, etc.",
    title: "Attributes",
  },
] as const;

const growthFunSystems = {
  description:
    "Allows other systems to have more depth like Footprints where smaller creatures leave smaller footprints, and larger creatures can scan for longer distances but also leave a much stronger and lasting scent, Packs/Groups/Factions where smaller players occupy less space so they can form larger groups.",
  title: "Systemic Gameplay Depth",
} as const;

const growthClosingThoughts = {
  paragraphs: [
    "All of the information for how each system scales with growth can be adjusted using easy-to-use DataTables, DataAssets, and Curves, so designers can tune the system without any code changes.",
    "Growth is seamless and continuous, to the point where players barely notice it happening moment to moment.",
    "Because growth is tied into the surrounding systems, it naturally evolves how those systems function and how the player experiences them over time.",
    "Since it's built on GAS, it also supports multiple players growing simultaneously in multiplayer, each progressing in their own distinct way.",
  ],
  title: "Design Philosophy in Practice",
} as const;

const packSystemOverviewPoints = [
  "Players can form groups, with one player being the leader of the group, also there's a space mechanic tied to player weight which limits how many creatures can be in a certain group.",
  "There are group tiers, and the group leader enjoys some extra buff effects.",
  "Because there are special buffs for the group leader, other members should be able to compete for the leadership position.",
  "Players can also view their pack members on their minimaps and world maps.",
] as const;

const packSystemSolutionPoints = [
  "I built a packs/groups system integrated with GAS that allows players to send invitations and respond to incoming pack invites.",
  "The pack leadership competition mechanic allows group members to challenge for the leadership position through combat.",
  "The struggle system also allows the involved players to surrender, minimizing the overall losses caused to the pack.",
] as const;

const packTechnicalBreakdown = [
  "The Pack WorldSubsystem",
  "The Pack Actor Component",
  "Pack Struggle Gameplay Ability",
] as const;

const packSystemConnections = [
  {
    description:
      "Packs and territories are tightly connected because groups need to contest, claim, and hold territory together. Territory ownership buffs also become more meaningful when tied to organized packs or factions rather than isolated players.",
    title: "Connected to Territories",
  },
  {
    description:
      "Growth feeds directly into pack design through the space and weight rules, because smaller creatures can fit into larger groups while larger creatures change how a pack composes itself. That means Growth doesn't just affect the creature - it also affects group structure and multiplayer strategy.",
    title: "Connected to Growth",
  },
] as const;

const packFutureExtensions = {
  description:
    "This system also opens the door for future alliance mechanics, where different packs or factions can form alliances and control larger regions through multiple connected territories.",
  title: "Future Alliance Possibilities",
} as const;

type PackComponentDetail = {
  benefits?: string[];
  description: string;
  extraList?: string[];
  extraTitle?: string;
  flowQuestions?: {
    answer: string;
    question: string;
  }[];
  introLabel?: string;
  introPoints?: string[];
  roles: string[];
  tag?: string;
  title: string;
};

const packComponents: PackComponentDetail[] = [
  {
    benefits: [
      "Keeps the actual pack information in the authoritative server state, components can fetch data or query it.",
      "Prevents pack leadership and struggle outcomes from being resolved client-side.",
      "Provides one central place for pack queries, validation, and global rule enforcement.",
    ],
    description:
      "The authoritative pack management layer responsible for global pack state, leadership, and struggle resolution.",
    roles: [
      "Server-Only WorldSubsystem which stores global Pack Data, Pack Struggle Data (state info of all active pack struggles for leadership). It&apos;s the single source of truth for all packs state.",
      "Has the internal implementations of critical pack management functions (such initializing, adding, removing, managing leadership etc.) and pack queries.",
      "Validates pack creation, adding members, and starting pack struggles for leadership.",
    ],
    tag: "AUTHORITATIVE PACK STATE",
    title: "Pack WorldSubsystem",
  },
  {
    benefits: [
      "Keeps player-facing pack functionality modular and easy to attach to any creature pawn.",
      "Provides a clean bridge between replicated player state, UI, and the authoritative subsystem.",
      "Makes map visibility, member tracking, and invitation flows easier to maintain per player.",
    ],
    description:
      "Replicated Actor Component that lives on the player pawn.",
    roles: [
      "Handles Pack Invitations & Requests management, inviting and managing active requests.",
      "Stores player pack state.",
      "Manages Pack member widgets for all members of the pack, and updates the pack member locations on the minimap and world map.",
      "Routes all critical logic to the PackSubsystem.",
    ],
    tag: "PLAYER PACK INTERFACE LAYER",
    title: "Pack Actor Component",
  },
  {
    description:
      "Server-Initiated Replicated Gameplay Ability that gets granted by the Pack Subsystem.",
    extraList: [
      "Either Player surrenders.",
      "Either Player dies in an active struggle.",
    ],
    extraTitle: "Pack Struggle ends in 2 ways",
    flowQuestions: [
      {
        answer:
          "When a player takes damage, the Ability System first checks whether the instigator is friendly (in the same pack). If true, it then checks whether the target is the current pack leader. If that is also true, the flow moves through PackComponent -> PackSubsystem, where the server validates whether the struggle can begin and then grants both players the PackStruggleGameplayAbility.",
        question: "How does the struggle start?",
      },
      {
        answer:
          "While the struggle is active, if a player dies while holding the PackStruggleStateGameplayTag, the PackSubsystem's PlayerDiedInPackStruggle() function is executed. The subsystem then determines how leadership should be transferred based on the stored struggle state, applies the result, and clears the struggle state once the handoff is complete.",
        question: "How does the struggle end?",
      },
    ],
    introLabel: "Flow of events",
    introPoints: [
      "On activation, the defender and challenger are both granted the Pack Struggle state through gameplay tags.",
    ],
    roles: [
      "Executes events on the player client side for UI updates on pack struggle (eg:- Press 'X' to give up the struggle and surrender).",
      "Starts an event task on the server to listen for struggle end event (using gameplay tag events).",
    ],
    tag: "LEADERSHIP CONTEST FLOW",
    title: "Pack Struggle Gameplay Ability",
  },
] as const;

type TerritoryComponentDetail = {
  benefits?: string[];
  description: string;
  introPoints?: string[];
  primaryTitle?: string;
  roles: string[];
  secondaryList?: string[];
  secondaryTitle?: string;
  tag: string;
  title: string;
};

const territoryComponents: TerritoryComponentDetail[] = [
  {
    benefits: [
      "Centralizes all critical logic in a secure, authoritative layer.",
      "Which prevents clients from manipulating territory state.",
      "Keeps global decision making decoupled from individual actors.",
    ],
    description:
      "The central authority layer for all territory state, ownership, and contest flow across the game world.",
    roles: [
      "Initializes all the territories, adds & removes them at runtime.",
      "Manages the territory ownership & contesting logic.",
      "Validates whether a territory can be contested.",
      "The single source of truth for all territory state.",
    ],
    tag: "SERVER AUTHORITY LAYER",
    title: "Territory WorldSubsystem",
  },
  {
    benefits: [
      "Keeps territory logic modular and reusable + expandable via blueprints.",
      "Allows designers to place and configure territories directly in the world.",
    ],
    description:
      "An ActorComponent that's attached to the territory volumes, it contains the per territory data & does event handling.",
    roles: [
      "Stores territory specific data (vertices, players, resources & the ownership information).",
      "Handles the overlap events (players entering & leaving).",
      "Tracks all the real-time activity within the territory.",
      "Notifies the WorldSubsystem of state changes.",
      "Serverside handles logic & state updates while the Clientside focuses on visual state and feedback.",
    ],
    tag: "LOCAL TERRITORY LOGIC",
    title: "Territory Actor Component",
  },
  {
    description:
      "When a pack attempts to contest a territory, the world subsystem -",
    introPoints: [
      "Validates whether contesting is allowed/possible, it checks for all the conditions.",
      "If contesting is allowed, the subsystem grants the pack leader the Territory Gameplay Ability.",
    ],
    roles: [
      "The ability starts a timer.",
      "While the timer is active, the group/pack must maintain control, if there are interruptions the timer pauses, if the leader dies the timer ends with failure.",
      "When the timer finishes, the ability ends with SUCCESS and the subsystem updates ownership.",
    ],
    secondaryList: [
      "Integrates naturally with GameplayEffects, Attributes & the player states.",
      "Makes the contesting process extendable with buffs/debuffs, modifiers, etc.",
    ],
    secondaryTitle: "Why GAS here ?",
    tag: "PLAYER LEVEL CONTESTING FLOW",
    title: "Territory Claiming Gameplay Ability",
    primaryTitle: "On Activation",
  },
];

export function generateStaticParams() {
  return categoryPages.first.features.map((feature) => ({ slug: feature.slug }));
}

export default async function FirstFeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = getCategoryFeature("first", slug);

  if (!feature) {
    notFound();
  }

  const animationSystem = growthSystems[0];
  const combatSystem = growthSystems[1];
  const attributesSystem = growthSystems[2];

  const renderVerticalArrowCue = (label: string) => (
    <div className="pointer-events-none hidden items-center gap-px text-neutral-900 lg:flex">
      <svg
        aria-hidden="true"
        viewBox="0 0 24 176"
        className="h-40 w-6"
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
      <p className="-mt-1 text-[0.78rem] tracking-[0.01em] lowercase [writing-mode:vertical-rl] [text-orientation:mixed]">
        {label}
      </p>
    </div>
  );

  const renderVideoSlot = (
    label: string,
    videoUrl: string | null,
    rightCueLabel?: string,
  ) => (
    <div className="relative flex flex-col gap-3">
      {rightCueLabel ? (
        <div className="absolute top-14 right-[-3.5rem] hidden lg:block xl:right-[-5rem]">
          {renderVerticalArrowCue(rightCueLabel)}
        </div>
      ) : null}
      <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
        {label}
      </h2>
      {videoUrl ? (
        <Video videoUrl={videoUrl} outlined />
      ) : (
        <div className="straight-outline straight-outline-video relative w-full overflow-hidden pt-[56.25%] bg-white/35">
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm tracking-[0.08em] text-neutral-700/80">
            Video slot ready - add URL
          </div>
        </div>
      )}
    </div>
  );

  return (
    <>
      <PageIntro title={feature.title} description={feature.description} />

      {slug === "multiplayer-territory-system" ? (
        <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-10 px-4 py-8 md:px-6 md:py-12">
          <div className="absolute top-8 right-[-3.5rem] hidden lg:block xl:right-[-5rem]">
            {renderVerticalArrowCue("showcase")}
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
              Objectives
            </h2>
            <ol className="flex list-decimal flex-col gap-4 pl-6 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              <li>
                Territories in the game world map that can be contested by
                different packs or factions, and gives some buff effects to the
                owning faction when they are in their territory.
              </li>
              <li>
                Designers need a way to create territories without much
                programmer support.
              </li>
            </ol>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
              Solution
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              I built a brush based territory system with a modular component
              architecture.
            </p>
          </div>

          {renderVideoSlot("Brush Tool Demo", territoryFeatureVideos.brushTool)}

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
              Technical Breakdown
            </h2>
            <p className="mb-5 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              This system works using 3 components.
            </p>
            <div className="flex flex-col gap-3">
              {territoryComponents.map((component, index) => (
                <div
                  key={component.title}
                  className={
                    index < territoryComponents.length - 1
                      ? "flex flex-col gap-2 border-b border-black/10 pb-3"
                      : "flex flex-col gap-2"
                  }
                >
                  <span className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
                    {index + 1}. {component.title}
                  </span>
                  <span className="w-fit border border-black/70 px-3 py-1 text-[0.72rem] font-semibold tracking-[0.08em] text-neutral-800">
                    {component.tag}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {territoryComponents.map((component) => (
              <div
                key={component.title}
                className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm"
              >
                <h3 className="mb-3 text-xl font-semibold tracking-tight text-neutral-900 md:text-[1.4rem]">
                  {component.title}
                </h3>
                {!component.introPoints ? (
                  <p className="mb-5 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
                    {component.description}
                  </p>
                ) : null}

                <div className={component.title === "Pack Struggle Gameplay Ability" ? "block" : "grid gap-6 md:grid-cols-2"}>
                  <div>
                    {component.introPoints ? (
                      <>
                        <div className="mb-5">
                          <p className="mb-3 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
                            {component.description}
                          </p>
                          <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                            {component.introPoints.map((point) => (
                              <li key={point}>{point}</li>
                            ))}
                          </ul>
                        </div>
                        <div className="ml-2 border border-black/10 px-4 py-4">
                          <h4 className="mb-3 text-sm font-semibold tracking-[0.04em] text-neutral-900">
                            {component.primaryTitle ?? "Roles"}
                          </h4>
                          <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                            {component.roles.map((role) => (
                              <li key={role}>{role}</li>
                            ))}
                          </ul>
                        </div>
                      </>
                    ) : (
                      <h4 className="mb-3 text-sm font-semibold tracking-[0.04em] text-neutral-900">
                        {component.primaryTitle ?? "Roles"}
                      </h4>
                    )}
                    {!component.introPoints ? (
                      <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                        {component.roles.map((role) => (
                          <li key={role}>{role}</li>
                        ))}
                      </ul>
                    ) : null}
                  </div>

                  <div>
                    <h4 className="mb-3 text-sm font-semibold tracking-[0.04em] text-neutral-900">
                      {component.secondaryTitle ?? "Benefits"}
                    </h4>
                    <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                      {(component.secondaryList ?? component.benefits ?? []).map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
              Dynamic World Map Rendering
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              Territory shapes on the world map are rendered dynamically from the
              real territory data placed in the game world. That means designers
              can create any territory shape they want with the brush tool, and
              the map automatically builds the matching interactable territory
              buttons from that live structure.
            </p>
          </div>

          {renderVideoSlot(
            "Dynamic World Map Demo",
            territoryFeatureVideos.worldMap,
          )}

          {renderVideoSlot(
            "Territory Showcase",
            territoryFeatureVideos.showcase,
            "more stuff",
          )}

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Design Benefits & Adding more fun stuff!
            </h2>

            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900">
                  Design Benefits
                </h3>
                <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                  <li>
                    Server Authority - All critical decisions and logic are
                    handled server-side.
                  </li>
                  <li>
                    All the parts of this system are decoupled (Subsystem /
                    Component / Ability).
                  </li>
                  <li>
                    It&apos;s scalable, multiple territories are updated
                    simultaneously.
                  </li>
                  <li>
                    Territories can be created and configured by designers
                    without any engineering involvement.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900">
                  Future Territory Extensions
                </h3>
                <p className="mb-4 text-[1rem] leading-relaxed text-neutral-700">
                  One of the many exciting things that this system allows is for
                  new territory mechanics without modifying the core systems.
                </p>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Example :- Territory events in a large map, special modifiers
                  on certain territories.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {slug === "growth-system" ? (
        <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <p className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              It&apos;s used in games like &apos;The Isle&apos; which is a multiplayer game where you
              play as dinosaurs and your objective is to grow your creature from
              a small hatchling to a fully grown adult.
            </p>
          </div>

          {renderVideoSlot("Growth Showcase", growthFeatureVideos.showcase)}

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
              Tech Breakdown
            </h2>
            <p className="mb-5 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              {growthTechBreakdownDescription}
            </p>
            <ol className="flex list-decimal flex-col gap-3 pl-6 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              {growthBreakdownItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h3 className="mb-3 text-xl font-semibold tracking-tight text-neutral-900 md:text-[1.4rem]">
              Core Growth Model
            </h3>
            <p className="mb-5 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              {growthCoreModel.description}
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 text-sm font-semibold tracking-[0.04em] text-neutral-900">
                  Roles
                </h4>
                <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                  {growthCoreModel.roles.map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold tracking-[0.04em] text-neutral-900">
                  Benefits
                </h4>
                <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                  {growthCoreModel.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h3 className="mb-3 text-xl font-semibold tracking-tight text-neutral-900 md:text-[1.4rem]">
              Physical Scaling
            </h3>
            <p className="mb-5 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              {growthPhysicalScaling.description}
            </p>

            <div className="grid gap-6 md:grid-cols-2">
              <div>
                <h4 className="mb-3 text-sm font-semibold tracking-[0.04em] text-neutral-900">
                  Roles
                </h4>
                <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                  {growthPhysicalScaling.roles.map((role) => (
                    <li key={role}>{role}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h4 className="mb-3 text-sm font-semibold tracking-[0.04em] text-neutral-900">
                  Benefits
                </h4>
                <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                  {growthPhysicalScaling.benefits.map((benefit) => (
                    <li key={benefit}>{benefit}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-6 border border-black/10 px-4 py-4">
              <h4 className="mb-3 text-sm font-semibold tracking-[0.04em] text-neutral-900">
                Error Correction
              </h4>
              <p className="text-[1rem] leading-relaxed text-neutral-700">
                {growthPhysicalScaling.errorCorrection}
              </p>
            </div>
          </div>

          {renderVideoSlot(
            "Capsule Scaling Demo",
            growthFeatureVideos.physicalScaling,
            "more stuff",
          )}

          <div className="grid gap-6 md:grid-cols-2">
            <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
              <h3 className="mb-3 text-xl font-semibold tracking-tight text-neutral-900">
                {animationSystem.title}
              </h3>
              <p className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
                {animationSystem.description}
              </p>
            </div>

            <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
              <h3 className="mb-3 text-xl font-semibold tracking-tight text-neutral-900">
                {combatSystem.title}
              </h3>
              <p className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
                {combatSystem.description}
              </p>
            </div>
          </div>

          <div className="grid gap-6 md:grid-cols-[1fr_0.72fr]">
            <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
              <h3 className="mb-3 text-xl font-semibold tracking-tight text-neutral-900">
                {attributesSystem.title}
              </h3>
              <p className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
                {attributesSystem.description}
              </p>
              {"extraDescription" in attributesSystem ? (
                <p className="mt-4 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
                  {attributesSystem.extraDescription}
                </p>
              ) : null}
            </div>

            <div className="flex flex-col gap-3 self-start">
              <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
                Attack Trace Scaling Demo
              </h3>
              {growthFeatureVideos.applicationScaling ? (
                <div className="max-w-full">
                  <Video videoUrl={growthFeatureVideos.applicationScaling} outlined />
                </div>
              ) : (
                <div className="straight-outline straight-outline-video relative w-full overflow-hidden pt-[56.25%] bg-white/35">
                  <div className="absolute inset-0 flex items-center justify-center px-4 text-center text-xs tracking-[0.08em] text-neutral-700/80">
                    Video slot ready - add URL
                  </div>
                </div>
              )}
            </div>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h3 className="mb-3 text-xl font-semibold tracking-tight text-neutral-900 md:text-[1.4rem]">
              {growthFunSystems.title}
            </h3>
            <p className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              {growthFunSystems.description}
            </p>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h3 className="mb-4 text-xl font-semibold tracking-tight text-neutral-900 md:text-[1.4rem]">
              {growthClosingThoughts.title}
            </h3>
            <div className="flex flex-col gap-4 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              {growthClosingThoughts.paragraphs.map((paragraph) => (
                <p key={paragraph}>{paragraph}</p>
              ))}
            </div>
          </div>
        </section>
      ) : null}

      {slug === "pack-faction-system" ? (
        <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
              System Goals
            </h2>
            <ul className="flex list-disc flex-col gap-4 pl-5 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              {packSystemOverviewPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
              Gameplay Solution
            </h2>
            <ul className="flex list-disc flex-col gap-4 pl-5 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              {packSystemSolutionPoints.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
              Technical Breakdown
            </h2>
            <p className="mb-5 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              This system works using 3 components.
            </p>
            <ol className="flex list-decimal flex-col gap-3 pl-6 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              {packTechnicalBreakdown.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ol>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Packs Demo
            </h2>
            {packFeatureVideos.struggle ? (
              <Video videoUrl={packFeatureVideos.struggle} outlined />
            ) : (
              <div className="straight-outline straight-outline-video relative w-full overflow-hidden pt-[56.25%] bg-white/35">
                <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm tracking-[0.08em] text-neutral-700/80">
                  Video slot ready - add URL
                </div>
              </div>
            )}
          </div>

          <div className="flex flex-col gap-6">
            {packComponents.map((component) => (
              <div
                key={component.title}
                className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm"
              >
                <h3 className="mb-3 text-xl font-semibold tracking-tight text-neutral-900 md:text-[1.4rem]">
                  {component.title}
                </h3>
                <p className="mb-5 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
                  {component.description}
                </p>

                {component.tag ? (
                  <div className="mb-5">
                    <span className="w-fit border border-black/70 px-3 py-1 text-[0.72rem] font-semibold tracking-[0.08em] text-neutral-800">
                      {component.tag}
                    </span>
                  </div>
                ) : null}

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    {component.title !== "Pack Struggle Gameplay Ability" ? (
                      <h4 className="mb-3 text-sm font-semibold tracking-[0.04em] text-neutral-900">
                        {component.introLabel ?? "Core Responsibilities"}
                      </h4>
                    ) : null}
                    <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                      {component.roles.map((role) => (
                        <li key={role}>{role}</li>
                      ))}
                    </ul>
                  </div>

                  {component.benefits ? (
                    <div>
                      <h4 className="mb-3 text-sm font-semibold tracking-[0.04em] text-neutral-900">
                        Benefits
                      </h4>
                      <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                        {component.benefits.map((benefit) => (
                          <li key={benefit}>{benefit}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                {component.extraTitle && component.extraList ? (
                  <div className="mt-6">
                    <h4 className="mb-3 text-sm font-semibold tracking-[0.04em] text-neutral-900">
                      {component.extraTitle}
                    </h4>
                    <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                      {component.extraList.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                ) : null}

                {component.introPoints ? (
                  <div className="mt-6 border border-black/10 px-4 py-4">
                    {component.title === "Pack Struggle Gameplay Ability" ? (
                      <div>
                        <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                          {component.introPoints.map((point) => (
                            <li key={point}>{point}</li>
                          ))}
                        </ul>
                        {component.flowQuestions ? (
                          <div className="mt-5 flex flex-col gap-4">
                            {component.flowQuestions.map((item) => (
                              <div key={item.question} className="flex flex-col gap-1">
                                <p className="font-semibold text-neutral-900">
                                  {item.question}
                                </p>
                                <p className="text-[1rem] leading-relaxed text-neutral-700">
                                  {item.answer
                                    .split("PlayerDiedInPackStruggle()")
                                    .map((part, index, array) => (
                                      <span key={`${item.question}-${index}`}>
                                        {part}
                                        {index < array.length - 1 ? (
                                          <span className="font-medium text-neutral-900">
                                            PlayerDiedInPackStruggle()
                                          </span>
                                        ) : null}
                                      </span>
                                    ))}
                                </p>
                              </div>
                            ))}
                          </div>
                        ) : null}
                      </div>
                    ) : (
                      <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                        {component.introPoints.map((point) => (
                          <li key={point}>{point}</li>
                        ))}
                      </ul>
                    )}
                  </div>
                ) : null}
              </div>
            ))}
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              How it connects with the rest of the game
            </h2>

            <div className="grid gap-6 md:grid-cols-2">
              {packSystemConnections.map((item) => (
                <div key={item.title} className="flex flex-col gap-3">
                  <h3 className="text-lg font-semibold tracking-tight text-neutral-900">
                    {item.title}
                  </h3>
                  <p className="text-[1rem] leading-relaxed text-neutral-700 md:text-[1.05rem]">
                    {item.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
              {packFutureExtensions.title}
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              {packFutureExtensions.description}
            </p>
          </div>
        </section>
      ) : null}
    </>
  );
}
