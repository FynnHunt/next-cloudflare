import Image from "next/image";
import { colors } from "../globalStyles";
import up from "../../public/icons/up.svg";
import Vote from "./Vote";

type PostProps = {
  text: string;
};

export default function Post({ text }: PostProps) {
  return (
    <div className={`bg-zinc-800 w-9/12 max-w-7xl h-32 rounded-md p-6 flex`}>
      <div className="flex-auto">{text}</div>
      <Vote />
    </div>
  );
}
