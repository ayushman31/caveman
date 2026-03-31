import Content from "@/components/Content";
import ContentItem from "@/components/ContentItem";
import MultiText from "@/components/MultiText";
import Video from "@/components/Video";
import { SAMPLE_VIDEO_URL } from "@/lib/dummyData";

export default function FourthPage() {
  const items = [
    <ContentItem
      key="mover-system-implementation"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={
        <MultiText
          title="Mover System Implementation"
          texts={[
            "A full locomotion system built using Unreal's Mover framework, integrated with GAS to enable flexible, ability-driven movement in multiplayer gameplay.",
          ]}
        />
      }
    />,
    <ContentItem
      key="lyra-rpg-systems"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={
        <MultiText
          title="Lyra RPG Systems"
          texts={[
            "Extending Lyra with RPG-style systems including skills, stats, and progression, building on its modular architecture to support deeper gameplay layers.",
          ]}
        />
      }
    />,
  ];

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 pt-16 pb-4 md:px-6">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
          Experimental/Advanced
        </h1>
        <p className="mt-4 max-w-4xl text-[1.08rem] leading-relaxed text-neutral-700 md:text-[1.18rem]">
          Pushing into advanced Unreal Engine systems-from Mover-based
          locomotion to extending Lyra with full RPG-style mechanics-applied in
          real gameplay scenarios, bridging experimentation with production-ready
          implementation.
        </p>
      </div>
      <Content items={items} />
    </>
  );
}
