import Link from "next/link";

import { Card, CardContent } from "@/components/ui/card";

type ContentItemProps = {
  video: React.ReactNode;
  texts: React.ReactNode;
  url?: string;
};

export default function ContentItem({ video, texts, url }: ContentItemProps) {
  const cardContent = (
    <Card className="overflow-hidden rounded-none border-0 bg-white/70 shadow-sm ring-0 backdrop-blur-sm transition-[transform,background-color,box-shadow] duration-200 group-hover:bg-[#faf5ea]/88 group-hover:shadow-[0_8px_18px_rgba(180,156,112,0.08)]">
      <CardContent className="flex flex-col gap-6 p-6 transition-transform duration-200 group-hover:scale-[1.0015] md:grid md:grid-cols-[minmax(0,1.02fr)_minmax(0,1.06fr)] md:items-start md:gap-7 md:p-7">
        <div className="w-full">{video}</div>
        <div className="flex w-full flex-col justify-center gap-2">
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
