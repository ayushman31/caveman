import PageIntro from "@/components/PageIntro";
import Video from "@/components/Video";
import { categoryPages, getCategoryFeature } from "@/lib/categoryContent";
import Link from "next/link";
import { notFound } from "next/navigation";

const wizardFeatureVideos = {
  combat: null,
  movement: null,
} as const;

const pounceFeatureVideos = {
  showcase: null,
} as const;

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

export function generateStaticParams() {
  return categoryPages.second.features.map((feature) => ({ slug: feature.slug }));
}

export default async function SecondFeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = getCategoryFeature("second", slug);

  if (!feature) {
    notFound();
  }

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
        <div className="straight-outline straight-outline-video relative w-full overflow-hidden bg-white/35 pt-[56.25%]">
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

      {slug === "wizard-combat-movement" ? (
        <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pt-0 pb-8 md:px-6 md:pb-12">
          <div className="absolute top-0 right-[-3.5rem] hidden lg:block xl:right-[-5rem]">
            {renderVerticalArrowCue("showcase")}
          </div>

          <div className="straight-outline bg-white/45 px-6 py-5 backdrop-blur-sm">
            <p className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              The Wizard game&apos;s locomotion is built on a replicated C++
              extension of the Advanced Locomotion System. I started from a
              foundation that already felt strong, then reshaped it to better
              fit the game&apos;s pace, combat flow, and overall player feel.
            </p>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Movement
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Extensions for base locomotion
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  On top of the replicated ALS-style base, I added custom
                  extensions to the animation graph, expanded pose sequences,
                  and fine-tuned locomotion parameters to get the right feel for
                  player movement, rotation, and camera motion.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Ability specific movement
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Each ability has its own movement parameters, animation assets
                  for different states, and camera settings, allowing spells and
                  actions to define their own speed changes, directional
                  control, camera behavior, and animation response.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Movement Abilities
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Dedicated movement abilities extend the Character Movement
                  Component with custom movement modes such as dashes, turning
                  repositioning and mobility into a deliberate part of the
                  combat loop rather than just an extension of base locomotion.
                </p>
              </div>
            </div>
          </div>

          {renderVideoSlot("Movement Video", wizardFeatureVideos.movement)}

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Combat
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Primary Projectile attacks
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Projectile attacks are built through a generic ability setup
                  that supports dedicated animation assets, projectile data for
                  multiple projectile types, cooldowns, and gameplay effects.
                  Each projectile type is structured around three variants:
                  Light, Standard, and Superior.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Spawner Abilities
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Spawner abilities use a generic ability setup that supports
                  different kinds of ability actors and spawning techniques,
                  including direct spawning and targeted spawning. The same
                  setup also supports dedicated animation sets, camera settings,
                  costs, cooldowns, and gameplay effects.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Ability Actors
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Ability actors are used by spawner abilities and are built as
                  generic actors with different variants. For example, they can
                  be damageable, attach to players, or apply area damage. These
                  actors define the ability behavior itself and are used for
                  things like ice walls, the area damage sphere for Ember
                  Storm, and similar gameplay-driven spell actors.
                </p>
              </div>
            </div>
          </div>

          {renderVideoSlot(
            "Combat Video",
            wizardFeatureVideos.combat,
            "more stuff",
          )}

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Advantages of this design
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Reusable ability framework
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Generic setups for projectiles, spawners, and ability actors
                  make it much easier to build new spells and variants without
                  rewriting core ability logic every time.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Better designer iteration
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Movement, animation, camera behavior, cooldowns, costs, and
                  effects are exposed through a consistent structure, which
                  makes balancing and content iteration much faster.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Cleaner GAS integration
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Separating locomotion, ability configuration, spawned actors,
                  gameplay effects, and cooldown handling keeps the ability
                  architecture cleaner and easier to scale inside GAS.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Stronger multiplayer structure
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Keeping movement logic, spawned actors, and ability-driven
                  combat behavior modular makes replication boundaries clearer
                  and supports a more reliable multiplayer setup.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Better gameplay feel
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Fine-grained control over locomotion, per-ability movement,
                  animation states, and camera behavior helps each action feel
                  more responsive, readable, and satisfying for the player.
                </p>
              </div>
            </div>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Long-term Gameplay Depth
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Talent-driven builds
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  The abilities are extended further through talent trees,
                  allowing deep player customization and supporting different
                  multiplayer builds instead of forcing every player into the
                  same spell setup.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Flexible class identity
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Different playable classes can be built in distinct ways by
                  using different animation data assets on the player class and
                  across abilities, letting each class maintain its own motion
                  language and gameplay identity.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5 md:col-span-2">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Strong use of ALS overlays
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  A big strength of the setup is how well it uses ALS&apos;s Overlay
                  system to control poses and animations the way we want while
                  still preserving a strong overall feel across all playable
                  classes. That makes it easier to push class variety without
                  losing consistency in movement quality.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {slug === "pounce-latch-mechanics" ? (
        <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pt-0 pb-8 md:px-6 md:pb-12">
          <div className="absolute top-0 right-[-3.5rem] hidden lg:block xl:right-[-5rem]">
            {renderVerticalArrowCue("showcase")}
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Description
            </h2>
            <div className="flex flex-col gap-5 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              <p>
                This is a special combat ability I built for the Achillobator
                character class in Primeval Horizon. The mechanic is tightly
                connected to the{" "}
                <Link
                  href="/first/growth-system"
                  className="underline decoration-black/40 underline-offset-4 transition hover:decoration-black/80"
                >
                  Growth System
                </Link>
                , because growth directly affects how the ability executes.
              </p>

              <p>
                When playing as an Achillobator, the player can activate
                Pounce to launch in a chosen direction. The pounce itself is
                implemented as a custom Mover movement mode. If the player lands
                on the ground, the ability ends immediately. If the pounce hits
                another player, the ability branches into either a Latch or a
                Pin.
              </p>

              <p>
                If the attacking creature is larger than the target, the player
                pins the target, stopping both the target&apos;s movement and the
                attacker&apos;s movement while the Pin remains active. If the target
                is larger, the player instead latches onto one of that
                creature&apos;s latch slots, allowing the target to keep moving
                while the latch continues.
              </p>

              <p>
                In both outcomes, the ability applies instant hit damage on
                contact and then continues dealing periodic damage while the
                effect stays active. The ability ends when the player releases
                the input or runs out of stamina.
              </p>

              <p>
                Pounce distance, jump height, stamina costs, damage, and other
                related values all scale with growth, which helps the mechanic
                evolve naturally alongside the creature&apos;s progression.
              </p>
            </div>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Ability Breakdown
            </h2>
            <div className="grid gap-5 md:grid-cols-3">
              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Pounce
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  The entry point of the mechanic is a directional leap built as
                  a custom Mover movement mode, giving tight control over launch
                  behavior, travel, and collision handling.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Latch
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  If the target is larger, the attacking player attaches to one
                  of that creature&apos;s latch slots, allowing the target to remain
                  mobile while the attacker continues dealing pressure over time.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Pin
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  If the attacking creature is larger, the ability converts into
                  a pin that locks both players in place, turning the mechanic
                  into a committed control state instead of a mobile latch.
                </p>
              </div>
            </div>
          </div>

          {renderVideoSlot("Pounce & Latch Video", pounceFeatureVideos.showcase, "more stuff")}

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Why this design works
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Strong class identity
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  The mechanic gives the Achillobator a distinct combat role,
                  making it feel mechanically different from other playable
                  creatures rather than just another damage ability.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Growth-driven depth
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Because the mechanic scales with growth, its behavior stays
                  relevant across progression and creates a stronger connection
                  between combat and the creature&apos;s development.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Clear outcome logic
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  The size check creates an easy-to-read branch between Pin and
                  Latch, which makes the mechanic more understandable while also
                  producing varied combat outcomes.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Good multiplayer tension
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  The instant impact, periodic damage, stamina drain, and manual
                  release conditions combine into an interaction that feels tense
                  and readable in multiplayer encounters.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}

      {slug === "ability-system-framework" ? (
        <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 pt-0 pb-8 md:px-6 md:pb-12">
          <div className="absolute top-0 right-[-3.5rem] hidden lg:block xl:right-[-5rem]">
            {renderVerticalArrowCue("showcase")}
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Approach
            </h2>
            <div className="flex flex-col gap-5 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              <p>
                This page is about how I approach building gameplay mechanics
                with GAS. Rather than treating the Gameplay Ability System as
                just a place to execute abilities, I use it as the foundation
                for structuring combat, movement, costs, cooldowns, effects, and
                interaction rules in a way that stays reusable across a full
                project.
              </p>

              <p>
                My focus is on setting up the core architecture early so new
                mechanics can be built quickly without each feature becoming its
                own one-off implementation. That usually starts with extending
                the Ability System Component, building strong base ability
                classes, and adding the supporting systems needed for targeting,
                effect execution, and richer gameplay context.
              </p>
            </div>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Core Building Blocks
            </h2>
            <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Ability System Component
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  I extend the Ability System Component with the project-level
                  functionality I expect mechanics to rely on, so common ability
                  logic has a stable place to live instead of being duplicated
                  across many individual abilities.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Base Ability Classes
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  I build base ability classes that define shared patterns for
                  activation, cancellation, costs, cooldowns, animation hooks,
                  and effect application, so new mechanics inherit consistent
                  behavior from the start.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Target Data
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  I set up Target Data carefully so abilities can pass rich,
                  structured targeting information through the system instead of
                  relying on narrow hardcoded assumptions.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Custom Effect Contexts
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  I use custom Effect Contexts when abilities need more
                  information than the default setup provides, which helps carry
                  the exact gameplay context needed into effect execution.
                </p>
              </div>
            </div>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-6 text-2xl font-semibold tracking-tight text-neutral-900">
              Why I set it up this way
            </h2>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Faster mechanic development
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Once the core GAS layer is set up properly, I can build new
                  mechanics much faster because I am composing from existing
                  systems instead of rebuilding ability flow from scratch.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Cleaner technical design
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  Shared rules for costs, cooldowns, targeting, and effect logic
                  keep mechanics more predictable, easier to debug, and easier
                  to scale as the project grows.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Better reuse across projects
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  This approach gives me a reusable framework I can carry from
                  one project to another, adapting it to different gameplay
                  styles without losing the same strong underlying structure.
                </p>
              </div>

              <div className="border border-black/10 px-5 py-5">
                <h3 className="mb-3 text-lg font-semibold tracking-tight text-neutral-900">
                  Strong Wizard game results
                </h3>
                <p className="text-[1rem] leading-relaxed text-neutral-700">
                  In the Wizard game, this structure is a big part of why the
                  combat design stays clean: projectile abilities, spawner
                  abilities, movement abilities, costs, cooldowns, and gameplay
                  effects all fit into the same technical language.
                </p>
              </div>
            </div>
          </div>
        </section>
      ) : null}
    </>
  );
}
