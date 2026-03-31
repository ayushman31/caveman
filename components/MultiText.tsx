import Text from "@/components/Text";

type MultiTextProps = {
  footerLabel?: string;
  footerText?: string;
  title?: string;
  texts: string[];
};

export default function MultiText({
  footerLabel,
  footerText,
  title,
  texts,
}: MultiTextProps) {
  return (
    <div className="flex flex-col gap-3">
      {title ? (
        <h3 className="text-outer-glow text-[1.4625rem] leading-[1.35]">
          {title}
        </h3>
      ) : null}
      {texts.map((text, index) => (
        <Text key={index} text={text} />
      ))}
      {footerLabel || footerText ? (
        <div className="mt-2 flex flex-col gap-1 border-t border-black/10 pt-3">
          {footerLabel ? (
            <p className="text-[0.76rem] font-semibold tracking-[0.06em] text-neutral-700/80">
              {footerLabel}
            </p>
          ) : null}
          {footerText ? (
            <p className="text-sm leading-relaxed text-neutral-700/80">
              {footerText}
            </p>
          ) : null}
        </div>
      ) : null}
    </div>
  );
}
