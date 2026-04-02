import Content from "@/components/Content";
import ContentItem from "@/components/ContentItem";
import MultiText from "@/components/MultiText";
import PageIntro from "@/components/PageIntro";
import Video from "@/components/Video";
import { SAMPLE_VIDEO_URL } from "@/lib/dummyData";
import { lyraOverviewCards } from "@/lib/lyraRpgContent";

export default function LyraRpgSystemsPage() {
  const items = lyraOverviewCards.map((section) => (
    <ContentItem
      key={section.slug}
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
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
        description="A recruiter-friendly overview of how I extended Lyra into a deeper RPG framework while keeping its multiplayer gameplay foundations intact. The work covers progression, crafting, stations, gathering, and the architectural decisions that make those systems scalable."
      />

      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-8 md:px-6 md:py-12">
        <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            What this work demonstrates
          </h2>
          <div className="grid gap-6 md:grid-cols-2">
            <div>
              <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700 md:text-[1.05rem]">
                <li>
                  I can extend a complex sample project like Lyra without
                  throwing away its existing architecture.
                </li>
                <li>
                  I design progression and interaction systems as connected,
                  reusable gameplay layers instead of one-off features.
                </li>
                <li>
                  I lean on data-driven tuning so designers can adjust systems
                  without constantly needing new engineering work.
                </li>
              </ul>
            </div>
            <div>
              <ul className="flex list-disc flex-col gap-3 pl-5 text-[1rem] leading-relaxed text-neutral-700 md:text-[1.05rem]">
                <li>
                  The implementation is multiplayer-aware, with clear authority
                  boundaries and replication strategy.
                </li>
                <li>
                  Inventory, ability, and interaction flows all stay connected so
                  gameplay state remains coherent across systems.
                </li>
                <li>
                  The pages below break the work into smaller technical slices if
                  you want the deeper implementation details.
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="straight-outline bg-white/45 px-6 py-6 backdrop-blur-sm">
          <h2 className="mb-4 text-2xl font-semibold tracking-tight text-neutral-900">
            High-level takeaway
          </h2>
          <p className="text-[1.02rem] leading-relaxed text-neutral-700 md:text-[1.08rem]">
            The strength of this work is not just that it adds RPG mechanics to
            Lyra, but that it does so in a way that respects Lyra&apos;s strengths.
            GAS, inventory, equipment, messaging, and multiplayer structure stay
            in place, while the custom layer defines progression rules,
            contextual abilities, data-driven crafting, and world interaction
            loops on top. That creates a much more production-friendly result
            than building an unrelated system beside the framework.
          </p>
        </div>
      </section>

      <Content items={items} />
    </>
  );
}
