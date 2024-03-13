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
import { useState } from "react";
import { useQuery } from "@tanstack/react-query";

function Login() {
  // const [logined, setLogined] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');


  async function loginRequest (username: string, password: string){
    const u = encodeURIComponent(username);
    const p = encodeURIComponent(password);
    const url = `/api/user/password?username=${u}&password=${p}`;
    return fetch(url).then((res) => res.json());
  };

  const userData=useQuery({
    queryKey: ["login",username,password],
    queryFn : ()=>loginRequest(username,password)
  }); 


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
        <Box component="form" onSubmit={()=>userData.refetch()} noValidate sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setUsername(event.target.value);
            }}
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
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setPassword(event.target.value);
            }}
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
          {userData.isFetching && (
            <div>Fetching user data...</div>
          )}
          {userData.isError && (
            <div>{`Error get data!!!`}</div>
          )}
          {userData.data && userData.data.length > 0 && userData.data.map((user: any) => (
            <div>{user.name}</div>
          ))}
        </div>
    {/* {userData ? <div>Logined
    <div>{userData.data}</div>
    </div> : <div>Not Logined</div>} */}
    </Container>
  );
}
export default Login;
