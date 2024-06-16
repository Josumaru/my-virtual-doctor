import { auth } from "@/auth";
import prisma from "@/lib/db";
import bcrypt from "bcryptjs";
import { User } from "next-auth";

const getUserFromDb = async (
  email: string,
  password: string
): Promise<User | null> => {
  const user = (await prisma.user.findUnique({
    where: {
      email: email,
    },
  }));
  
  if (user && (await bcrypt.compare(password, user.password ?? ''))) {
    return user;
  }
  return null;

};

export { getUserFromDb };
