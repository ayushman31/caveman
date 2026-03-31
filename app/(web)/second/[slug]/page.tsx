import PageIntro from "@/components/PageIntro";
import { categoryPages, getCategoryFeature } from "@/lib/categoryContent";
import { notFound } from "next/navigation";

export function generateStaticParams() {
  return categoryPages.second.features.map((feature) => ({ slug: feature.slug }));
}

export default async function SecondFeaturePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const feature = getCategoryFeature("second", slug);

  if (!feature) {
    notFound();
  }

  return <PageIntro title={feature.title} description={feature.description} />;
}
