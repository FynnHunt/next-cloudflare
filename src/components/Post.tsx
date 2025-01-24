import Vote from "./Vote";

type PostProps = {
  text: string;
  votes: number;
  postId: string;
};

export default function Post({ text, votes, postId }: PostProps) {
  return (
    <div className={`bg-zinc-800 w-9/12 max-w-7xl h-32 rounded-md p-6 flex`}>
      <div className="flex-auto">{text}</div>
      <Vote votes={votes} postId={postId} />
    </div>
  );
}
