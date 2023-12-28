// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Admin } from "../../../lib/schema";
import { sign } from "jsonwebtoken";
import { serialize } from "cookie";
import connectToDB from "@/lib/dbConnect";
import { Data } from "../../../../types/types";

connectToDB();

const SECRET = process.env.SECRET || "";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data> 
) {
  const { username, password } = req.headers;
  console.log(username, password);
  
  const admin = await Admin.findOne({ username, password });
  console.log("admin",admin);
  
  if (!admin) {
    res.status(403).json({ message: "Invalid username or password" });
  } else {
    const token = sign({ username, role: "admin" }, SECRET, {
      expiresIn: Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 30, // 30 days
    });

    const serialised = serialize("courseraJWT", token, {
      httpOnly: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 30,
      path: "/",
    });

    console.log("serailzed", JSON.stringify(serialised));
    

    res.setHeader("Set-Cookie", serialised);

    res.json({ message: "Logged in successfully" });
  }
}
