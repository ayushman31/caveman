import PageIntro from "@/components/PageIntro";
import { categoryPages, getCategoryFeature } from "@/lib/categoryContent";
import { notFound } from "next/navigation";

const moverSystemComponents = [
  {
    description:
      "The foundation of the setup is an extended MoverComponent paired with a PlayerPawn that acts as the input producer. The mover owns the movement simulation and registered modes, while the pawn is responsible for collecting player intent and feeding it into the system in a way that stays cleanly separated from the movement logic itself.",
    primaryTitle: "Responsibilities",
    roles: [
      "Uses the custom MoverComponent as the central authority for movement simulation and mode registration.",
      "Lets PlayerPawn produce input intent instead of embedding input gathering directly inside movement code.",
      "Supports movement modes such as grounded, falling, swimming, and project-specific extensions.",
      "Keeps gameplay-facing state available to animation, abilities, and other systems.",
    ],
    secondaryTitle: "Why It Matters",
    secondaryList: [
      "Separates input production from movement simulation in a way that stays easy to reason about.",
      "Makes the MoverComponent the natural place to grow movement modes without bloating the pawn.",
      "Sets up a structure that works well for both basic traversal and game-specific locomotion features.",
    ],
    title: "Mover Setup and Movement Modes",
  },
  {
    description:
      "A large part of the system's flexibility comes from shared settings, movement modifiers, and movement effects. I think about them a lot like GAS building blocks: shared settings are similar to attributes, modifiers behave like attribute modifiers, and movement effects fill the role of instant gameplay effects for one-shot movement changes.",
    primaryTitle: "Responsibilities",
    roles: [
      "Defines shared settings for things like gait, stance, acceleration, friction, jumping, and floor handling.",
      "Uses movement modifiers to write into shared settings or apply stateful movement changes based on stance, gait, and gameplay context.",
      "Applies movement effects for one-off actions such as jump launches or directed velocity changes.",
      "Keeps tuning and systemic locomotion changes outside the core simulation loop where possible.",
    ],
    secondaryTitle: "Why It Matters",
    secondaryList: [
      "Improves iteration speed because movement behavior can be adjusted without rewriting the whole mode.",
      "Makes the locomotion stack feel modular instead of hardwired around one movement path.",
      "Creates a cleaner bridge between low-level movement code and higher-level gameplay tuning.",
    ],
    title: "Shared Settings, Modifiers, Effects, and the GAS Parallel",
  },
  {
    description:
      "Mover also fits naturally with GAS because movement abilities can own activation, tags, costs, and cancellation rules while the mover responds with the simulation-side changes. In this setup, crouch, sprint, and jump each use a slightly different integration path, but they all follow the same pattern of GAS driving intent and Mover executing the movement result.",
    primaryTitle: "Responsibilities",
    roles: [
      "Lets crouch use gameplay events, owned tags, and a stance modifier to enter and exit crouched locomotion.",
      "Lets sprint use ability tags, cancellation rules, stamina cost effects, and gait switching through the mover.",
      "Lets jump validate grounded state, read shared movement settings, and queue an instant movement effect for the jump impulse.",
      "Keeps GAS responsible for gameplay orchestration while Mover owns the simulation-side outcome.",
    ],
    secondaryTitle: "Why It Matters",
    secondaryList: [
      "Shows that different movement abilities can use modifiers, shared settings, or instant effects without breaking the same overall architecture.",
      "Feels similar to the way GAS likes to separate authority, state, and execution responsibilities.",
      "Makes movement features easier to compose with tags, costs, event-driven input, and the rest of the gameplay ability ecosystem.",
    ],
    title: "GAS Integration Through Movement Abilities",
  },
  {
    description:
      "What I like most about Mover is that it feels much closer to the architecture style of GAS than Character Movement does. It gives you explicit building blocks, clear ownership boundaries, and room to design around your game's needs instead of forcing everything through the assumptions built into CMC.",
    primaryTitle: "Responsibilities",
    roles: [
      "Presents movement as composable systems instead of one heavily opinionated monolith.",
      "Supports custom movement design without constantly fighting built-in character assumptions.",
      "Encourages explicit movement states, effects, and data flow that map well to gameplay systems.",
      "Leaves space for project-specific movement logic instead of narrowing design toward one standard model.",
    ],
    secondaryTitle: "Why It Matters",
    secondaryList: [
      "It feels like a better fit for ability-driven projects where movement should behave like part of the gameplay framework.",
      "It avoids many of the design constraints that come with building everything around CMC conventions.",
      "It gives me more confidence that unusual movement ideas can be implemented cleanly instead of hacked in.",
    ],
    title: "Why I Like Mover",
  },
] as const;

export function generateStaticParams() {
  return categoryPages.fourth.features
    .filter((feature) => feature.slug !== "lyra-rpg-systems")
    .map((feature) => ({ slug: feature.slug }));
}

export default async function FourthFeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = getCategoryFeature("fourth", slug);

  if (!feature) {
    notFound();
  }

  return (
    <>
      <PageIntro title={feature.title} description={feature.description} />

      {slug === "mover-system-implementation" ? (
        <section className="relative mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
              Objectives
            </h2>
            <ol className="flex list-decimal flex-col gap-4 pl-6 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              <li>
                Build a movement stack on top of Unreal&apos;s Mover framework that
                keeps simulation, input production, and gameplay ownership cleanly
                separated while still supporting the needs of a real multiplayer game.
              </li>
              <li>
                Show how Mover can support modular movement design through
                movement modes, shared settings, gameplay abilities, and other
                systems without falling back to Character Movement assumptions.
              </li>
            </ol>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
              Solution
            </h2>
            <p className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              I built a custom locomotion stack around Mover with four main
              themes: the MoverComponent and PlayerPawn split, shared movement
              settings and effects, GAS integration through movement abilities
              like crouch, sprint, and jump, and the broader architectural
              reasons I prefer Mover over Character Movement for this kind of
              game.
            </p>
          </div>

          <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
            <h2 className="mb-5 text-2xl font-semibold tracking-tight text-neutral-900">
              Technical Breakdown
            </h2>
            <p className="mb-5 text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
              This implementation is built around 4 major pieces.
            </p>
            <div className="flex flex-col gap-3">
              {moverSystemComponents.map((component, index) => (
                <div
                  key={component.title}
                  className={
                    index < moverSystemComponents.length - 1
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
            {moverSystemComponents.map((component) => (
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

                {component.title === "Shared Settings, Modifiers, Effects, and the GAS Parallel" ? (
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="straight-outline bg-white/55 px-4 py-4">
                      <h4 className="mb-2 text-base font-semibold tracking-tight text-neutral-900">
                        Shared Settings
                      </h4>
                      <p className="mb-3 text-[0.98rem] leading-relaxed text-neutral-700">
                        I use shared settings a lot like GAS attributes. They are
                        the persistent movement-side values that store state and
                        define the base tuning the rest of the system reads from,
                        including things like gait, jump tuning, speed
                        multipliers, and acceleration multipliers.
                      </p>
                      <ul className="flex list-disc flex-col gap-2 pl-5 text-[0.96rem] leading-relaxed text-neutral-700">
                        <li>Comparable to attributes in GAS.</li>
                        <li>Used to store reusable movement state and tuning.</li>
                        <li>Acts as the baseline that modifiers and effects can influence.</li>
                      </ul>
                    </div>

                    <div className="straight-outline bg-white/55 px-4 py-4">
                      <h4 className="mb-2 text-base font-semibold tracking-tight text-neutral-900">
                        Modifiers
                      </h4>
                      <p className="mb-3 text-[0.98rem] leading-relaxed text-neutral-700">
                        I treat modifiers like attribute modifiers in GAS. They
                        are added and removed to alter gameplay behavior. In
                        practice they often write into shared settings or apply
                        stateful changes, like gait modifiers setting walk,
                        trot, or run, and the crouch modifier applying crouch
                        multipliers and capsule changes from the crouch gameplay
                        ability.
                      </p>
                      <ul className="flex list-disc flex-col gap-2 pl-5 text-[0.96rem] leading-relaxed text-neutral-700">
                        <li>Comparable to attribute modifiers in GAS.</li>
                        <li>Used to add or remove movement changes based on state.</li>
                        <li>Can update shared settings, like gait or speed and acceleration multipliers.</li>
                        <li>Can also apply stateful physical changes, like crouch capsule and eye height adjustments.</li>
                      </ul>
                    </div>

                    <div className="straight-outline bg-white/55 px-4 py-4">
                      <h4 className="mb-2 text-base font-semibold tracking-tight text-neutral-900">
                        Movement Effects
                      </h4>
                      <p className="mb-3 text-[0.98rem] leading-relaxed text-neutral-700">
                        I use movement effects more like instant gameplay effects.
                        They are for immediate one-shot movement changes, like
                        applying an impulse, directly injecting velocity, or
                        correcting position during a stance transition.
                      </p>
                      <ul className="flex list-disc flex-col gap-2 pl-5 text-[0.96rem] leading-relaxed text-neutral-700">
                        <li>Comparable to instant gameplay effects in GAS.</li>
                        <li>Used for one-off movement actions instead of stored state.</li>
                        <li>Useful for actions like impulses, launches, sudden pushes, or one-time repositioning.</li>
                        <li>Even crouch uses one internally, since the stance modifier can queue a teleport-style effect when adjusting capsule height.</li>
                      </ul>
                    </div>
                  </div>
                ) : null}

                {component.title === "GAS Integration Through Movement Abilities" ? (
                  <div className="mt-6 grid gap-4 md:grid-cols-3">
                    <div className="straight-outline bg-white/55 px-4 py-4">
                      <h4 className="mb-2 text-base font-semibold tracking-tight text-neutral-900">
                        Crouch Ability
                      </h4>
                      <p className="mb-3 text-[0.98rem] leading-relaxed text-neutral-700">
                        `GACrouch` is event-driven and stateful. It listens for
                        crouch and uncrouch input events, applies an activation
                        tag, and uses a queued stance modifier to move the
                        character into and out of crouched locomotion.
                      </p>
                      <ul className="flex list-disc flex-col gap-2 pl-5 text-[0.96rem] leading-relaxed text-neutral-700">
                        <li>Blocks conflicting states like flying and sprinting.</li>
                        <li>Queues a `FCreatureStanceModifier` through the mover.</li>
                        <li>Updates mover stance state and broadcasts stance changes.</li>
                      </ul>
                    </div>

                    <div className="straight-outline bg-white/55 px-4 py-4">
                      <h4 className="mb-2 text-base font-semibold tracking-tight text-neutral-900">
                        Sprint Ability
                      </h4>
                      <p className="mb-3 text-[0.98rem] leading-relaxed text-neutral-700">
                        `GASprint` shows a more sustained ability flow. It reacts
                        to sprint input, cancels crouch, applies stamina cost
                        effects while active, and tells the mover to switch gait
                        to run until a stop-sprinting event ends the ability.
                      </p>
                      <ul className="flex list-disc flex-col gap-2 pl-5 text-[0.96rem] leading-relaxed text-neutral-700">
                        <li>Uses GAS tags and cancellation rules for state coordination.</li>
                        <li>Applies and later removes active stamina gameplay effects.</li>
                        <li>Stores and restores the previous gait through the mover.</li>
                      </ul>
                    </div>

                    <div className="straight-outline bg-white/55 px-4 py-4">
                      <h4 className="mb-2 text-base font-semibold tracking-tight text-neutral-900">
                        Jump Ability
                      </h4>
                      <p className="mb-3 text-[0.98rem] leading-relaxed text-neutral-700">
                        `GAJump` is the clearest instant-effect example. It first
                        validates grounded movement, then either triggers vaulting
                        or reads shared jump settings and queues an instant jump
                        impulse effect on the mover.
                      </p>
                      <ul className="flex list-disc flex-col gap-2 pl-5 text-[0.96rem] leading-relaxed text-neutral-700">
                        <li>Checks mover ground state before activation.</li>
                        <li>Reads shared jump multipliers from movement settings.</li>
                        <li>Queues an instant movement effect for the final jump impulse.</li>
                      </ul>
                    </div>
                  </div>
                ) : null}
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
                  Why Mover was worth extending
                </h3>
                <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                  <li>
                    It feels much more compatible with a GAS-style way of
                    thinking, where systems are explicit, modular, and easier to
                    compose.
                  </li>
                  <li>
                    It gives me freedom to design custom movement rules and
                    states without constantly working around CMC&apos;s built-in
                    assumptions.
                  </li>
                  <li>
                    It creates a cleaner base for connecting movement with
                    gameplay abilities, animation, and project-specific features.
                  </li>
                </ul>
              </div>

              <div>
                <h3 className="mb-4 text-lg font-semibold tracking-tight text-neutral-900">
                  Why this implementation matters
                </h3>
                <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700">
                  <li>
                    The setup gives input, movement simulation, and gameplay
                    abilities distinct responsibilities instead of blending them
                    together.
                  </li>
                  <li>
                    Shared settings, modifiers, and effects make locomotion
                    easier to tune and extend as the project grows.
                  </li>
                  <li>
                    The crouch example shows that Mover can slot into a real GAS
                    workflow instead of living off to the side as a separate
                    experiment.
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      ) : null}

    </>
  );
}
