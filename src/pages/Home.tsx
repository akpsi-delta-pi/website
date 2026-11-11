import { Hero } from "../components/home/Hero";
import { About } from "../components/home/About";
import { Values } from "../components/home/Values";
import { Benefits } from "../components/home/Benefits";
import { PhotoTiles } from "../components/home/PhotoTiles";

export function Home() {
  return (
    <main>
      <Hero />
      <About />
      <Benefits />
      <PhotoTiles />
      <Values />
    </main>
  );
}
