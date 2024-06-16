import bcrypt from "bcryptjs";

const saltAndHashPassword = async (password: string) => {
  const saltRound = parseInt(process.env.BCRYPT_SALT_ROUNDS!);
  const hashedPassword = await bcrypt.hash(password, saltRound);
  return hashedPassword;
};

export { saltAndHashPassword };
