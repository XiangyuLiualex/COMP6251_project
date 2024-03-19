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
import { useMutation } from "@tanstack/react-query";

async function loginRequest(email: string, password: string): Promise<UserCredential> {
  return fetch("/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((response) => {
      return response.json();
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
  };
}

function Login() {
  // const [logined, setLogined] = useState(false);
  // const [email, setUsername] = useState("");
  // const [password, setPassword] = useState("");

  // const userData = useQuery({
  //   queryKey: ["login", username, password],
  //   queryFn: () => loginRequest(username, password)
  // });

  const mutation = useMutation<
    UserCredential,
    unknown,
    { email: string; password: string },
    unknown
  >({
    mutationFn: ({ email, password }) => loginRequest(email, password),
    onSuccess: (data) => {
      console.log("login success", data);
    }
  });

  const handleSubmit: FormEventHandler<HTMLFormElement> = (form) => {
    form.preventDefault();
    const formData = new FormData(form.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    mutation.mutate({ email, password });
  };


  // const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
  //   event.preventDefault();
  //   const data = new FormData(event.currentTarget);
  //   try {
  //     loginRequest(data.get("email") as string, data.get("password") as string);
  //     setLogined(true);
  //     // navigate
  //     console.log("login success");
  //     console.log({
  //       email: data.get("email"),
  //       password: data.get("password"),
  //     });
  //   } catch (error) {
  //     console.error("Login Failed:", error);
  //   }
  // };

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
        {mutation.isPending && <div>Fetching user data...</div>}
        {mutation.isError && <div>{`Error get data!!!`}</div>}
        {mutation.isSuccess && <div>success: user {mutation.data.user.email} </div>}
      </div>
      {/* {userData ? <div>Logined
    <div>{userData.data}</div>
    </div> : <div>Not Logined</div>} */}
    </Container>
  );
}
export default Login;
