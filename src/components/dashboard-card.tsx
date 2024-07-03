import { NextPage } from "next";
import { Card, CardContent, CardDescription, CardHeader } from "./ui/card";
import { Users2 } from "lucide-react";

interface Props {}

const DashboardCard: NextPage<Props> = ({}) => {
  return (
    <Card>
      <CardHeader className="pb-0 pt-3 text-sm">
        <div className="flex justify-between items-center">
          <p>Patient</p>
          <Users2 size={14}></Users2>
        </div>
      </CardHeader>
      <CardContent className="pb-0 text-3xl font-extrabold">+23</CardContent>
      <CardDescription className="pb-3 pl-6 text-neutral-500 text-xs">
        +20.9% from last month
      </CardDescription>
    </Card>
  );
};

export default DashboardCard;
