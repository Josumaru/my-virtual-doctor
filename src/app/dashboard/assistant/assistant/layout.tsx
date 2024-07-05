import AssistantCard from "@/components/assistant-card";
import prisma from "@/lib/db";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { PlusIcon } from "lucide-react";
import { NextPage } from "next";
import { ResizableHandle, ResizablePanel } from "@/components/ui/resizable";

interface Props {
  children: React.ReactNode;
  description: React.ReactNode;
}

const AssistantLayout: NextPage<Props> = async ({ children, description }) => {
  const assistants = await prisma.assistant.findMany();
  return (
    <>
      <ResizablePanel defaultSize={60} className="flex flex-col">
        <div className="border-b pr-2">
          <div className="flex justify-between items-center w-full m-1">
            <b className="text-xl font-bold pl-2">Assistant</b>
            <Link href="/dashboard/assistant/assistant/add">
              <Button variant={"default"}>
                <p>New Assistant</p>
                <PlusIcon />
              </Button>
            </Link>
          </div>
        </div>
        <ResizablePanel defaultSize={60} className="flex flex-col">
          {assistants.map((assistant, index) => {
            return <AssistantCard key={index} data={assistant}></AssistantCard>;
          })}
        </ResizablePanel>
      </ResizablePanel>
      <ResizableHandle withHandle={true} />
      <ResizablePanel defaultSize={25}>{children}{description}</ResizablePanel>
      <ResizableHandle />
    </>
  );
};

export default AssistantLayout;
