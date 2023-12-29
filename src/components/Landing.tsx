import { Grid, Typography } from "@mui/material";
import Button from "@mui/material/Button";
import { useRouter } from "next/router";
import { useRecoilValue } from "recoil";
import { userEmailState } from "../../store/selectors/userEmail";
import { isUserLoading } from "../../store/selectors/isUserLoading";
import Image from "next/image";

export default function Landing() {
  const router = useRouter();
  const userEmail = useRecoilValue(userEmailState);
  const userLoading = useRecoilValue(isUserLoading);
  console.log("hello",userEmail, userLoading);
  
  return (
    <div>
      <Grid container style={{ padding: "5vw" }}>
        <Grid item xs={12} md={6} lg={6}>
          <div style={{ marginTop: 100 }}>
            <Typography variant={"h2"}>Udemy Admin</Typography>
            <Typography variant={"h5"}>
              A place to learn, earn and grow
            </Typography>
            {!userLoading && !userEmail && (
              <div style={{ display: "flex", marginTop: 20 }}>
                <div style={{ marginRight: 10 }}>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    style={{ backgroundColor: "green" }}
                    onClick={() => {
                      router.push("/signup");
                    }}
                  >
                    Signup
                  </Button>
                </div>
                <div>
                  <Button
                    size={"large"}
                    variant={"contained"}
                    style={{ backgroundColor: "blue" }}
                    onClick={() => {
                      router.push("/signin");
                    }}
                  >
                    Signin
                  </Button>
                </div>
              </div>
            )}
          </div>
          <div></div>
        </Grid>
        <Grid item xs={12} md={6} lg={6} style={{ marginTop: 20 }}>
          <Image
            src={"/teaching.jpg"}
            alt="classteacher"
            width={790}
            height={400}
          />
        </Grid>
      </Grid>
    </div>
  );
}
