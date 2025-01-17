import { User } from "@prisma/client";
import db from "../libs/db";
import { IUserRegister } from "../types/auth";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const login = async (username: string, password: string) => {
  try {
    const existedUser = await db.user.findFirst({
      where: {
        OR: [{ username: username }, { email: username }],
      },
    });

    function exclude(user: any, keys: any) {
      return Object.fromEntries(
        Object.entries(user).filter(([key]) => !keys.includes(key))
      );
    }

    const existedUserWithoutPass = exclude(existedUser, ["password"]);

    if (!existedUser) {
      return null;
    }

    const isMatch = await bcrypt.compare(password, existedUser.password);

    if (!isMatch) {
      return null;
    }

    const token = jwt.sign(
      existedUserWithoutPass,
      process.env.SECRET_KEY! || "secret",
      {
        expiresIn: "1d",
      }
    );

    return token;
  } catch (error) {
    throw error;
  }
};

export const register = async (user: IUserRegister): Promise<User | string> => {
  try {
    const existedUser = await db.user.findFirst({
      where: {
        username: user.username,
      },
    });

    if (existedUser) {
      throw new Error("Username already exist");
    }

    //   hash password agar aman
    const hashedPassword = await bcrypt.hash(user.password, 10);

    user.password = hashedPassword;

    const newUser = await db.user.create({
      data: user,
    });

    return newUser;
  } catch (error: any) {
    console.log(error);
    throw error.message;
  }
};

export const checkAuth = async (id: number) => {
  return await db.user.findFirst({
    where: { id },
  });
};