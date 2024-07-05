import prisma from "@/lib/db";
import { User } from "next-auth";
import { saltAndHashPassword, verifyPassword } from "./password";

const fetchUser = async (
  email: string,
  password: string
): Promise<User | null> => {
  let user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  });

  console.log(user);

  if (!user) {
    // No user found, so this is their first attempt to login
    // meaning this is also the registration place
    user = await prisma.user.create({
      data: {
        name: "",
        email: email,
      },
    });
  } else {
    const account = await prisma.account.findFirst({
      where: {
        userId: user.id,
        type: "cdrl",
      },
    });
    console.log(account);

    if (!account) {
      // logic to salt and hash password
      const pwHash = await saltAndHashPassword(password);
      await prisma.account.create({
        data: {
          type: "cdrl",
          provider: "credentials",
          providerAccountId: user.id,
          user: {
            connect: {
              id: user.id,
            },
          },
          password: pwHash,
        },
      });
    } else {
      if (await verifyPassword(password, account.password!)) {
        return user;
      } else {
        return null;
      }
    }
  }
  return user;
};

export { fetchUser };
