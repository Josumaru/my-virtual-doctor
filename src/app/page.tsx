import Navbar from "@/components/navbar";
import Image from "next/image";
import BannerImage from "@/assets/images/kaguya_0.png";
import { Button } from "@/components/ui/button";

export default async function Home() {
  return (
    <>
      <Navbar></Navbar>
      <div className="flex flex-row h-screen p-7 overflow-hidden">
        <div className="w-1/2 flex flex-col justify-center">
          <b className="text-6xl text-neutral-700">Modern Healthcare Solutions</b>
          <b className="text-6xl text-neutral-600">Considerate and cute Assistant</b>
          <b className="text-6xl text-neutral-500">Best of the best</b>
          <p className="text-xl text-neutral-400">Now you can consult anywhere and everywhere with a cute and caring assitant, with us of course.</p>
          <Button className="w-1/4 my-2">Get Started</Button>
        </div>
        <div className="w-1/2">
        <Image src={BannerImage} alt="banner"/>
        </div>
      </div>
    </>
  );
}
