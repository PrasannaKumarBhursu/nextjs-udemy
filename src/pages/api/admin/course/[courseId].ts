import type { NextApiRequest, NextApiResponse } from "next";
import { Course } from "../../../../lib/schema";
import connectToDB from "@/lib/dbConnect";
import { DataWithCourseType } from "../../../../../types/types";

connectToDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<DataWithCourseType>
) {

  console.log("req.method", req.method);


  if (req.method === "PUT" || req.method === "GET") {
    const { courseId } = req.query;
    const course = await Course.findByIdAndUpdate(courseId, req.body, {
      new: true,
    });
    if (course) {
      res.json({ message: "Course updated successfully", course });
    } else {
      res.status(404).json({ message: "Course not found" });
    }

  }

  if (req.method === "DELETE") {
    const { courseId } = req.query;

    try {
      const deletedCourse = await Course.findByIdAndDelete(courseId);

      if (deletedCourse) {
        res.json({ message: "Course deleted successfully", });
      } else {
        res.status(404).json({ message: "Course not found" });
      }
    } catch (error) {
      res.status(500).json({ message: "Error deleting course", });
    }
  }



}
