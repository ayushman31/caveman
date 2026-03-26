type ContentProps = {
    items: React.ReactNode[];
  };
  
  export default function Content({ items }: ContentProps) {
    return (
      <section className="mx-auto flex w-full max-w-5xl flex-col gap-8 px-4 py-10 md:px-6 md:py-16">
        {items.map((item, index) => (
          <div key={index}>{item}</div>
        ))}
      </section>
    );
  }