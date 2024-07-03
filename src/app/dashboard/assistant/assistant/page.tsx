import AssistantCard from "@/components/assistant-card";
import prisma from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NextPage } from "next";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";

interface Props {}

const AssistantSlotPage: NextPage<Props> = async ({}) => {
  return <ResizablePanel defaultSize={85}></ResizablePanel>;
};

export default AssistantSlotPage;
