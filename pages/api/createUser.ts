import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { hashPassword } from "../../utility/encoding";


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

 
  const { username, password, email } = req.body;
  const hashedPassword = await hashPassword(password);

  try {
    await prisma.user.create({
      data: {
        username,
        password : hashedPassword,
        email,
      },
    });
    res.status(200).json({ message: "User Created" });
  } catch (err) {
    console.log("Something went wrong");
  }
}
