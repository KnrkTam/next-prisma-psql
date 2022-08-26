import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { GetServerSideProps } from "next";
import { hashPassword } from "../../utility/encoding";
const bcrypt = require("bcrypt");


export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {

  const { username, password } = req.body;

  const user = await prisma.user.findFirst(
    {
      where: {
        username,
      },
      select: {
        username: true,
        password: true,
      }
    }
  )

  if (user) {

    // const hashedPassword = await hashPassword(password);
    if (await bcrypt.compare(password,user.password)) {
      return res.status(200).json({ login: "success" });
    }
    return res.status(200).json({ login: "failed"})

  } 
  return res.status(400).json({ login: "failed: no user found" });


  // if (!username) {
  //   return res.status(400).json({ message: "Invalid username"
  //   })
  // }
  // const hashedPassword = await hash(password);

  try {
   
    
  } catch (err) {
    console.log("Something went wrong");
  }
}


export const getServerSideProps: GetServerSideProps = async () => {
  const users = await prisma.user.findMany({
    select: {
      id: true,
      username: true,
      email: true,
      // password: true,
    },
  });
  return {
    props: {
      users,
    },
  };
};