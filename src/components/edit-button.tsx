import { Edit3Icon } from "lucide-react";
import { NextPage } from "next";
import { Button } from "./ui/button";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "./ui/tooltip";


interface Props {}

const EditButton: NextPage<Props> = ({}) => {
  return (
    <TooltipProvider>
      <Tooltip>
        <form action={() => {}}>
          <TooltipTrigger asChild>
            <Button type="button" variant={"ghost"}>
              <Edit3Icon size={16} />
            </Button>
          </TooltipTrigger>
        </form>
        <TooltipContent>
          <p>Edit</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  );
};

export default EditButton;
