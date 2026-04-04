export type LyraSectionCard = {
  description: string;
  footerText: string;
  slug: string;
  title: string;
};

export type LyraSectionPage = {
  description: string;
  highlights: string[];
  intro: string;
  slug: string;
  title: string;
};

export const lyraOverviewCards: LyraSectionCard[] = [
  {
    description:
      "How the work extends Lyra while keeping GAS, inventory, equipment, and messaging as the base foundation.",
    footerText: "Module layering · Item identity · Runtime seams",
    slug: "architecture-foundation",
    title: "Architecture & Foundation",
  },
  {
    description:
      "The RPG progression model built on top of Lyra, including skills, stats, non-linear growth curves, and data-driven relationships between systems.",
    footerText: "Custom ASC · XP curves · Skill/stat links",
    slug: "progression-systems",
    title: "Progression Systems",
  },
  {
    description:
      "The interaction-heavy gameplay layer covering stations, crafting, gathering, and the inventory flows that make those systems work in practice.",
    footerText: "Stations · Crafting · Gathering",
    slug: "crafting-stations-gathering",
    title: "Crafting, Stations & Gathering",
  },
  {
    description:
      "The multiplayer side of the implementation, including target-data transport, replication boundaries, notifications, and the main validation work still to harden.",
    footerText: "Replication · GAS target data · Validation",
    slug: "networking-validation",
    title: "Networking & Validation",
  },
] as const;

export const lyraSectionPages: LyraSectionPage[] = [
  {
    description:
      "A layered breakdown of how Lyra stays the gameplay foundation while the added RPG systems stay modular and maintainable.",
    highlights: [
      "Lyra remains the base gameplay framework for GAS hosting, player state, inventory, equipment, quick bar flows, and gameplay messaging.",
      "The custom runtime module adds the rule layer: progression, stations, crafting, gathering, item identity, and progression-facing UI feedback.",
      "Shared extension points inside the Lyra module make item identity, temporary ability grants, and reward payload transport reusable across the whole feature set.",
      "The result is an extension of Lyra rather than a parallel framework, which keeps the codebase more coherent and easier to scale.",
    ],
    intro:
      "Lyra stays the engine room rather than something to replace. The added RPG systems sit on top through modules, data assets, components, and gameplay abilities.",
    slug: "architecture-foundation",
    title: "Architecture & Foundation",
  },
  {
    description:
      "A closer look at the progression model: skill XP, stat XP, point growth, long-term tuning, and how progression data moves through GAS flows.",
    highlights: [
      "A custom ability system component sits at the progression seam, reacting to XP gains, converting XP into points, and broadcasting events for UI feedback.",
      "Progression uses square-root growth curves so higher levels become increasingly expensive instead of growing linearly forever.",
      "Skills and stats are linked through gameplay-tag relevance maps, so a single action can drive connected progression without hard-coded one-to-one rules.",
      "Progression payloads can be passed as modular GAS-style data and then resolved in Blueprint-driven ability flow, similar to Lyra's overall pattern.",
      "Additional attribute sets expand the model beyond just skills and stats, leaving room for combat, vitals, movement, and meta progression systems.",
    ],
    intro:
      "This progression model is built as a connected loop. Actions feed skill XP, skill XP influences related stats, and stat growth increases future skill capacity. The pieces stay modular, with C++ systems carrying the data and Blueprint tying the final ability flow together.",
    slug: "progression-systems",
    title: "Progression Systems",
  },
  {
    description:
      "The gameplay layer where progression touches the world: station interaction, crafting, gathering, real inventory state, and how data moves between those systems.",
    highlights: [
      "Stations are mostly data-driven and grant temporary ability sets while the player is actively interacting with them.",
      "Crafting recipes are keyed by stable item asset identities, which keeps recipe matching robust and designer-friendly.",
      "Gathering abilities package reward payloads through GAS target data, while Blueprint remains free to handle tracing and presentation.",
      "Crafting follows the same modular pattern, with data resolved in C++ and the surrounding ability flow assembled in Blueprint-friendly pieces.",
      "Ingredient consumption updates both inventory storage and quick-bar state so the runtime stays consistent after a craft completes.",
    ],
    intro:
      "This is where the systems become visible in gameplay: station use, temporary abilities, table-driven crafting, and gathering rewards from world actors. The underlying pieces stay modular so the runtime logic can be reused while Blueprint handles the higher-level flow in a Lyra-like way.",
    slug: "crafting-stations-gathering",
    title: "Crafting, Stations & Gathering",
  },
  {
    description:
      "A breakdown of the multiplayer patterns behind the systems, including what already works well and where stronger validation is still the next step.",
    highlights: [
      "The implementation uses Lyra and GAS networking patterns heavily: replicated actors and components, owner-only progression data where appropriate, and target-data transport for action rewards.",
      "Progression feedback is routed through notification processors and accolade-style UI so player-facing feedback stays separate from the core runtime logic.",
      "The main remaining hardening work is stronger server-side validation after crafting and gathering target data arrives.",
      "There is also room for richer client reactions around replicated station state, even though the current authority model is already solid.",
    ],
    intro:
      "These systems sit inside multiplayer gameplay, so the important question is how they move data safely. The design leans on server authority, selective replication, and GAS transport patterns.",
    slug: "networking-validation",
    title: "Networking & Validation",
  },
] as const;

export function getLyraSectionPage(slug: string) {
  return lyraSectionPages.find((section) => section.slug === slug);
}
