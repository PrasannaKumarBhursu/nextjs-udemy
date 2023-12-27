import { Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { isUserLoading } from "../../store/selectors/isUserLoading";
import { useSetRecoilState, useRecoilValue } from "recoil";
import { userState } from "../../store/atoms/user";
import { userEmailState } from "../../store/selectors/userEmail";
import axios from "axios";


export default function Appbar({ }) {
  const router = useRouter();
  const userLoading = useRecoilValue(isUserLoading);
  const userEmail = useRecoilValue(userEmailState);
  const setUser = useSetRecoilState(userState);
  if (userLoading) {
    return <></>;
  }
  if (userEmail) {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
          backgroundColor: "rgb(67, 41, 240)",
        }}
      >
        <div
          style={{
            marginLeft: 10,
            cursor: "pointer",
            margin: 10,
          }}
          onClick={() => {
            router.push("/");
          }}
        >
          <Typography
            variant={"h5"}
            style={{ fontWeight: "bold", color: "white" }}
          >
            Coursera
          </Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10, display: "flex" }}>
            <div style={{ marginRight: 10 }}>
              <Button
                style={{
                  color: "white",
                  margin: 10,
                  borderRadius: "11%",
                }}
                onClick={() => {
                  router.push("/addcourse");
                }}
              >
                Add course
              </Button>
            </div>

            <div style={{ marginRight: 10 }}>
              <Button
                style={{
                  color: "white",
                  margin: 10,
                  borderRadius: "11%",
                }}
                onClick={() => {
                  router.push("/courses");
                }}
              >
                Courses
              </Button>
            </div>

            <Button
              variant={"contained"}
              style={{ backgroundColor: "red", margin: 10 }}
              onClick={() => {
                axios.post("/api/admin/logout");
                setUser({
                  isLoading: false,
                  userEmail: null,
                });
                router.push("/signin");
              }}
            >
              Logout
            </Button>
          </div>
        </div>
      </div>
    );
  } else {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          padding: 4,
          zIndex: 1,
          backgroundColor: "rgb(67, 41, 240)",
        }}
      >
        <div
          style={{ marginLeft: 10, cursor: "pointer", margin: 10 }}
          onClick={() => {
            router.push("/");
          }}
        >
          <Typography
            variant={"h6"}
            style={{ fontWeight: "bold", color: "white" }}
          >
            Coursera
          </Typography>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ marginRight: 10 }}>
            <Button
              variant={"contained"}
              style={{ margin: 10, backgroundColor: "green" }}
              onClick={() => {
                router.push("/signup");
              }}
            >
              Signup
            </Button>
          </div>
          <div>
            <Button
              variant={"contained"}
              style={{
                marginTop: 10,
                marginRight: 10,
                marginBottom: 10,
                backgroundColor: "blue",
              }}
              onClick={() => {
                router.push("/signin");
              }}
            >
              Signin
            </Button>
          </div>
        </div>
      </div>
    );
  }
}
