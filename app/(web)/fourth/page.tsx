import Content from "@/components/Content";
import ContentItem from "@/components/ContentItem";
import MultiText from "@/components/MultiText";
import PageIntro from "@/components/PageIntro";
import Video from "@/components/Video";
import { SAMPLE_VIDEO_URL } from "@/lib/dummyData";
import { categoryPages } from "@/lib/categoryContent";

export default function FourthPage() {
  const category = categoryPages.fourth;
  const items = [
    ...category.features.map((feature) => (
      <ContentItem
        key={feature.slug}
        video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
        texts={<MultiText title={feature.title} texts={[feature.description]} />}
        url={`/fourth/${feature.slug}`}
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
