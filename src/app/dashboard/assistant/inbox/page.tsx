import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NextPage } from "next";
import { ResizablePanel } from "@/components/ui/resizable";

interface Props {}

const InboxSlotPage: NextPage<Props> = ({}) => {
  return <ResizablePanel defaultSize={85}></ResizablePanel>;
};

export default InboxSlotPage;
