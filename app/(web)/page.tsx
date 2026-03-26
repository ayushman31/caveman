import Content from "@/components/Content";
import ContentItem from "@/components/ContentItem";
import MultiText from "@/components/MultiText";
import Video from "@/components/Video";
import { homeTexts, SAMPLE_VIDEO_URL } from "@/lib/dummyData";

export default function HomePage() {
  const items = [
    <ContentItem
      key="home-1"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={<MultiText texts={homeTexts} />}
    />,
  ];

  return (
    <>
      {/* Hero */}
      <div className="mx-auto max-w-5xl px-4 pt-16 pb-4 md:px-6 md:pt-24">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-6xl">
          Unreal Engine Systems Programmer
        </h1>
        <p className="mt-4 max-w-xl text-lg text-neutral-500">
          Building modular and expandable systems
        </p>
      </div>

      <Content items={items} />
    </>
  );
}