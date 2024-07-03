import Navbar from "@/components/navbar";
import Image from "next/image";
import BannerImage from "@/assets/images/kaguya_0.png";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Footer from "@/components/footer";

export default async function Home() {
  return (
    <>
      <Navbar/>
      <div className="flex flex-row h-screen p-7 overflow-hidden px-7 lg:px-52">
        <div className="w-screen lg:w-1/2 flex flex-col justify-center">
          <b className="text-xl md:text-3xl lg:text-6xl text-neutral-700">
            Modern Healthcare Solutions
          </b>
          <b className="text-xl md:text-3xl lg:text-6xl text-neutral-600">
            Considerate and cute Assistant
          </b>
          <b className="text-xl md:text-3xl lg:text-6xl text-neutral-500">Best of the best</b>
          <p className="text-sm md:text-xl text-neutral-400">
            Now you can consult anywhere and everywhere with a cute and caring
            assitant, with us of course.
          </p>
          <Link href={"/home"}>
            <Button className="w-2/5 my-2 text-sm md:text-base">Get Started</Button>
          </Link>
        </div>
        <div className="w-1/2 hidden 2xl:block">
          <Image src={BannerImage} alt="banner"/>
        </div>
      </div>
      <Footer />
    </>
  );
}
