type PageIntroProps = {
  description: string;
  title: string;
};

export default function PageIntro({ description, title }: PageIntroProps) {
  return (
    <div className="mx-auto max-w-5xl px-4 pt-16 pb-4 md:px-6">
      <h1 className="text-4xl font-bold tracking-tight text-neutral-900 md:text-5xl">
        {title}
      </h1>
      <p className="mt-4 max-w-4xl text-[1.08rem] leading-relaxed text-neutral-700 md:text-[1.18rem]">
        {description}
      </p>
    </div>
  );
}
