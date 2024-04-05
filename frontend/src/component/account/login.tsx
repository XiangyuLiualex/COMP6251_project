import {
  Avatar,
  Box,
  Button,
  Checkbox,
  Container,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { FormEventHandler, useState } from "react";
import { DefaultError, useMutation } from "@tanstack/react-query";
import { Navigate, useNavigate } from "react-router-dom";
import { hasToken, sessionStore } from "../store/session";
import { Role } from "../store";

async function loginRequest(email: string, password: string): Promise<UserCredential> {
  return fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      return response.ok ? response.json() : Promise.reject(response);
    })
    .catch((error) => {
      console.error("Login Failed:", error);
      throw error;
    });
}

interface UserCredential {
  accessToken: string;
  user: {
    createdAt: string;
    email: string;
    id: string;
    role?: Role;
  };
}


//todo refactor mutation and redirect path
function roleBasedRedirect(role: Role): string {
  switch (role) {
    case "admin":
      return "/admin";


    // todo gp page not yet build
    // case "gp":
    //   return "/gp";

    case "patient":
      return "/patient";

    default:
      return "/patient";
  }
}

function useLoginMutation() {
  const navigate = useNavigate();

  return useMutation<
    UserCredential,
    DefaultError,
    {
      email: string; password: string
    },
    unknown
  >({
    mutationFn: ({ email, password }) => loginRequest(email, password),
    onSuccess: async (data) => {
      // sessionStore.setState({ token: data.accessToken })
      // todo : when backend build change into this way
      // sessionStore.setState({ token: data.accessToken, role: data.user.role})
      // tamporary workaround
      const role = await fetch(`/users/${data.user.id}`).then((res) => res.json()).then((data) => data.role);
      sessionStore.setState({ token: data.accessToken, role: role })

      navigate(roleBasedRedirect(role))
      console.log("login success", role);
    }
  });

}

export function Login() {

  const { mutate, data, isError, error, isPending, isSuccess } = useLoginMutation();

  const handleSubmit: FormEventHandler<HTMLFormElement> = (form) => {
    form.preventDefault();
    const formData = new FormData(form.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    mutate({ email, password });
  };


  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          //   setUsername(event.target.value);
          // }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
          // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          //   setPassword(event.target.value);
          // }}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href="#" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
      <div>
        <div>result:</div>
        {isPending && <div>Fetching user data...</div>}
        {isError && <div>{`is error!!!`}</div>}
        {error && <div>{`Error get data!!!`}</div>}
        {isSuccess && <div>success: user {data.user?.email} </div>}
        {hasToken() && <span>
          <div>role: {sessionStore.getState().role}</div>
          <div> Logined {sessionStore.getState().token}</div>
        </span>}
        {/* {mutation.data?.user && < Navigate to="/profile" replace={true} />} */}
      </div>
      {/* {userData ? <div>Logined
    <div>{userData.data}</div>
    </div> : <div>Not Logined</div>} */}
    </Container>
  );
}
