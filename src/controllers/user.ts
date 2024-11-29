// import { Request, Response } from "express";

// import * as userServices from "../services/user";

// export const createUser = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
//     const { Name, Email, Password, createdAt } = req.body;
//     const newUser = await userServices.createUser({
//       Name,
//       Email,
//       Password,
//       createdAt,
//     });
//     res.status(201).json({
//       success: true,
//       message: "User created successfully",
//       data: newUser,
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(400).json({ message: "Error creating user", error: e });
//   }
// };

// export const getUserById = async (
//   req: Request,
//   res: Response
// ): Promise<void> => {
//   try {
    //     const user = await userServices.getUserById(req.params.id);
    //     if (!user) res.status(404).json({ message: "User not found" });
    //     res.status(200).json({
//       success: true,
//       message: "User fetched successfully",
//       data: user,
//     });
//   } catch (e) {
    //     console.log(e);
//     res.status(500).json({ message: "Error fetching user", error: e });
//   }
// };
// export const loginUser = async (req: Request, res: Response): Promise<void> => {
//   try {
//     const { Email, Password } = req.body;
//     const user = await userServices.loginUser(Email);
//     if (!user) res.status(401).json({ message: "Invalid email or password" });
//     res.json({
    //       success: true,
    //       message: "User authenticated successfully",
//       data: {
//         user,
//       },
//     });
//   } catch (e) {
//     console.log(e);
//     res.status(500).json({ message: "Error authenticating user", error: e });
//   }
// };



import { Request, Response } from "express";
import {
  registerUserService,
  loginUserService,
  getUserDetailsService,getAllUser,
} from "../services/user";


// Register User
export const registerUser = async (req: Request, res: Response) => {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
       res.status(400).json({ message: "All fields are required" });
    }
  
    // Optional: Add more robust validation for `email`
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
     res.status(400).json({ message: "Invalid email format" });
    }

  try {
    const response = await registerUserService(username, email, password);
    res.status(201).json(response);
} catch (error: any) {
    res.status(400).json({ message: error.message });
}
};

// Login User
export const loginUser = async (req: Request, res: Response) => {
    const { email, password } = req.body;

  try {
    const response = await loginUserService(email, password);
    res.status(200).json(response);
} catch (error: any) {
    res.status(400).json({ message: error.message });
  }
};

// Get User Details
interface AuthRequest extends Request {
    user?: any;
  }
export const getUserDetails = async (req: AuthRequest, res: Response) => {
  try {
    const user = await getUserDetailsService(req.user.id);
     res.status(200).json(user);
  } catch (error: any) {
    res.status(404).json({ message: error.message });
  }
};



export const getAllUsers = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const users = await getAllUser();
    res.status(200).json({
      success: true,
      message: "Users fetched successfully",
      data: users,
    });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error fetching users", error: e });
  }
};