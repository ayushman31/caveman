import Content from "@/components/Content";
import ContentItem from "@/components/ContentItem";
import Intro from "@/components/Intro";
import MultiText from "@/components/MultiText";
import Video from "@/components/Video";
import { SAMPLE_VIDEO_URL } from "@/lib/dummyData";

export default function HomePage() {
  const heroVideoUrl = "https://youtu.be/3otpWB4YWp4";
  const systemsTexts = [
    "Interconnected, data-driven systems-from territories and factions to growth-designed to work together and add depth to gameplay.",
  ];
  const gameplayTexts = [
    "Responsive combat and movement systems built on strong gameplay architecture, combining polished player feel with reusable GAS-driven frameworks for scalable mechanic design.",
  ];
  const multiplayerTexts = [
    "Scalable multiplayer architecture covering replication strategy, relevance-driven world systems, and the shared gameplay foundations that support complex networked mechanics.",
  ];
  const experimentalTexts = [
    "Pushing into advanced Unreal Engine systems-from Mover-based locomotion to extending Lyra with full RPG-style mechanics-applied in real gameplay scenarios, bridging experimentation with production-ready implementation.",
  ];

  const items = [
    <ContentItem
      key="home-1"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={
        <MultiText
          title="Systems Engineering"
          texts={systemsTexts}
          footerLabel="Includes:"
          footerText="Territory System · Pack & Faction System · Growth System"
        />
      }
      url="/first"
    />,
    <ContentItem
      key="home-2"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={
        <MultiText
          title="Gameplay Mechanics"
          texts={gameplayTexts}
          footerLabel="Includes:"
          footerText="Pounce & Latch · Wizard Combat · Ability Framework"
        />
      }
      url="/second"
    />,
    <ContentItem
      key="home-3"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={
        <MultiText
          title="Multiplayer & Performance"
          texts={multiplayerTexts}
          footerLabel="Includes:"
          footerText="Footprint Tracking · Replication Strategy · Networked Architecture"
        />
      }
      url="/third"
    />,
    <ContentItem
      key="home-4"
      video={<Video videoUrl={SAMPLE_VIDEO_URL} />}
      texts={
        <MultiText
          title="Experimental/Advanced"
          texts={experimentalTexts}
          footerLabel="Includes:"
          footerText="Mover Locomotion · Lyra RPG Extension"
        />
      }
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
        <Video videoUrl={heroVideoUrl} outlined />
      </div>

      {/* cards section */}
      <Content items={items} />
    </>
  );
}
