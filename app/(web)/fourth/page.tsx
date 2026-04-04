import Content from "@/components/Content";
import ContentItem from "@/components/ContentItem";
import MultiText from "@/components/MultiText";
import PageIntro from "@/components/PageIntro";
import Video from "@/components/Video";
import { SAMPLE_VIDEO_URL } from "@/lib/dummyData";
import { categoryPages } from "@/lib/categoryContent";
import Image from "next/image";

const moverCardImage = "/mover-system.svg";
const lyraCardImage = "/lyra-rpg-systems.svg";

export default function FourthPage() {
  const category = categoryPages.fourth;
  const items = [
    ...category.features.map((feature) => (
      <ContentItem
        key={feature.slug}
        video={
          feature.slug === "mover-system-implementation" ? (
            <div className="straight-outline-video relative w-full overflow-hidden bg-white/35 pt-[56.25%]">
              <Image
                src={moverCardImage}
                alt="Mover system overview illustration"
                fill
                className="object-cover"
              />
            </div>
          ) : feature.slug === "lyra-rpg-systems" ? (
            <div className="straight-outline-video relative w-full overflow-hidden bg-white/35 pt-[56.25%]">
              <Image
                src={lyraCardImage}
                alt="Lyra RPG systems overview illustration"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <Video videoUrl={SAMPLE_VIDEO_URL} />
          )
        }
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
