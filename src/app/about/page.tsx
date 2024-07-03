import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { NextPage } from "next";
import FrontEndImage from "@/assets/images/about/about_0.png";
import BackEndImage from "@/assets/images/about/about_1.png";
import DesignerImage from "@/assets/images/about/about_2.png";
import PentesterImage from "@/assets/images/about/about_3.jpg";
import Image from "next/image";
import Footer from "@/components/footer";
import Navbar from "@/components/navbar";

interface Props {}

const AboutPage: NextPage<Props> = ({}) => {
  return (
    <div>
      <Navbar />
      <div className="p-5 px-5 lg:px-64 pt-24">
        <p className="text-xl font-semibold">Our Team ~</p>
        <p className="text-muted-foreground w-4/5">
          "He seamlessly blends into both the backend and frontend worlds, not
          originating from a single discipline. When he is praised, it is for
          his versatile skills. At times, he feels the full weight of complex
          projects. Yet, no challenge can deter him from mastering similar feats
          in technology and design."
        </p>
        <div className="grid grid-cols-4 pt-5">
          <div className="flex flex-col items-center justify-center py-20 hover:bg-neutral-100 rounded-lg">
            <Image
              src={DesignerImage}
              height={100}
              width={100}
              className="rounded-full"
              alt="The Legend of Avatar Josu"
            />
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-sm">Joko</p>
              <p className="text-sm text-muted-foreground">L200220240</p>
              <p className="text-sm text-muted-foreground">Backend Developer</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-20 hover:bg-neutral-100 rounded-lg">
            <Image
              src={BackEndImage}
              height={100}
              width={100}
              className="rounded-full"
              alt="The Legend of Avatar Josu"
            />
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-sm">Supriyanto</p>
              <p className="text-sm text-muted-foreground">L200220240</p>
              <p className="text-sm text-muted-foreground">Designer</p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-20 hover:bg-neutral-100 rounded-lg">
            <Image
              src={FrontEndImage}
              height={100}
              width={100}
              className="rounded-full"
              alt="The Legend of Avatar Josu"
            />
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-sm">Joko Supriyanto</p>
              <p className="text-sm text-muted-foreground">L200220240</p>
              <p className="text-sm text-muted-foreground">
                Front End Developer
              </p>
            </div>
          </div>
          <div className="flex flex-col items-center justify-center py-20 hover:bg-neutral-100 rounded-lg">
            <Image
              src={PentesterImage}
              height={100}
              width={100}
              className="rounded-full"
              alt="The Legend of Avatar Josu"
            />
            <div className="flex flex-col justify-center items-center">
              <p className="font-bold text-sm">Walnut</p>
              <p className="text-sm text-muted-foreground">-</p>
              <p className="text-sm text-muted-foreground">Pentester</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-end pt-5">
          <div className="w-4/5">
            <p className="text-xl font-semibold">~ The Legend of Avatar Josu</p>
            <p className="text-muted-foreground">
              In the realm of digital dimensions, where code and creativity
              converge, there exists a legend of{" "}
              <strong>unparalleled prowess—Avatar Josu</strong>. Born from the
              essence of both the backend and frontend realms, Josu was never
              bound by the limits of a single discipline. From the
              <strong> ancient scripts of server-side logic</strong> to the
              vibrant landscapes of user interfaces, Josu mastered it all.\nIn
              times of harmony, the community showered him with praise for his
              seamless integrations and intuitive designs. But in times of
              turmoil, when the weight of complex projects bore down upon him,{" "}
              <strong>
                Josu faced the challenges head-on with unwavering resolve.
              </strong>
              His journey was not without pain, for the path of a true master is
              fraught with trials. Yet, no obstacle, no matter how daunting,
              could drive him away from his pursuit of excellence. With every
              line of code, every pixel placed with precision, Josu pushed the
              boundaries of what was possible. In whispers and in awe, the
              digital realm speaks of{" "}
              <strong>
                Avatar Josu—the one who bridges worlds, the legend who commands
                the forces of backend, frontend, and design with unmatched skill
                and dedication.
              </strong>
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default AboutPage;
