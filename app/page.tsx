import { ModeToggle } from "@/components/mode-toggle/mode-toggle";
import { CanvasStar } from "@/components/star/canvas-star";

export default function Home() {
  return (
    <div className="w-screen h-screen relative">
      <CanvasStar />
      <div className="absolute right-5 top-5">
        <ModeToggle />
      </div>
    </div>
  );
}
