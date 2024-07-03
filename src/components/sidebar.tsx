import { NextPage } from "next";
import { Button } from "./ui/button";
import {
  Sidebar as SidebarOpenIcon,
  UsersRound,
  MessageCircleMore,
  NewspaperIcon,
  LucideLogOut,
  LucideLayoutDashboard,
} from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "./ui/sheet";
import SidebarLink from "./sidebar-icon";
import { getUserAction } from "@/lib/actions";

interface Props {}

const Sidebar: NextPage<Props> = async ({}) => {
  const user = await getUserAction();
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline" size="icon" className="shrink-0 sm:hidden">
          <SidebarOpenIcon />
        </Button>
      </SheetTrigger>
      <SheetContent side="left" className="flex flex-col">
        <nav className="grid gap-2 text-sm font-medium">
          <p className="text-sm text-bold">
            VIDO - <span>Virtual Doctor</span>
          </p>

          <SidebarLink
            props={{
              href: "/home",
              icon: <MessageCircleMore />,
              text: "Get Started",
            }}
          />
          <SidebarLink
            props={{
              href: "/news",
              icon: <NewspaperIcon />,
              text: "Health News",
            }}
          />
          <SidebarLink
            props={{ href: "/about", icon: <UsersRound />, text: "About Us" }}
          />
          {user?.role === "doctor" ? (
            <SidebarLink
              props={{
                href: "/dashboard/",
                icon: <LucideLayoutDashboard />,
                text: "Dashboard",
              }}
            />
          ) : (
            <div></div>
          )}
        </nav>
        <div className="mt-auto">
          <Button variant={"outline"} className="flex items-center w-full">
            <LucideLogOut />
            <p>Logout</p>
          </Button>
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default Sidebar;
