import { LineChart } from "lucide-react";
import { NextPage } from "next";
import Link from "next/link";
import { ReactNode } from "react";
import { SheetTrigger } from "./ui/sheet";

interface Props {
  props: {
    icon: ReactNode;
    href: string;
    text: string;
  };
}

const SidebarLink: NextPage<Props> = ({ props }) => {
  return (
    <SheetTrigger asChild>
      <Link
        href={props.href}
        className="mx-[-0.65rem] flex items-center gap-4 rounded-lg px-3 py-2 text-muted-foreground hover:text-foreground hover:bg-neutral-100"
      >
        {props.icon}
        <p className="text-sm">{props.text}</p>
      </Link>
    </SheetTrigger>
  );
};

export default SidebarLink;
