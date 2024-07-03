import { ResizablePanel } from "@/components/ui/resizable";
import { NextPage } from "next";

interface Props {}

const InboxDefault: NextPage<Props> = ({}) => {
  return <ResizablePanel defaultSize={85}></ResizablePanel>;
};

export default InboxDefault;
