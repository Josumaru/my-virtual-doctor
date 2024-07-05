import Footer from "@/components/footer";
import Navbar from "@/components/navbar";
import { NextPage } from "next";
import React from "react";

interface Props {
  children: React.ReactNode;
}

const Layout: NextPage<Props> = ({ children }) => (
  <div className="flex min-h-screen w-full flex-col">
    <Navbar />
    {children}
    <Footer />
  </div>
);

export default Layout;
