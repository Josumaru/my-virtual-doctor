import bcrypt from "bcryptjs";

const saltAndHashPassword = async (password: string) => {
  const saltRound = parseInt(process.env.BCRYPT_SALT_ROUNDS!);
  const hashedPassword = await bcrypt.hash(password, saltRound);
  return hashedPassword;
};

const verifyPassword = async (password: string, hashedPassword: string) => {
  const isValid = await bcrypt.compare(password, hashedPassword);
  return isValid;
};

export { saltAndHashPassword, verifyPassword };
