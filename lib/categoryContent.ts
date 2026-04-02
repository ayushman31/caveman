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
      "Responsive combat and movement systems built on strong gameplay architecture, combining polished player feel with reusable GAS-driven frameworks for scalable mechanic design.",
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
          "My approach to building gameplay mechanics with GAS, focused on strong core architecture, reusable ability patterns, and systems that scale cleanly across complex projects.",
        slug: "ability-system-framework",
        title: "Ability System Framework",
      },
    ],
    title: "Gameplay Mechanics",
  },
  third: {
    description:
      "Scalable multiplayer architecture covering replication strategy, relevance-driven world systems, and the shared gameplay foundations that support complex networked mechanics.",
    features: [
      {
        description:
          "A relevance-driven tracking system for large multiplayer environments, using efficient footprint and world-tracking logic to support readable gameplay without excessive network cost.",
        slug: "footprint-tracking-system",
        title: "Footprint Tracking System",
      },
      {
        description:
          "My approach to replication design, focused on server authority, relevance filtering, and intentional data flow to keep multiplayer systems scalable and predictable.",
        slug: "replication-strategy",
        title: "Replication Strategy",
      },
      {
        description:
          "How I connect abilities, replication, data-driven design, and game-wide systems into a shared gameplay architecture built for long-term multiplayer development.",
        slug: "multiplayer-gameplay-architecture",
        title: "Multiplayer Gameplay Architecture",
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
          "A modular RPG extension built on top of Lyra, covering progression, crafting, stations, gathering, and the multiplayer architecture behind those systems.",
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
