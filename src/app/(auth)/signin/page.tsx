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
import { signIn } from "next-auth/react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useRouter, useSearchParams } from "next/navigation";
import { Suspense, useState } from "react";
import { useToast } from "@/components/ui/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import Footer from "@/components/footer";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

interface Props {}
interface ErrorType {
  title: string;
  content: string;
}
const LoginPage: NextPage<Props> = ({}) => {
  const [error, setError] = useState<ErrorType | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  const searchParams = useSearchParams();
  const router = useRouter();
  const form = useForm();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);
    if (data.password.length < 8) {
      toast({
        title: "Password to small",
        description: "Password must be more than 8 characters",
        action: <ToastAction altText="Close">Close</ToastAction>,
      });
      setError({
        title: "Password to small",
        content: "Password must be more than 8 characters",
      });
    } else {
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
          description:
            "You have entered an invalid email or password, please try again!",
          action: <ToastAction altText="Close">Close</ToastAction>,
        });
        setError({
          title: "Failed to Login",
          content:
            "You have entered an invalid email or password, please try again!",
        });
      } else {
        router.push("/");
      }
    }
    setIsLoading(false);
  };
  return (
    <Suspense>
      <div>
        <div className={"flex flex-row lg:px-52 items-center"}>
          <div
            className={
              "hidden md:flex justify-between lg:justify-center flex-col w-1/2 md:p-4 lg:p-0"
            }
          >
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
              <Link
                className={"hover:underline pr-6"}
                target="_blank"
                href="/about"
              >
                About
              </Link>
              <Link
                className={"hover:underline pr-6"}
                target="_blank"
                href="https://github.com/Josumaru/my-virtual-doctor/blob/main/README.md"
              >
                Term & Conditions
              </Link>
              <Link
                className={"hover:underline pr-6"}
                target="_blank"
                href="https://github.com/Josumaru/my-virtual-doctor/"
              >
                Source
              </Link>
            </div>
          </div>
          <div className="w-screen p-4 md:p-0 md:w-1/2 flex justify-center h-screen items-center flex-col">
            <p className="text-lg mb-4">
              <strong>VIDO</strong> - Virtual Doctor
            </p>
            <Card
              className={"pt-5 m-1 md:p-5 w-full md:w-[400px] md:m-4 h-max"}
            >
              {error !== null ? (
                <Alert variant={"destructive"} className={"mx-5 w-auto"}>
                  <AlertTitle>{error.title}</AlertTitle>
                  <AlertDescription>{error.content}</AlertDescription>
                </Alert>
              ) : (
                <div></div>
              )}
              <CardTitle className={"p-5 md:p-5"}>Welcome back</CardTitle>
              <CardContent>
                <TooltipProvider>
                  <div className="flex pt-4">
                    <Tooltip>
                      <TooltipTrigger
                        asChild
                        onClick={() => {
                          signIn("google");
                        }}
                      >
                        <Button variant="outline" className={"mr-1 w-1/2"}>
                          <Image
                            priority
                            width={20}
                            src={GoogleIcon}
                            alt="Google Icon"
                          />
                          <p className={"px-1 text-sm"}>Google</p>
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
                        <Button variant="outline" className={"ml-1 w-1/2"}>
                          <Image
                            priority
                            width={20}
                            src={GithubIcon}
                            alt="Github Icons"
                          />
                          <p className={"px-1"}>GitHub</p>
                        </Button>
                      </TooltipTrigger>
                      <TooltipContent>
                        <p>Log in with Github</p>
                      </TooltipContent>
                    </Tooltip>
                  </div>
                </TooltipProvider>
                {/* <Form {...form}>
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
                            type="password"
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
              </Form> */}
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer />
      </div>
    </Suspense>
  );
};

export default LoginPage;
