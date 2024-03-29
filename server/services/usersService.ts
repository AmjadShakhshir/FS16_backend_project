import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserRepo from "../models/UserModel";
import RoleRepo from "../models/RoleModel";
import { CreateUserInput, User, UserUpdate } from "../types/User";

async function findAll() {
  const users = await UserRepo.find()
  .populate("roleId")
  .exec();
  return users;
}

async function getSingleUser(index: string) {
  const id = new mongoose.Types.ObjectId(index);
  const user = await UserRepo.findById(id)
  .populate("roleId");
  return user;
}

async function updateUser(index: string, user: UserUpdate) {
  const hashedPassword = user.password ? bcrypt.hashSync(user.password, 10) : undefined;
  user.password = hashedPassword;
  const updatedUser = await UserRepo.findOneAndUpdate({ _id: index }, user, {
    new: true,
  });
  return updatedUser;
}

async function deleteUser(index: string) {
  const deletedUser = await UserRepo.findOneAndDelete({ _id: index });
  return deletedUser;
}

async function signUp( user: CreateUserInput) {
  const hashedPassword = bcrypt.hashSync(user.password, 10);
  const newUser = new UserRepo({ ...user, password: hashedPassword });
  await newUser.save();
  return newUser;
}

async function logIn(email: string, password: string) {
  const foundUser = await UserRepo.findOne({ email: email });
  if (!foundUser || !foundUser.password) {
    return null;
  }
  const isValid = bcrypt.compareSync(password, foundUser.password);
  if (!isValid) {
    return null;
  }
  const foundRole = await RoleRepo.findById({ _id: foundUser.roleId });
  if (!foundRole) {
    return null;
  }
  const payload = {
    _id: foundUser._id,
    name: foundUser.name,
    email: foundUser.email,
    role: foundRole.name,
    permissions: foundRole.permissions,
    avatar: foundUser.avatar
  };

  const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
    expiresIn: "1h",
  });
  const loggedInUser = {...payload, accessToken}
  return loggedInUser;
}

async function googleLogin(user: User) {
  const foundRole = await RoleRepo.findById({ _id: user.roleId });
  if (user && foundRole) {
    const payload = {
      email: user.email,
      role: foundRole.name,
    };
    const accessToken = jwt.sign(payload, process.env.TOKEN_SECRET as string, {
      expiresIn: "1h",
    });
    return accessToken;
  }
  return null;
}

export default {
  findAll,
  getSingleUser,
  updateUser,
  deleteUser,
  signUp,
  logIn,
  googleLogin,
};
