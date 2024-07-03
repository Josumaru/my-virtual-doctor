import { NextPage } from "next";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { LogOut, Sun, User as UserIcon, LayoutDashboard } from "lucide-react";
import Link from "next/link";
import LogoutButton from "./logout-button";

interface Props {
  user: User;
  options: {
    showDashboardButton: boolean;
  };
}

const ProfileButton: NextPage<Props> = ({ user, options }) => {
  return (
    <div className="flex">
      {user.role === "doctor" && options.showDashboardButton ? (
        <Button variant={"outline"} className="hidden sm:block">
          <Link href={"/dashboard"} className="flex items-center">
            <LayoutDashboard className="mr-2 h-4 w-4" />
            <span>Dashboard</span>
          </Link>
        </Button>
      ) : (
        <Button variant={"ghost"} className="mx-1">
          {options.showDashboardButton ? (
            <Link href="/contact" about="contact">
              Contact
            </Link>
          ) : (
            <Link href="" about="contact">
              {user.name}
            </Link>
          )}
        </Button>
      )}
      <form
        className="flex flex-row"
        // action={async () => {
        //   "use server";
        //   await signOut();
        // }}
      >
        <DropdownMenu>
          <DropdownMenuTrigger className="outline-none">
            <Avatar className="mx-2">
              <AvatarImage src={user.image ?? ""} />
              <AvatarFallback>{user.name?.charAt(0)}</AvatarFallback>
            </Avatar>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuItem>{user.email}</DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between">
              <span className="text-neutral-500">Account Settings</span>
              <UserIcon className="mr-2 h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between">
              <span className="text-neutral-500">Theme</span>
              <Sun className="mr-2 h-4 w-4" />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between">
              <LogoutButton />
            </DropdownMenuItem>
            <DropdownMenuItem className="flex justify-between w-auto">
              <Button className="w-full">Upgrade Plan</Button>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </form>
    </div>
  );
};

export default ProfileButton;
