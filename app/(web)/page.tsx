import Content from "@/components/Content";
import ContentItem from "@/components/ContentItem";
import Intro from "@/components/Intro";
import MultiText from "@/components/MultiText";
import Video from "@/components/Video";
import { homeTexts, SAMPLE_VIDEO_URL } from "@/lib/dummyData";

export default function HomePage() {
  const items = [
    <ContentItem
      key="home-1"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={<MultiText texts={homeTexts} />}
      url="/first"
    />,
    <ContentItem
      key="home-2"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={<MultiText texts={homeTexts} />}
      url="/second"
    />,
    <ContentItem
      key="home-3"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={<MultiText texts={homeTexts} />}
      url="/third"
    />,
    <ContentItem
      key="home-4"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={<MultiText texts={homeTexts} />}
      url="/fourth"
    />,

  ];

  return (
    <>
      {/* intor */}
      <div className="mx-auto max-w-5xl px-4 pt-16 pb-4 md:px-6 md:pt-10">
      <Intro/>
      
      </div>

      {/* intro video */}
      <div className="mx-auto max-w-5xl px-4 pt-4 pb-4 md:px-6 md:pt-4">
        <Video videoUrl={SAMPLE_VIDEO_URL} />
      </div>

      {/* cards section */}
      <Content items={items} />
    </>
  );
}