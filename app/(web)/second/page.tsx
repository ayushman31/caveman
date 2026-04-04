import Content from "@/components/Content";
import ContentItem from "@/components/ContentItem";
import MultiText from "@/components/MultiText";
import PageIntro from "@/components/PageIntro";
import Video from "@/components/Video";
import { SAMPLE_VIDEO_URL } from "@/lib/dummyData";
import { categoryPages } from "@/lib/categoryContent";
import Image from "next/image";

const wizardCardVideoUrl = "https://youtu.be/qYhhpC9uRH8";
const pounceCardVideoUrl = "https://youtu.be/MvevjpPdypA";
const abilityFrameworkCardImage = "/gameplay-ability-system.svg";

export default function SecondPage() {
  const category = categoryPages.second;
  const items = [
    ...category.features.map((feature) => (
      <ContentItem
        key={feature.slug}
        video={
          feature.slug === "ability-system-framework" ? (
            <div className="straight-outline-video relative w-full overflow-hidden bg-white/35 pt-[56.25%]">
              <Image
                src={abilityFrameworkCardImage}
                alt="Gameplay Ability System overview illustration"
                fill
                className="object-cover"
              />
            </div>
          ) : (
            <Video
              videoUrl={
                feature.slug === "wizard-combat-movement"
                  ? wizardCardVideoUrl
                  : feature.slug === "pounce-latch-mechanics"
                    ? pounceCardVideoUrl
                    : SAMPLE_VIDEO_URL
              }
            />
          )
        }
        texts={<MultiText title={feature.title} texts={[feature.description]} />}
        url={`/second/${feature.slug}`}
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
