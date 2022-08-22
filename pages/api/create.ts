import { prisma } from "../../lib/prisma";
import { NextApiRequest, NextApiResponse } from "next";


export default async function handler(req:NextApiRequest, res: NextApiResponse) {
  const {username, password} = req.body;
  
  try {
    await prisma.note.create({
      username, 
      password
  })
  } catch (err) {

  }
}