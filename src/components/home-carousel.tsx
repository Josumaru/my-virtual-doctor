"use client";
import { NextPage } from "next";
import {
  Carousel,
  CarouselApi,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { useEffect, useState } from "react";
import Image from "next/image";
import Carousel1 from "@/assets/images/carousel/carousel_1.jpg";
import Carousel2 from "@/assets/images/carousel/carousel_2.jpg";
import Carousel3 from "@/assets/images/carousel/carousel_3.jpg";
import Carousel4 from "@/assets/images/carousel/carousel_4.jpg";
import Carousel5 from "@/assets/images/carousel/carousel_5.jpg";
import { AspectRatio } from "./ui/aspect-ratio";

interface Props {}

const HomeCarousel: NextPage<Props> = ({}) => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const carouselImages = [
    Carousel1,
    Carousel2,
    Carousel3,
    Carousel4,
    Carousel5,
  ];

  return (
    <div className="w-full h-screen overflow-x-hidden flex justify-between flex-col items-center lg:border-r pt-24 px-4">
      <div className="flex items-center flex-col mb-10">
        <b>Chat with cute assistant</b>
        <p className={"text-neutral-500 text-sm text-center"}>
          Choose your favorite assistant and find solutions to your problems
          with her.
        </p>
      </div>
      <div className="flex items-center w-full justify-center">
        <Carousel setApi={setApi} className="w-full max-w-xs">
          <CarouselContent>
            {carouselImages.map((image, index) => (
              <CarouselItem key={index}>
                <Card>
                  <AspectRatio>
                    <Image
                      src={image}
                      alt={`Carousel ${index + 1}`}
                      layout="fill"
                      objectPosition="center"
                      className="rounded-lg"
                    />
                  </AspectRatio>
                </Card>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
      <div className="py-2 text-center text-sm text-muted-foreground">
        Image {current} of {count}
      </div>
      <div className={"flex justify-start items-start flex-col lg:p-0 md:p-20 w-full"}>
        <div>
          <div className={"pb-4"}>
            <b>Get Started</b>
            <p className={"text-neutral-500 text-sm"}>
              Discover the best way to solve your health issues
            </p>
          </div>
          <div className={"pb-4"}>
            <b>Assisted by Virtual Doctor</b>
            <p className={"text-neutral-500 text-sm"}>
              Receive answers in seconds
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeCarousel;
