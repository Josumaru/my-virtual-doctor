"use client";
import ProfileButton from "@/components/profile-button";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";
import { Skeleton } from "@/components/ui/skeleton";
import { getUserAction } from "@/lib/actions";
import { User } from "next-auth";
import Link from "next/link";
import { useEffect, useState } from "react";

interface Props {
  children: React.ReactNode,
  overview: React.ReactNode,
  assistant: React.ReactNode,
}

const DashboardLayout: React.FC<Props> = ({
  children,
  overview,
  assistant,
}) => {
  const [activeButton, setActiveButton] = useState<string>("overview");
  const [user, setUser] = useState<User>();

  useEffect(() => {
    const fetchUser = async () => {
      const user = await getUserAction();
      setUser(user);
    };
    fetchUser();
  }, []);

  return (
    <div className="h-screen p-4">
      <ResizablePanelGroup direction="vertical" className="rounded-lg border">
        <div className="flex justify-between flex-row p-2 items-center">
          <div>
            <Link
              onClick={() => {
                setActiveButton("dashboard");
              }}
              className={`text-sm font-medium transition-colors hover:text-primary p-2 ${
                activeButton == "overview"
                  ? "text-neutral-950"
                  : "text-neutral-400"
              }`}
              href={"/dashboard/overview"}
            >
              Overview
            </Link>
            <Link
              onClick={() => {
                setActiveButton("assistant");
              }}
              className={`text-sm font-medium transition-colors hover:text-primary p-2 ${
                activeButton == "dashboard"
                  ? "text-neutral-950"
                  : "text-neutral-400"
              }`}
              href={"/dashboard/assistant"}
            >
              Assistant
            </Link>
          </div>
          {user ? <ProfileButton user={user} options={{showDashboardButton: false}}/> : <Skeleton className="p-5 mr-2 w-[20px] h-[20px] rounded-full bg-primary" />}
        </div>
        <ResizableHandle />
        <ResizablePanel className="p-4 h-full" defaultSize={15}>
          {children}
          {overview}
          {assistant}
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
};

export default DashboardLayout;
