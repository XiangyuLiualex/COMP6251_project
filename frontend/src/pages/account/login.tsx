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
import { FormEventHandler } from "react";
import { hasToken, sessionStore, useLoginMutation } from "../../entities/session";
import { pathKeys } from "../medical/config/path";

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
          Login
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
            Login
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
            <Grid item>
              <Link href={pathKeys.signUp()} variant="body2">
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
        {isSuccess && <div>success: user {data.email} </div>}
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
