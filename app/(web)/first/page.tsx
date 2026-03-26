import Content from "@/components/Content";
import ContentItem from "@/components/ContentItem";
import MultiText from "@/components/MultiText";
import Video from "@/components/Video";
import { workTexts, SAMPLE_VIDEO_URL } from "@/lib/dummyData";

export default function FirstPage() {
  const items = [
    <ContentItem
      key="work-1"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={<MultiText texts={workTexts} />}
    />,
    <ContentItem
      key="work-1"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={<MultiText texts={workTexts} />}
    />,
    
  ];

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 pt-16 pb-4 md:px-6">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
          First
        </h1>
        <p className="mt-3 text-neutral-500">lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
      </div>
      <Content items={items} />
    </>
  );
}