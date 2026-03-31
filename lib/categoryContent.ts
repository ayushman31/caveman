export type FeatureCard = {
  description: string;
  slug: string;
  title: string;
};

export type CategoryPage = {
  description: string;
  features: FeatureCard[];
  title: string;
};

export const categoryPages = {
  first: {
    description:
      "Interconnected, data-driven systems-from territories and factions to growth-designed to work together and add depth to gameplay.",
    features: [
      {
        description:
          "A fully dynamic, designer-driven territory system with brush-based creation, pack-based contesting, and server-authoritative control built for scalable multiplayer gameplay.",
        slug: "multiplayer-territory-system",
        title: "Multiplayer Territory System",
      },
      {
        description:
          "A group-based gameplay system enabling players to form packs, coordinate actions, and interact with core systems like territories and progression.",
        slug: "pack-faction-system",
        title: "Pack & Faction System",
      },
      {
        description:
          "A data-driven progression system that continuously scales character size, movement, animations, and gameplay attributes in real time across all systems.",
        slug: "growth-system",
        title: "Growth System",
      },
    ],
    title: "Systems Engineering",
  },
  second: {
    description:
      "Responsive, polished combat and movement systems built with modular frameworks, allowing fine control over gameplay feel and direction.",
    features: [
      {
        description:
          "A modular combat and movement framework built for responsiveness and flow, combining abilities, animation, and input handling for satisfying gameplay.",
        slug: "wizard-combat-movement",
        title: "Wizard Combat & Movement",
      },
      {
        description:
          "Responsive combat mechanics focused on timing, impact, and state control, designed to feel fluid and satisfying in both solo and multiplayer scenarios.",
        slug: "pounce-latch-mechanics",
        title: "Pounce & Latch Mechanics",
      },
      {
        description:
          "A flexible gameplay ability architecture supporting cooldowns, effects, and extensible mechanics, designed for rapid iteration and designer control.",
        slug: "ability-system-framework",
        title: "Ability System Framework",
      },
    ],
    title: "Gameplay Mechanics",
  },
  third: {
    description:
      "Multiplayer systems built for scale, including a footprint tracking system designed for 50-100 player environments, with a focus on replication and performance.",
    features: [
      {
        description:
          "A performant tracking system designed for 50-100 player environments, featuring footprints and scent trails optimized for scalability and network efficiency.",
        slug: "footprint-tracking-system",
        title: "Footprint Tracking System",
      },
      {
        description:
          "A structured approach to multiplayer system design, balancing server authority, responsiveness, and bandwidth efficiency.",
        slug: "replication-strategy",
        title: "Replication Strategy",
      },
      {
        description:
          "Deep integration of GAS across systems, enabling scalable ability logic, attribute-driven gameplay, and clean interaction between mechanics.",
        slug: "gas-integration",
        title: "GAS Integration",
      },
    ],
    title: "Multiplayer & Performance",
  },
  fourth: {
    description:
      "Pushing into advanced Unreal Engine systems-from Mover-based locomotion to extending Lyra with full RPG-style mechanics-applied in real gameplay scenarios, bridging experimentation with production-ready implementation.",
    features: [
      {
        description:
          "A full locomotion system built using Unreal's Mover framework, integrated with GAS to enable flexible, ability-driven movement in multiplayer gameplay.",
        slug: "mover-system-implementation",
        title: "Mover System Implementation",
      },
      {
        description:
          "Extending Lyra with RPG-style systems including skills, stats, and progression, building on its modular architecture to support deeper gameplay layers.",
        slug: "lyra-rpg-systems",
        title: "Lyra RPG Systems",
      },
    ],
    title: "Experimental/Advanced",
  },
} satisfies Record<"first" | "second" | "third" | "fourth", CategoryPage>;

export type CategoryPageKey = keyof typeof categoryPages;

export function getCategoryFeature(category: CategoryPageKey, slug: string) {
  return categoryPages[category].features.find((feature) => feature.slug === slug);
}
