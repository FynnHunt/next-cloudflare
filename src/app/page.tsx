import ToggleButtons from "@/components/ToggleButtons";
import Post from "../components/Post";

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
      <div className="bg-zinc-900 w-full h-screen flex flex-col items-center p-6 gap-y-3">
        <Post text="Just got asked if I was 'from the university'... I’m holding a Greggs sandwich, not a PhD, mate. 🥪🤔" />
        <Post text="Spent the last hour trying to find a café in Cambridge that wasn't full of students doing 'important research' aka avoiding real work. Ended up at a tiny bookshop where the only thing on offer is a latte made with oat milk, existential dread, and a selection of books I’ll pretend to read at my next dinner party. ☕📚" />
        <Post text="Was gonna go to Banbury Cross to see the horse, but then remembered I’m still trying to find a parking space. Guess I’ll just ride the struggle bus. 🚍🐴" />
        <Post text="Decided to take a stroll along Swansea Bay today, you know, for a bit of 'fresh air' and 'peaceful reflection.' Ended up dodging seagulls trying to steal my pasty, getting sand in places I didn’t know existed, and accidentally joining a hen party. Now I’m one mojito deep, contemplating if I’ve accidentally signed up for a bachelorette weekend. 🌊🦆🥳 " />
      </div>
    </main>
  );
}
