import { Course } from "../../../lib/schema";
import type { NextApiRequest, NextApiResponse } from "next";
import connectToDB from "@/lib/dbConnect";
import { Data } from "../../../../types/types";
connectToDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  console.log("req.headers", req.headers);

  if (req.method === "GET") {
    const courses = await Course.find({});
    console.log(courses);

    res.json({ courses: courses });
  }

  if (req.method === "POST") {
    const course = new Course(req.body);
    await course.save();
    res.json({ message: "Course created successfully", courseId: course._id });
  }
}
