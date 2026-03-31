import Content from "@/components/Content";
import ContentItem from "@/components/ContentItem";
import MultiText from "@/components/MultiText";
import Video from "@/components/Video";
import { SAMPLE_VIDEO_URL } from "@/lib/dummyData";

export default function ThirdPage() {
  const items = [
    <ContentItem
      key="footprint-tracking-system"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={
        <MultiText
          title="Footprint Tracking System"
          texts={[
            "A performant tracking system designed for 50-100 player environments, featuring footprints and scent trails optimized for scalability and network efficiency.",
          ]}
        />
      }
    />,
    <ContentItem
      key="replication-strategy"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={
        <MultiText
          title="Replication Strategy"
          texts={[
            "A structured approach to multiplayer system design, balancing server authority, responsiveness, and bandwidth efficiency.",
          ]}
        />
      }
    />,
    <ContentItem
      key="gas-integration"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={
        <MultiText
          title="GAS Integration"
          texts={[
            "Deep integration of GAS across systems, enabling scalable ability logic, attribute-driven gameplay, and clean interaction between mechanics.",
          ]}
        />
      }
    />,
  ];

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 pt-16 pb-4 md:px-6">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
          Multiplayer & Performance
        </h1>
        <p className="mt-4 max-w-4xl text-[1.08rem] leading-relaxed text-neutral-700 md:text-[1.18rem]">
          Multiplayer systems built for scale, including a footprint tracking
          system designed for 50-100 player environments, with a focus on
          replication and performance.
        </p>
      </div>
      <Content items={items} />
    </>
  );
}
