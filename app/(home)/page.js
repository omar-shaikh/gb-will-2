import Image from "next/image";
import Jumbotron from "../components/jumbotron";
import CTA1 from "../components/CTA1";
export default function Home() {
  return (
    <div>
      <Jumbotron />
      <CTA1 />
    </div>
  );
}
