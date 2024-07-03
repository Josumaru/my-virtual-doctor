import { NextPage } from "next";
import DashboardCard from "@/components/dashboard-card";
import BarChartComponent from "@/components/ui/bar-chart";
import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface Props {}

const OverviewSlotPage: NextPage<Props> = ({}) => {
  return (
  <div className="h-full">
      <b className="text-3xl font-bold tracking-tight">Dashboard</b>
      <div className="grid grid-cols-4 gap-4 pt-2">
        <DashboardCard></DashboardCard>
        <DashboardCard></DashboardCard>
        <DashboardCard></DashboardCard>
        <DashboardCard></DashboardCard>
      </div>
      <div className="grid grid-cols-5 gap-4 pt-4 h-auto">
        <Card className="col-span-3">
          <BarChartComponent></BarChartComponent>
        </Card>
        <Card className="col-span-2 flex ">
          <CardContent className="pt-4 w-auto">
            <div className="pb-5">
              <p className="font-medium">Top Assistant</p>
              <p className="text-muted-foreground">Solve 23 task today</p>
            </div>
            <div className="grid gap-2 h-max"></div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default OverviewSlotPage;
