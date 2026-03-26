type TextProps = {
    text: string;
  };
  
  export default function Text({ text }: TextProps) {
    return (
      <p className="text-base leading-relaxed text-neutral-700 md:text-lg">
        {text}
      </p>
    );
  }