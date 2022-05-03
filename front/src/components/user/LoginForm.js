import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Card from "@mui/material/Card";
import { brown } from "@mui/material/colors";
import React, { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import * as Api from "../../api";
import { DispatchContext } from "../../App";
import Account from "./Account";
import TeddyImage from "./TeddyImage";
import GoogleLoginBtn from "./GoogleLoginBtn";
import { MyButton } from "../common/MyButton";

function LoginForm() {
  const navigate = useNavigate();
  const dispatch = useContext(DispatchContext);
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // "user/login" 엔드포인트로 post요청함.
      const res = await Api.post("user/login", {
        email,
        password,
      });
      // 유저 정보는 response의 data임.
      const user = res.data;
      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = user.token;
      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);
      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: user,
      });
      console.log("로그인에 성공했씁니다.\n");
      // 기본 페이지로 이동함.
      navigate("/", { replace: true });
    } catch (err) {
      console.log("로그인에 실패하였습니다.\n", err.response.data);
    }
  };

  const handleGoogleData = async (googleData) => {
    try {
      const { message, userInfo } = await Api.post("user/google-login", {
        token: googleData.tokenId,
      }).then((response) => response.data);

      // JWT 토큰은 유저 정보의 token임.
      const jwtToken = userInfo.token;

      // sessionStorage에 "userToken"이라는 키로 JWT 토큰을 저장함.
      sessionStorage.setItem("userToken", jwtToken);

      // dispatch 함수를 이용해 로그인 성공 상태로 만듦.
      dispatch({
        type: "LOGIN_SUCCESS",
        payload: userInfo,
      });

      console.log("구글 로그인 성공");

      if (message === "newbie") {
        navigate("/users/edit", { replace: true });
      } else {
        // 기본 페이지로 이동함.
        navigate("/", { replace: true });
      }
    } catch (e) {
      console.log("구글 로그인 실패: ", e.response.data);
    }
  };

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const validateEmail = (email) => {
    if (email !== "") {
      return email
        .toLowerCase()
        .match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        );
    }
    return false;
  };
  const isEmailValid = validateEmail(email);
  const isPasswordValid = password.length >= 4;
  const isFormValid = isEmailValid && isPasswordValid;

  const theme = createTheme();

  return (
    <ThemeProvider theme={theme}>
      <Grid
        container
        justifyContent="center"
        spacing={2}
        sx={{ marginTop: 12 }}
      >
        <TeddyImage />
        <Card>
          <Container component="main" maxWidth="xs">
            <Box
              sx={{
                marginTop: 4,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Typography component="h1" variant="h5">
                오늘도 와주셨군요!
              </Typography>
              <Box
                component="form"
                noValidate
                onSubmit={handleSubmit}
                sx={{ mt: 3 }}
              >
                <Account
                  email={email}
                  setEmail={setEmail}
                  password={password}
                  setPassword={setPassword}
                  isEmailValid={isEmailValid}
                  isPasswordValid={isPasswordValid}
                />
                <Grid
                  container
                  direction="column"
                  alignItems="center"
                  justifyContent="center"
                >
                  <Grid item>
                    <MyButton
                      type="submit"
                      fullWidth
                      variant="contained"
                      sx={{ mt: 3, mb: 2 }}
                      disabled={!isFormValid}
                    >
                      로그인
                    </MyButton>
                  </Grid>
                  <Grid item>
                    <GoogleLoginBtn responseGoogle={handleGoogleData} />
                  </Grid>
                </Grid>
                <Grid mt={2} container direction="column" alignItems="flex-end">
                  <Grid item xs={12}>
                    <Link variant="body2" onClick={() => navigate("/register")}>
                      테디곰과 함께 공부할래요?
                    </Link>
                  </Grid>
                  <Grid item xs={12}>
                    <Link
                      variant="body2"
                      onClick={() => navigate("/findpassword")}
                    >
                      비밀번호 찾기
                    </Link>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </Container>
        </Card>
      </Grid>
    </ThemeProvider>
  );
}

export default LoginForm;
