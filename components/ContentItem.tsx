import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

type ContentItemProps = {
  video: React.ReactNode;
  texts: React.ReactNode;
  url?: string;
};

export default function ContentItem({ video, texts, url }: ContentItemProps) {
  const cardContent = (
    <Card className="overflow-hidden rounded-none border-0 bg-white/70 shadow-sm ring-0 backdrop-blur-sm transition-[transform,background-color,box-shadow] duration-200 group-hover:bg-white group-hover:shadow-[0_8px_18px_rgba(0,0,0,0.09)]">
      <CardContent className="flex flex-col gap-6 p-6 transition-transform duration-200 group-hover:scale-[1.0015] md:flex-row md:items-start md:gap-8">
        <div className="w-full md:w-[55%]">{video}</div>
        <div className="flex w-full flex-col justify-center gap-2 md:w-[45%]">
          {texts}
        </div>
      </CardContent>
    </Card>
  );

  const className =
    "straight-outline group block transition-transform duration-200 hover:-translate-y-0.5";

  if (url) {
    return (
      <Link href={url} className={className}>
        {cardContent}
      </Link>
    );
  }

  return <div className={className}>{cardContent}</div>;
}
