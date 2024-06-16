// import prisma from "@/lib/db";
// import bcrypt from "bcryptjs";
// import { Account, User } from "next-auth";

// type UserWithPassword = Account & {
//   password: string;
// };

// const getUserFromDb = async (
//   email: string,
//   pwHash: string
// ): Promise<UserWithPassword | null> => { 
//     const user = (await prisma.user.create({
//         data:{
//             email:email,
//             accounts: {
//                 pass
//             }
//         }
//     }));
// //   if (user && (await bcrypt.compare(pwHash, user.password))) {
// //     return user;
// //   }
//   return null;
// };

// export { getUserFromDb };
