import { Button, Card, Typography, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useRouter } from "next/router";
import axios from "axios";
import { NextApiRequest } from "next";
import { GetServerSidePropsContext } from "next";
import { Course, CoursesProps } from "../../types/types";

function Courses({ courses }: CoursesProps) {
  return (
    <div
      style={{ display: "flex", flexWrap: "wrap", justifyContent: "center" }}
    >
      {courses.map((course) => {
        return <Course course={course} />;
      })}
    </div>
  );
}

function Course({ course }: { course: Course }) {
  const router = useRouter();

  return (
    <Card
      style={{
        margin: 10,
        width: 300,
        minHeight: 200,
        padding: 20,
      }}
    >
      <Typography textAlign={"center"} variant="h5">
        {course.title}
      </Typography>
      <Typography textAlign={"center"} variant="subtitle1">
        {course.description}
      </Typography>
      <Typography
        textAlign={"center"}
        style={{ fontWeight: "bold" }}
        variant="subtitle1"
      >
        Rs. {course.price}
      </Typography>
      <img src={course.imageLink} style={{ width: 300 }}></img>
      <div style={{ display: "flex", justifyContent: "space-between", marginTop: 20 }}>
        <Button
          variant="contained"
          size="large"
          onClick={() => {
            router.push("/course/" + course._id);
          }}
        >
          Edit
        </Button>
        <IconButton

          onClick={() => {
            axios
              .delete(`/api/admin/course/${course._id}`)
              .then(() => {
                alert("Deleted course")
                router.push("/courses");
              })
              .catch((e) => {
                alert(e.response.data.message);
              });
          }}

          style={{ color: 'red' }}>
          <DeleteIcon />
        </IconButton>
      </div>
    </Card>
  );
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const { req } = context;
  console.log(req.headers);

  let apiUrl = "";
  if (req) {
    const host = req.headers?.host;
    const protocol = host?.startsWith("localhost") ? "http://" : "https://";
    apiUrl = protocol + host + "/api/admin/courses";
  }
  console.log(apiUrl);
  // Fetch data from external API
  const res = await axios.get(apiUrl);
  const courses = await res.data.courses;

  // Pass data to the page via props
  return { props: { courses } };
}

export default Courses;
