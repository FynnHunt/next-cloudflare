import ToggleButtons from "@/components/ToggleButtons";
import { colors } from "@/globalStyles";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center">
      <div className="p-6 border-solid border-2 border-lime-400 w-full bg-lime-400">
        <div className="flex justify-between">
          <div className="flex items-center">test</div>
          <ToggleButtons />
          <div className="flex items-center">test</div>
        </div>
      </div>
      <div className="bg-zinc-900 w-full h-screen flex justify-center p-6">
        <div className={`bg-zinc-800 w-96 h-32 rounded-sm`}>
          <p className={`text-${colors.primaryYellow}`}>hello</p>
        </div>
      </div>
    </main>
  );
}
