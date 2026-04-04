import Content from "@/components/Content";
import ContentItem from "@/components/ContentItem";
import MultiText from "@/components/MultiText";
import PageIntro from "@/components/PageIntro";
import Video from "@/components/Video";
import { SAMPLE_VIDEO_URL } from "@/lib/dummyData";
import { categoryPages } from "@/lib/categoryContent";
import Image from "next/image";

const footprintVideoUrl = "https://www.youtube.com/watch?v=gvTY96CtRFc";

const featureMedia: Record<string, React.ReactNode> = {
  "footprint-tracking-system": <Video videoUrl={footprintVideoUrl} />,
  "multiplayer-gameplay-architecture": (
    <div className="straight-outline-video relative w-full overflow-hidden bg-white/35 pt-[56.25%]">
      <Image
        src="/multiplayer-gameplay-architecture.svg"
        alt="Diagram showing multiplayer gameplay architecture in Unreal"
        fill
        className="object-cover"
      />
    </div>
  ),
  "replication-strategy": (
    <div className="straight-outline-video relative w-full overflow-hidden bg-white/35 pt-[56.25%]">
      <Image
        src="/unreal-network-replication.svg"
        alt="Diagram showing Unreal network replication"
        fill
        className="object-cover"
      />
    </div>
  ),
};

export default function ThirdPage() {
  const category = categoryPages.third;
  const items = [
    ...category.features.map((feature) => (
      <ContentItem
        key={feature.slug}
        video={featureMedia[feature.slug] ?? <Video videoUrl={SAMPLE_VIDEO_URL} />}
        texts={<MultiText title={feature.title} texts={[feature.description]} />}
        url={`/third/${feature.slug}`}
      />
    )),
  ];

  return (
    <>
      <PageIntro title={category.title} description={category.description} />
      <Content items={items} />
    </>
  );
}
