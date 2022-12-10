interface CenteredTextProps {
  text: string;
}

export default function CenteredText({ text }: CenteredTextProps) {
  return <p className="flex justify-center items-center h-full">{text}</p>;
}
