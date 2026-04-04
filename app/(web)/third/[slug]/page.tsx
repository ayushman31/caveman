import PageIntro from "@/components/PageIntro";
import Video from "@/components/Video";
import { categoryPages, getCategoryFeature } from "@/lib/categoryContent";
import { notFound } from "next/navigation";

const footprintFeatureVideos = {
  showcase: "https://www.youtube.com/watch?v=gvTY96CtRFc",
} as const;

const footprintSystemComponents = [
  {
    description:
      "Attached to creatures and responsible for spawning, storing, and cleaning up footprint instances. Animation notifies trigger spawn events, footprint transforms are calculated from foot sockets, and the visual footprints are rendered through an Instanced Static Mesh component for efficiency.",
    primaryTitle: "Responsibilities",
    roles: [
      "Receives left/right foot spawn events from animation.",
      "Creates footprint instances using an ISM-based setup.",
      "Tracks spawn time, transform, and lifetime for each footprint.",
      "Handles cleanup through timer-driven lifetime expiration and max-count limits.",
    ],
    secondaryTitle: "Notable Details",
    secondaryList: [
      "Footprint transforms are grounded with a downward line trace before being placed.",
      "Custom instance data is used to drive material parameters like size, left/right foot, and scan-effect state.",
      "Lifetime, update frequency, and footprint count are configurable and intended to scale with creature stats.",
    ],
    title: "Footprint Component",
  },
  {
    description:
      "Acts as the world-level coordinator for footprint visibility in multiplayer. When a footprint event happens on the server, the subsystem looks for relevant nearby pawns and forwards the footprint spawn event only to those clients.",
    primaryTitle: "Responsibilities",
    roles: [
      "Receives footprint spawn requests from the footprint component.",
      "Performs a nearby pawn overlap query around the footprint owner.",
      "Finds valid footprint components on overlapping pawns.",
      "Notifies relevant clients to spawn the footprint locally.",
    ],
    secondaryTitle: "Why It Matters",
    secondaryList: [
      "Avoids treating footprints like globally replicated actors.",
      "Keeps footprint visibility focused on players who are actually nearby.",
      "Provides a clean place for multiplayer relevance logic to live.",
    ],
    title: "Footprint Subsystem",
  },
] as const;

export function generateStaticParams() {
  return categoryPages.third.features.map((feature) => ({ slug: feature.slug }));
}

export default async function ThirdFeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = getCategoryFeature("third", slug);

  if (!feature) {
    notFound();
  }

  return (
    <>
      <PageIntro title={feature.title} description={feature.description} />

      {slug === "footprint-tracking-system" ? (
        <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
              Objectives
            </h2>
            <ol className="flex list-decimal flex-col gap-4 pl-6 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              <li>
                Create a footprint tracking system that can support multiplayer
                gameplay at scale without turning every footprint into an
                expensive replicated actor.
              </li>
              <li>
                Keep the system readable and extensible so footprints can carry
                gameplay meaning, including scan-driven interactions and scaling
                based on creature stats.
              </li>
            </ol>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
              Solution
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              I built the system around two main pieces: a per-creature
              footprint component that manages footprint creation and lifetime,
              and a world subsystem that decides which nearby clients should be
              notified when new footprints appear.
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <h2 className="text-2xl font-semibold tracking-tight text-neutral-900">
              Showcase
            </h2>
            <Video videoUrl={footprintFeatureVideos.showcase} outlined />
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-5 text-2xl font-semibold tracking-tight text-neutral-900">
              Technical Breakdown
            </h2>
            <p className="mb-5 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              This system works through 2 main gameplay pieces.
            </p>
            <div className="flex flex-col gap-3">
              {footprintSystemComponents.map((component, index) => (
                <div
                  key={component.title}
                  className={
                    index < footprintSystemComponents.length - 1
                      ? "flex flex-col gap-2 border-b border-black/10 pb-3"
                      : "flex flex-col gap-2"
                  }
                >
                  <span className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
                    {index + 1}. {component.title}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="flex flex-col gap-6">
            {footprintSystemComponents.map((component) => (
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

                <div className="grid gap-6 md:grid-cols-2">
                  <div>
                    <h4 className="mb-3 text-sm font-semibold tracking-[0.04em] text-neutral-900">
                      {component.primaryTitle}
                    </h4>
                    <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                      {component.roles.map((role) => (
                        <li key={role}>{role}</li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="mb-3 text-sm font-semibold tracking-[0.04em] text-neutral-900">
                      {component.secondaryTitle}
                    </h4>
                    <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                      {component.secondaryList.map((item) => (
                        <li key={item}>{item}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Design Benefits
            </h2>
            <div className="grid gap-8 md:grid-cols-2">
              <div>
                <h3 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900">
                  Multiplayer Benefits
                </h3>
                <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                  <li>
                    Footprints are not treated like fully replicated actors,
                    which helps avoid unnecessary network cost.
                  </li>
                  <li>
                    Relevance is handled at the subsystem level, so only nearby
                    players are notified about new footprint events.
                  </li>
                  <li>
                    The server stays in charge of footprint events while clients
                    only receive the visual data they need.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900">
                  Gameplay Benefits
                </h3>
                <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                  <li>
                    Footprint visuals can scale with creature stats such as
                    size, letting the system support progression and creature
                    variety.
                  </li>
                  <li>
                    Material custom data allows the same system to support extra
                    gameplay-facing states like scan highlighting.
                  </li>
                  <li>
                    The component/subsystem split keeps the architecture easier
                    to extend for scent trails and future tracking mechanics.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {slug === "replication-strategy" ? (
        <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
              Objectives
            </h2>
            <ol className="flex list-decimal flex-col gap-4 pl-6 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              <li>
                Build multiplayer systems that stay server-authoritative where
                it matters, while still feeling responsive and scalable in real
                gameplay scenarios.
              </li>
              <li>
                Avoid over-replicating gameplay state by deciding carefully what
                should be authoritative, what should be client-driven, and what
                should only be sent to relevant nearby players.
              </li>
            </ol>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
              Approach
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              My replication strategy is built around keeping the server in
              charge of important gameplay decisions, then distributing only the
              information that other players actually need. In practice, that
              means I try to avoid turning every gameplay object into a heavily
              replicated actor and instead use targeted RPCs, relevance checks,
              and subsystem-driven coordination where it makes sense.
            </p>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Core Principles
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Server authority first
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  The server should own important gameplay events and state
                  changes, especially anything that affects combat outcomes,
                  shared world state, or multiplayer fairness.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Relevance over broadcast
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Not every event needs to be replicated to everyone. I prefer
                  notifying only the players who are actually close enough or
                  otherwise relevant to the interaction.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Separate logic from presentation
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  I try to replicate the gameplay event itself, then let clients
                  handle the local presentation layer when possible instead of
                  replicating every visual detail as persistent network state.
                </p>
              </div>
            </div>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Example: Footprint System
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Event-driven replication
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Footprints are triggered from animation events, sent to the
                  server, and then distributed outward as footprint events
                  rather than existing as fully replicated world actors.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Nearby-client filtering
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  The footprint subsystem performs a nearby overlap query and
                  only notifies relevant pawns, which keeps the system more
                  scalable than broadcasting footprint updates globally.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Lightweight client-side rendering
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Once clients receive the event, the footprint component builds
                  the visual result locally through instanced mesh data and
                  timer-based cleanup rather than expensive replicated footprint
                  actors.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Clear system boundaries
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  The footprint component owns footprint creation and lifetime,
                  while the subsystem owns relevance decisions, which keeps the
                  networking responsibilities easier to reason about.
                </p>
              </div>
            </div>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Why this works well
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Better scalability
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Relevance-based distribution helps reduce unnecessary network
                  traffic, which becomes more important as player counts and
                  systemic world interactions grow.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Cleaner multiplayer architecture
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Separating authority, relevance, and visual presentation leads
                  to systems that are easier to debug, extend, and reuse across
                  multiplayer features.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  More intentional bandwidth use
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  This approach forces better decisions about what data actually
                  needs to travel over the network and what can stay local to a
                  client once the important event has been confirmed.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Consistent with my other systems
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  The same thinking carries into my other gameplay systems too:
                  keep the core rules authoritative, keep responsibilities clear,
                  and avoid replicating more than the design really needs.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {slug === "multiplayer-gameplay-architecture" ? (
        <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
              What this page is about
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              This page is about how I approach gameplay architecture across a
              full multiplayer project. I do not like treating abilities,
              replication, and larger game systems as isolated features. I want
              them to fit into one shared framework that stays modular,
              data-driven, and scalable as the project grows.
            </p>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Core Pillars
            </h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Ability foundations
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  I like to start by building strong foundations through GAS,
                  with reusable base ability classes, shared targeting patterns,
                  effect handling, and consistent cost and cooldown logic.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Multiplayer rules
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Replication is designed around server authority, relevance,
                  and intentional data flow, so gameplay stays fair without
                  sending more state across the network than the design really
                  needs.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  System-wide integration
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  I want mechanics to connect cleanly with wider systems like
                  territories, packs, growth, tracking, and combat, instead of
                  existing as isolated features with their own disconnected
                  rules.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Data-driven control
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  I try to keep behavior configurable through data wherever it
                  makes sense, so systems can be tuned, extended, and rebalanced
                  without needing code changes for every content decision.
                </p>
              </div>
            </div>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              How I structure these systems
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Shared technical language
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  I try to give abilities, actors, subsystems, and components a
                  shared technical language so they can interact cleanly,
                  instead of every mechanic inventing its own structure and
                  becoming harder to connect later.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Clear ownership boundaries
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Components own local feature logic, subsystems coordinate
                  larger game-wide responsibilities, and the server owns the
                  critical decisions that affect shared gameplay outcomes. That
                  separation helps keep systems understandable as they grow.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Reusable mechanic patterns
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Once a mechanic pattern works well, I prefer to generalize it
                  into a reusable setup so future abilities and systems can be
                  built by extension instead of duplication.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Designed for extension
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  I try to make room for future mechanics from the start,
                  whether that means new ability variants, new multiplayer rules,
                  or new interactions between systems that are already in place.
                </p>
              </div>
            </div>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Example: Wizard Game
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Ability framework
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  In the Wizard game, projectile abilities, spawner abilities,
                  movement abilities, cooldowns, costs, animation hooks, and
                  gameplay effects all sit inside the same structured
                  framework. That makes it much easier to add new mechanics
                  without each one becoming a custom one-off.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Replication-aware design
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Because mechanics are designed with networking in mind from the
                  start, it becomes easier to decide what should be authoritative,
                  what should be locally presented, and how multiplayer state
                  should flow across the project.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Data-driven tuning
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Parameters for movement, projectiles, spawned actors, and
                  effect behavior can be tuned through a consistent data-driven
                  setup, which makes balancing and iteration much more practical
                  during development.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Better long-term scalability
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  That combination of shared ability structure, multiplayer-aware
                  thinking, and data-driven design is a big part of why the
                  project stays easier to expand over time without losing
                  technical clarity.
                </p>
              </div>
            </div>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Why this matters to me
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Better engineering decisions
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  It helps me make stronger decisions earlier, because I am
                  thinking about mechanics, networking, extensibility, and game
                  systems as one connected design problem instead of solving each
                  part in isolation.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Easier team iteration
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  A structured architecture makes it easier for designers and
                  engineers to work within the same system instead of fighting a
                  growing collection of one-off gameplay implementations.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Stronger feature connections
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Systems like growth, packs, territories, footprints, and
                  abilities become more valuable when they are built to interact
                  cleanly rather than staying siloed from one another.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  More durable projects
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  This kind of architecture creates projects that hold up better
                  over time, because new mechanics and systems can be layered on
                  top of solid foundations instead of forcing rewrites every time
                  the game grows in scope.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
