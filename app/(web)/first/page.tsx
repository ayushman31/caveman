import Content from "@/components/Content";
import ContentItem from "@/components/ContentItem";
import MultiText from "@/components/MultiText";
import PageIntro from "@/components/PageIntro";
import Video from "@/components/Video";
import { SAMPLE_VIDEO_URL } from "@/lib/dummyData";
import { categoryPages } from "@/lib/categoryContent";
import Image from "next/image";

const growthCardVideoUrl = "https://youtu.be/0PpBRb7ahRw";
const territoryCardVideoUrl = "https://youtu.be/K6m8qFo6kBg";
const packCardImage = "/pack-faction-system.svg";

export default function FirstPage() {
  const category = categoryPages.first;
  const items = [
    ...category.features.map((feature) => (
      <ContentItem
        key={feature.slug}
        video={
          feature.slug === "pack-faction-system" ? (
            <div className="straight-outline-video relative w-full overflow-hidden bg-white/35 pt-[56.25%]">
              <Image
                src={packCardImage}
                alt="Illustration of pack leadership, member grouping, and map coordination"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <Video
              videoUrl={
                feature.slug === "growth-system"
                  ? growthCardVideoUrl
                  : feature.slug === "multiplayer-territory-system"
                    ? territoryCardVideoUrl
                    : SAMPLE_VIDEO_URL
              }
            />
          )
        }
        texts={<MultiText title={feature.title} texts={[feature.description]} />}
        url={`/first/${feature.slug}`}
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
