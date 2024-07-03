import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { NextPage } from "next";

interface Props {
  children: React.ReactNode;
}

const DashboardPage: NextPage<Props> = ({ children }) => (
  <ResizablePanelGroup direction="horizontal">
    <ResizableHandle withHandle={true} />

    <ResizableHandle withHandle={true} />
    <ResizablePanel
      className="flex flex-col items-start w-max"
      defaultSize={15}
    >
      {children}
    </ResizablePanel>
  </ResizablePanelGroup>
);

export default DashboardPage;
