import { signIn } from "@/auth";
import { NextPage } from "next";
import { Button } from "./ui/button";
import Link from "next/link";

interface Props {}

const SignInButton: NextPage<Props> = ({}) => {
  return (
    <Link href={"/api/auth/signin"}>
      <Button variant={"outline"} type="submit">
        Sign In
      </Button>
    </Link>
  );
};

export default SignInButton;
