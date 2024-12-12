import bcrypt from "bcryptjs";

export function hashPassword(password: string) {
  // const salt = await bcrypt.genSalt(10);
  const hashpassword = bcrypt.hash(password, 12);
  return hashpassword;
}

export async function verifyPassword(password: string, hashedPassword: any) {
  const isMatch = await bcrypt.compare(password, hashedPassword);
  return isMatch;
}
