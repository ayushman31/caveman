import Text from "@/components/Text";

type MultiTextProps = {
  texts: string[];
};

export default function MultiText({ texts }: MultiTextProps) {
  return (
    <div className="flex flex-col gap-3">
      {texts.map((text, index) => (
        <Text key={index} text={text} />
      ))}
    </div>
  );
}