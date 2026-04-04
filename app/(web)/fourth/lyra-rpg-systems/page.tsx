import Content from "@/components/Content";
import ContentItem from "@/components/ContentItem";
import MultiText from "@/components/MultiText";
import PageIntro from "@/components/PageIntro";
import { lyraOverviewCards } from "@/lib/lyraRpgContent";

export default function LyraRpgSystemsPage() {
  const items = lyraOverviewCards.map((section) => (
    <ContentItem
      key={section.slug}
      video={
        <div className="straight-outline-video relative w-full overflow-hidden bg-white/35 pt-[56.25%]">
          <div className="absolute inset-0 flex items-center justify-center px-6 text-center text-sm tracking-[0.08em] text-neutral-700/80">
            Video coming soon
          </div>
        </div>
      }
      texts={
        <MultiText
          title={section.title}
          texts={[section.description]}
          footerLabel="Focus"
          footerText={section.footerText}
        />
      }
      url={`/fourth/lyra-rpg-systems/${section.slug}`}
    />
  ));

  return (
    <>
      <PageIntro
        title="Lyra RPG Systems"
        description="A simple overview of the Lyra work: progression, crafting, stations, gathering, and the multiplayer architecture behind those systems."
      />

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
        <div className="grid gap-4 md:grid-cols-3">
          <div className="straight-outline bg-white/45 px-5 py-5 backdrop-blur-sm">
            <p className="mb-2 text-[0.76rem] font-semibold tracking-[0.08em] text-neutral-700/80">
              KEY IDEA
            </p>
            <p className="text-[1rem] leading-relaxed text-neutral-800">
              Lyra stays the base framework.
            </p>
          </div>

          <div className="straight-outline bg-white/45 px-5 py-5 backdrop-blur-sm">
            <p className="mb-2 text-[0.76rem] font-semibold tracking-[0.08em] text-neutral-700/80">
              KEY IDEA
            </p>
            <p className="text-[1rem] leading-relaxed text-neutral-800">
              RPG systems are added as layered extensions.
            </p>
          </div>

          <div className="straight-outline bg-white/45 px-5 py-5 backdrop-blur-sm">
            <p className="mb-2 text-[0.76rem] font-semibold tracking-[0.08em] text-neutral-700/80">
              KEY IDEA
            </p>
            <p className="text-[1rem] leading-relaxed text-neutral-800">
              Progression, crafting, and interaction all share the same runtime foundation.
            </p>
          </div>
        </div>

        <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            At a glance
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700 md:text-[1.05rem]">
                <li>
                  The work extends Lyra without replacing its existing
                  gameplay framework.
                </li>
                <li>
                  Progression and interaction systems are built as connected,
                  reusable gameplay layers.
                </li>
                <li>
                  Data-driven tuning keeps balancing and content setup flexible.
                </li>
              </ul>
            </div>
            <div>
              <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700 md:text-[1.05rem]">
                <li>
                  The implementation is multiplayer-aware, with clear authority
                  boundaries and replication rules.
                </li>
                <li>
                  Inventory, ability, and interaction flows stay connected so
                  gameplay state remains consistent across systems.
                </li>
                <li>
                  The sections below break the work into smaller technical
                  parts for quick reading.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            Overview
          </h2>
          <p className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
            Lyra handles the base gameplay foundation: GAS, inventory,
            equipment, messaging, and multiplayer structure. The custom layer
            adds progression rules, contextual abilities, crafting, gathering,
            and station interaction on top of those systems instead of building
            a separate framework beside them.
          </p>
        </div>
      </section>

      <Content items={items} />
    </>
  );
}
