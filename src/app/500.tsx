import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { ArrowLeft } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";

interface Props {}

const Error: NextPage<Props> = ({}) => {
  return (
    <div>
      <Navbar />
      <div className="h-screen w-screen flex flex-col items-start justify-center p-4">
        <p className="text-red-400 font-bold ">500</p>
        <p className="text-3xl font-bold py-2">Internal Server Error.</p>
        <p className="text-muted-foreground text-sm">
          Something wrong when rendering the page
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

export default Error;
