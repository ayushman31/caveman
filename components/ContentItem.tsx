import { Card, CardContent } from "@/components/ui/card";

type ContentItemProps = {
  video: React.ReactNode;
  texts: React.ReactNode;
  url?: string;
};

export default function ContentItem({ video, texts, url }: ContentItemProps) {
  return (
    <a href={url} className="block">
      <Card className="overflow-hidden border border-neutral-200 bg-white/70 shadow-sm backdrop-blur-sm hover:shadow-md transition-shadow">
        <CardContent className="flex flex-col gap-6 p-6 md:flex-row md:items-start md:gap-8">
          {/* Video takes full width on mobile, 55% on desktop */}
          <div className="w-full md:w-[55%]">{video}</div>

          {/* Text content fills remaining space */}
          <div className="flex w-full flex-col justify-center gap-2 md:w-[45%]">
            {texts}
          </div>
        </CardContent>
      </Card>
    </a>
  );
}