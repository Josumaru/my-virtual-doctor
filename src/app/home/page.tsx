import { NextPage } from "next";
import TopAssistantComponent from "@/components/top-assistant";
import HomeCarousel from "@/components/home-carousel";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

interface Props {}

const HomePage: NextPage<Props> = async ({}) => {
  return (
    <div>
      <Navbar />
      <div className="flex flex-col lg:flex-row pt-5 lg:px-52">
        <HomeCarousel />
        <div className="lg:w-4/5">
          <TopAssistantComponent />
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default HomePage;
