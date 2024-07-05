import { NextPage } from 'next'

interface Props {}

const Page: NextPage<Props> = ({}) => {
  return <div className='h-screen'></div>
}

export default Page
// "use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   Card,
//   CardContent,
//   CardDescription,
//   CardFooter,
//   CardHeader,
//   CardTitle,
// } from "@/components/ui/card";
// import { Checkbox } from "@/components/ui/checkbox";
// import { Input } from "@/components/ui/input";
// import { UpdateNewUserAction, getUserAction } from "@/lib/actions";
// import { toast } from "@/components/ui/use-toast";
// import { ToastAction } from "@/components/ui/toast";
// import { useSession } from "next-auth/react";

// const NewUserPage = () => {
//   const { data: session, update: updateSession } = useSession();
//   const [name, setName] = useState("");
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const router = useRouter();

//   useEffect(() => {
//     console.log(session);
//     console.log("session");
//     console.log("session");
//   }, []);

//   const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     setName(e.target.value);
//   };

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const file = e.target.files?.[0] || null;
//     setSelectedFile(file);
//   };

//   const handleSave = async () => {
//     const user = await getUserAction();
//     const formData = new FormData();
//     formData.append("userId", user?.id!);
//     formData.append("name", name);
//     if (selectedFile) {
//       formData.append("image", selectedFile);
//     }

//     try {
//       const updatedUser = await UpdateNewUserAction(formData);
//       await updateSession({ ...session, user: updatedUser });
//       //   const iser = await session?
//       toast({
//         title: "Success",
//         description: updatedUser.name ?? "kosong",
//         action: <ToastAction altText="Close">Close</ToastAction>,
//       });
//       router.push("/");
//     } catch (error) {
//       console.log(error);
//       toast({
//         title: "Failed",
//         description: "Failed to update",
//         action: <ToastAction altText="Close">Close</ToastAction>,
//       });
//     }
//   };

//   return (
//     <main className="flex min-h-[calc(100vh_-_theme(spacing.16))] flex-1 flex-col gap-4 bg-muted/40 p-4 md:gap-8 md:p-10 mt-20">
//       <div className="mx-auto grid w-full max-w-6xl gap-2">
//         <h1 className="text-3xl font-semibold">Settings</h1>
//       </div>
//       <div className="mx-auto grid w-full max-w-6xl items-start gap-6 md:grid-cols-[180px_1fr] lg:grid-cols-[250px_1fr]">
//         <nav
//           className="grid gap-4 text-sm text-muted-foreground"
//           x-chunk="dashboard-04-chunk-0"
//         >
//           <Link href="/profile" className="font-semibold text-primary">
//             Profile
//           </Link>
//         </nav>
//         <div className="grid gap-6">
//           <Card x-chunk="dashboard-04-chunk-1">
//             <CardHeader>
//               <CardTitle>Your Name</CardTitle>
//               <CardDescription>
//                 Used to identify your name in chat.
//               </CardDescription>
//             </CardHeader>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSave();
//               }}
//             >
//               <CardContent>
//                 <Input
//                   placeholder="Kaguya Shinomiya"
//                   required
//                   value={name}
//                   onChange={handleNameChange}
//                 />
//               </CardContent>
//               <CardFooter className="border-t px-6 py-4">
//                 <Button type="submit">Save</Button>
//               </CardFooter>
//             </form>
//           </Card>
//           <Card x-chunk="dashboard-04-chunk-2">
//             <CardHeader>
//               <CardTitle>Profile Image</CardTitle>
//               <CardDescription>Set up your profile image</CardDescription>
//             </CardHeader>
//             <form
//               onSubmit={(e) => {
//                 e.preventDefault();
//                 handleSave();
//               }}
//             >
//               <CardContent className="flex flex-col gap-4">
//                 <Input type="file" onChange={handleFileChange} />
//                 <div className="flex items-center space-x-2">
//                   <Checkbox id="include" defaultChecked required />
//                   <label
//                     htmlFor="include"
//                     className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
//                   >
//                     Allow image to be displayed in the chat.
//                   </label>
//                 </div>
//               </CardContent>
//               <CardFooter className="border-t px-6 py-4">
//                 <Button type="submit">Save</Button>
//               </CardFooter>
//             </form>
//           </Card>
//         </div>
//       </div>
//     </main>
//   );
// };

// export default NewUserPage;
