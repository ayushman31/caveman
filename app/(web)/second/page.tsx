import Content from "@/components/Content";
import ContentItem from "@/components/ContentItem";
import MultiText from "@/components/MultiText";
import Video from "@/components/Video";
import { SAMPLE_VIDEO_URL } from "@/lib/dummyData";

export default function SecondPage() {
  const items = [
    <ContentItem
      key="wizard-combat-movement"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={
        <MultiText
          title="Wizard Combat & Movement"
          texts={[
            "A modular combat and movement framework built for responsiveness and flow, combining abilities, animation, and input handling for satisfying gameplay.",
          ]}
        />
      }
    />,
    <ContentItem
      key="pounce-latch-mechanics"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={
        <MultiText
          title="Pounce & Latch Mechanics"
          texts={[
            "Responsive combat mechanics focused on timing, impact, and state control, designed to feel fluid and satisfying in both solo and multiplayer scenarios.",
          ]}
        />
      }
    />,
    <ContentItem
      key="ability-system-framework"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={
        <MultiText
          title="Ability System Framework"
          texts={[
            "A flexible gameplay ability architecture supporting cooldowns, effects, and extensible mechanics, designed for rapid iteration and designer control.",
          ]}
        />
      }
    />,
  ];

  return (
    <>
      <div className="mx-auto max-w-5xl px-4 pt-16 pb-4 md:px-6">
        <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
          Gameplay Mechanics
        </h1>
        <p className="mt-4 max-w-4xl text-[1.08rem] leading-relaxed text-neutral-700 md:text-[1.18rem]">
          Responsive, polished combat and movement systems built with modular
          frameworks, allowing fine control over gameplay feel and direction.
        </p>
      </div>
      <Content items={items} />
    </>
  );
}
