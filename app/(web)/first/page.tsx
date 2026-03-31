import Content from "@/components/Content";
import ContentItem from "@/components/ContentItem";
import MultiText from "@/components/MultiText";
import Video from "@/components/Video";
import { SAMPLE_VIDEO_URL } from "@/lib/dummyData";

export default function FirstPage() {
  const items = [
    <ContentItem
      key="territory-system"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={
        <MultiText
          title="Multiplayer Territory System"
          texts={[
            "A fully dynamic, designer-driven territory system with brush-based creation, pack-based contesting, and server-authoritative control built for scalable multiplayer gameplay.",
          ]}
        />
      }
    />,
    <ContentItem
      key="pack-faction-system"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={
        <MultiText
          title="Pack & Faction System"
          texts={[
            "A group-based gameplay system enabling players to form packs, coordinate actions, and interact with core systems like territories and progression.",
          ]}
        />
      }
    />,
    <ContentItem
      key="growth-system"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={
        <MultiText
          title="Growth System"
          texts={[
            "A data-driven progression system that continuously scales character size, movement, animations, and gameplay attributes in real time across all systems.",
          ]}
        />
      }
    />,
  ];

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 pt-16 pb-4 md:px-6">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
          Systems Engineering
        </h1>
        <p className="mt-4 max-w-4xl text-[1.08rem] leading-relaxed text-neutral-700 md:text-[1.18rem]">
          Interconnected, data-driven systems-from territories and factions to
          growth-designed to work together and add depth to gameplay.
        </p>
      </div>
      <Content items={items} />
    </>
  );
}
