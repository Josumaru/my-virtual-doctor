"use client";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FormControl,
  FormItem,
  FormField,
  FormLabel,
  Form,
} from "@/components/ui/form";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { NextPage } from "next";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import GoogleIcon from "@/assets/svgs/google.svg";
import Image from "next/image";
import GithubIcon from "@/assets/svgs/github.svg";
import { Label } from "@radix-ui/react-label";
import { signIn } from "next-auth/react";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";

interface Props {}

const LoginPage: NextPage<Props> = ({}) => {
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    const callBackUrl = searchParams.get("callbackUrl");
    const res = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      callbackUrl: callBackUrl ? callBackUrl : "/",
    });
    if (res?.error) {
      toast({
        title: "Failed to Login",
        description: "Check your credential or internet connection",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      setError(res?.error ?? "Unknown Credential");
    } else {
      router.push("/");
    }
    setIsLoading(false);
  };
  return (
    <div className={"flex flex-row"}>
      <div className={"flex justify-between flex-col p-20 w-1/2"}>
        <div>
          <div className={"pb-4"}>
            <b>Get Started</b>
            <p className={"text-neutral-500"}>
              Discover the best way to solve your health issues
            </p>
          </div>
          <div className={"pb-4"}>
            <b>Assisted by Virtual Doctor</b>
            <p className={"text-neutral-500"}>Receive answers in seconds</p>
          </div>
          <div className={"pb-4"}>
            <b>Join Millions of Article Publishers</b>
            <p className={"text-neutral-500"}>
              Create and publish your articles
            </p>
          </div>
        </div>
        <div>
          <a className={"hover:underline px-3"} href="#">
            About
          </a>
          <a className={"hover:underline px-3"} href="#">
            Term & Conditions
          </a>
          <a className={"hover:underline px-3"} href="#">
            Contact
          </a>
        </div>
      </div>
      <div className="w-1/2 flex justify-center h-screen items-center">
        <Card className={"p-5 w-max h-max"}>
          {error !== "" ? (
            <Alert variant={"destructive"} className={"mx-5 w-auto"}>
              <AlertTitle>Failed to login</AlertTitle>
              <AlertDescription>
                Make sure you have internet connection and try again!
              </AlertDescription>
            </Alert>
          ) : (
            <div></div>
          )}
          <CardTitle className={"p-5"}>Welcome back</CardTitle>
          <CardContent>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  asChild
                  onClick={() => {
                    signIn("google");
                  }}
                >
                  <Button variant="outline" className={"mr-1"}>
                    <Image
                      priority
                      width={20}
                      src={GoogleIcon}
                      alt="Google Icon"
                    />
                    <p className={"px-1"}>Log in With Google</p>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Log in with Google</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger
                  asChild
                  onClick={() => {
                    signIn("github");
                  }}
                >
                  <Button variant="outline" className={"ml-1"}>
                    <Image
                      priority
                      width={20}
                      src={GithubIcon}
                      alt="Github Icons"
                    />
                    <p className={"px-1"}>Log in With GitHub</p>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Log in with Github</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)}>
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email</FormLabel>
                      <FormControl>
                        <Input
                          type="email"
                          placeholder="example@vido.com"
                          {...field}
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="space-y-2">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          type="passwoord"
                          placeholder="••••••••"
                          {...field}
                          required
                        />
                      </FormControl>
                    </FormItem>
                  )}
                />
                <div className="space-x-2 py-2 flex items-center">
                  <Checkbox />
                  <Label>Remember me</Label>
                </div>
                <div className="flex justify-between w-auto">
                  <Button
                    type="submit"
                    className="w-full"
                    aria-disabled={isLoading}
                  >
                    {isLoading ? "Please Wait" : "Log In"}
                  </Button>
                </div>
              </form>
            </Form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default LoginPage;
