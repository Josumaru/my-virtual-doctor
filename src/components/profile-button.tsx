import { signOut } from "@/auth";
import { NextPage } from "next";
import { User } from "next-auth";
import { Button } from "./ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "./ui/avatar";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import {
  LogOut,
  Moon,
  Sun,
  User as UserIcon,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";

interface Props {
  user: User;
}

const ProfileButton: NextPage<Props> = ({ user }) => {
  return (
    <div className="flex">
      <Button variant={"ghost"} className="mx-1">
        <Link href="/contact" about="contact">
          Contact
        </Link>
      </Button>
      <Button variant={"outline"}>
        <LayoutDashboard className="mr-2 h-4 w-4" />
        <span>Dashboard</span>
      </Button>
      <form
        className="flex flex-row"
        action={async () => {
          "use server";
          console.log("Hello");

          await signOut();
        }}
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
              <span className="text-neutral-500">Log Out</span>
              <LogOut className="mr-2 h-4 w-4" />
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
