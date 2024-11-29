// import mongoose, { Schema, Document } from "mongoose";

// export interface IUser extends Document {
//   Name: string;
//   Email: string;
//   Password: string;
//   createdAt?: Date | null;
// }

// const userSchema:Schema<IUser> = new Schema({
//   Name: { type: String, required: true },
//   Email: { type: String, required: true, unique: true },
//   Password: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
// });

// const User = mongoose.model<IUser>("User", userSchema);
// export default User;

import mongoose, { Schema, Document, Model } from "mongoose";
import bcrypt from "bcrypt";

// Define User Interface
export interface IUser extends Document {
  username: string;
  email: string;
  password: string;
  comparePassword: (password: string) => Promise<boolean>;
}

// Define User Schema
const UserSchema: Schema<IUser> = new Schema(
  {
    username: {
      type: String,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

// Hash password before saving
UserSchema.pre<IUser>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Method to compare password
UserSchema.methods.comparePassword = async function (
  password: string
): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};

// Create User Model
const User: Model<IUser> = mongoose.model<IUser>("User", UserSchema);

export default User;
