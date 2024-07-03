import { NextPage } from "next";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Button } from "@/components/ui/button";
import { Archive, ArchiveX, Edit3Icon, Trash } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { deleteAssistantAction, searchAssistantAction } from "@/lib/actions";
import Link from "next/link";
import { ResizablePanel } from "@/components/ui/resizable";

interface Params {
  params: {
    assistantId: string;
  };
}

const AssistantPage: NextPage<Params> = async ({ params }) => {
  const assistant = await searchAssistantAction(params.assistantId);

  return (
    <ResizablePanel defaultSize={25}>
      <div className="w-full">
        <div className="border-b p-1 flex justify-between">
          <div className="flex">
            <TooltipProvider>
              <Tooltip>
                <form>
                  <TooltipTrigger asChild>
                    <Button variant={"ghost"}>
                      <ArchiveX size={16} />
                    </Button>
                  </TooltipTrigger>
                </form>
                <TooltipContent>
                  <p>Deletea</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <form>
                  <TooltipTrigger asChild>
                    <Button variant={"ghost"}>
                      <Archive size={16} />
                    </Button>
                  </TooltipTrigger>
                </form>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <TooltipProvider>
              <Tooltip>
                <form
                  action={async () => {
                    "use server"
                    await deleteAssistantAction(assistant?.assistantId);
                  }}
                >
                  <TooltipTrigger asChild>
                    <Button variant={"ghost"}>
                      <Trash size={16} />
                    </Button>
                  </TooltipTrigger>
                </form>
                <TooltipContent>
                  <p>Delete</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <TooltipProvider>
            <Tooltip>
              <form>
                <TooltipTrigger asChild>
                  <Link href={`/dashboard/assistant/assistant/edit/${assistant?.assistantId}`}>
                  <Button type="button" variant={"ghost"}>
                    <Edit3Icon size={16} />
                  </Button>
                  </Link>
                </TooltipTrigger>
              </form>
              <TooltipContent>
                <p>Edit</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>

        <div>
          <div className="flex border-b w-full">
            <Avatar className="m-2">
              <AvatarImage src={assistant?.image ?? ""} />
              <AvatarFallback>{assistant?.name[0]}</AvatarFallback>
            </Avatar>
            <div className="w-full">
              <div className="flex justify-between items-center">
                <p className="text-sm font-semibold">{assistant?.name}</p>
                <p className="line-clamp-1 text-xs text-muted-foreground pr-1">
                  {assistant?.createdAt.toLocaleDateString()}
                </p>
              </div>
              <p className="line-clamp-1 text-xs">{assistant?.model}</p>
              <p className="line-clamp-1 text-xs">{`${assistant?.point} Points`}</p>
            </div>
          </div>
          <div className="flex-1 whitespace-pre-wrap p-4 text-sm">
            <p>{assistant?.description}</p>
          </div>
        </div>
      </div>
    </ResizablePanel>
  );
};

export default AssistantPage;
