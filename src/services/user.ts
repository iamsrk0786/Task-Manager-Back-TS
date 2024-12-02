import User, { IUser } from "../models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

export const registerUserService = async (
  username: string,
  email: string,
  password: string
): Promise<
  | { message: string; user?: { _id: string; username: string; email: string } }
  | Error
> => {
  if (!email) {
    throw new Error("Email is required");
  }
  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new Error("Email is already registered");
  }

  const newUser = new User({ username, email, password });
  await newUser.save();

  return {
    message: "User registered successfully",
    user: {
      _id: newUser.id.toString(),
      username: newUser.username,
      email: newUser.email,
    },
  };
};

export const loginUserService = async (
  email: string,
  password: string
): Promise<{ message: string; token?: string } | Error> => {
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error("Invalid email or password");
  }

  const isMatch = await user.comparePassword(password);
  if (!isMatch) {
    throw new Error("Invalid email or password");
  }

  const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
    expiresIn: "1d",
  });

  return { message: "Login successful", token };
};

export const getUserDetailsService = async (
  userId: string
): Promise<IUser | Error> => {
  const user = await User.findById(userId).select("-password");
  if (!user) {
    throw new Error("User not found");
  }
  return user;
};

// export const getAllUser = async (): Promise<IUser[]> => {
//   const users = await User.find().select("-password");
//   if (!users) {
//     throw new Error("User not found");
//   }
//   return users;
// };
