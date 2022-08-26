import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";
import { GetServerSideProps } from "next";
import toast from "react-hot-toast";
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");

const KEY = 'asdfasdfsadfdasasfd';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { username, password } = req.body;

  // compare database username and password
  const user = await prisma.user.findFirst({
    where: {
      username,
    },
    select: {
      username: true,
      password: true,
    },
  });
  try {
    let status = false;

    if (user) {
      // const hashedPassword = await hashPassword(password);
      if (await bcrypt.compare(password, user.password)) {
        let status = true;
        return res.status(200).json({
          login: "success",
          token: jwt.sign(
            {
              username,
              status: status
            },
            KEY
          ),
        });
      }

      return res.status(200).json({
        login: "Incorrect password or username, please try again",
        token: jwt.sign(
          {
            username,
            status: status,
          },
          KEY
        ),
      });
    }
    return res
      .status(400)
      .json({ login: "User not found or invalid username input" });
  } catch (err) {
    toast.error("Something went wrong");
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
