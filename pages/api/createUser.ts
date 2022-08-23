import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password, email } = req.body;

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
