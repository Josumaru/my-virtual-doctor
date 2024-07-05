import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ArrowLeft } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";

interface Props {}

const NotFound: NextPage<Props> = ({}) => {
  return (
    <div>
      <Navbar />
      <div className="h-screen w-screen flex flex-col items-start justify-center p-4">
        <p className="text-red-400 font-bold ">404</p>
        <p className="text-3xl font-bold py-2">page not found</p>
        <p className="text-muted-foreground text-sm">
          we didn&apos;t find the page you were looking for
        </p>
        <Link href={"/"} className="flex flex-row items-center py-4">
          <ArrowLeft size={16} color="#ff4a70"/>
          <p className="text-red-400 text-sm font-medium">Start Chating with Cute Assistant</p>
        </Link>
      </div>
      <Footer />
    </div>
  );
};

export default NotFound;
