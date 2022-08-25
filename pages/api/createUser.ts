import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
const bcrypt = require("bcrypt");

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password, email } = req.body;



  function hashPassword(password: string): string {
    return bcrypt.hash(password, 10).then(function (hash: string) {
      return hash;
    });
  }

  try {
    await prisma.user.create({
      data: {
        username,
        password,
        email,
      },
    });
    res.status(200).json({ message: "User Created" });
  } catch (err) {
    console.log("Something went wrong");
  }
}
