import bcrypt from 'bcryptjs';
import sendOTP from './sendOTP';
import generateOTP from './generateOTP';
import { PrismaClient, Role } from '@prisma/client';
import { verifiedUser } from './verifiedUser';

const prisma = new PrismaClient();

export default async function registerUser(
  email: string,
  password: string,
  fullName: string,
  role: Role
) {
  const user = await verifiedUser(email);

  if (user) throw new Error('User already exists');

  // if user is new or not verified
  const { hashedOTP, OTP } = await generateOTP();
  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = await prisma.user.create({
    data: {
      role: role ?? 'USER',
      email,
      fullName,
      otp: hashedOTP,
      password: hashedPassword,
      otpExpiry: new Date(Date.now() + 60000 * 60 * 1), //expire after 1 hour
    },
  });

  await sendOTP(OTP, email);

  return {
    email: newUser.email,
    OTPExpire: newUser.otpExpiry,
  };
}
