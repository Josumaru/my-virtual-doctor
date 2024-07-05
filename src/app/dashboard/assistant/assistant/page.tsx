import { NextPage } from "next";
import { ResizablePanel } from "@/components/ui/resizable";

interface Props {}

const AssistantSlotPage: NextPage<Props> = async ({}) => {
  return <ResizablePanel defaultSize={85}></ResizablePanel>;
};

export default AssistantSlotPage;
