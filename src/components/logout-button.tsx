"use client";
import { logoutAction } from "@/lib/actions";
import { LogOut } from "lucide-react";
import { NextPage } from "next";
import { Button } from "./ui/button";
import { signOut } from "@/auth";
import { FormEvent } from "react";

interface Props {}

const LogoutButton: NextPage<Props> = ({}) => {
  const handleSignOut = async (e: FormEvent) => {
    e.preventDefault();
    await logoutAction();
  };
  return (
    <form onSubmit={handleSignOut} className="w-full">
      <Button variant={"outline"} className="flex items-center w-full">
        <span className="text-neutral-500">Log Out</span>
      </Button>
    </form>
  );
};

export default LogoutButton;
