"use client"
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import {
  Typography,
  TextField,
  Button,
  CircularProgress,
  makeStyles,
} from "@material-ui/core";
import { LockOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginTop: theme.spacing(4),
  },
  icon: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: "100%",
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  progress: {
    margin: theme.spacing(2),
  },
}));

export default function Login() {
  const classes = useStyles();
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setIsLoading(true);
    setErrorMessage("");

    try {
      const response = await axios.post("/api/login", {
        username,
        password,
      });
      if (response.status === 200) {
        router.push("/");
      } else {
        setErrorMessage(response.data.message);
      }
    } catch (error) {
      setErrorMessage(error.response?.data?.message ?? "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={classes.root}>
      <LockOutlined className={classes.icon} />
      <Typography component="h1" variant="h5">
        Sign in
      </Typography>
      <form className={classes.form} onSubmit={handleSubmit}>
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          id="username"
          label="Username"
          name="username"
          autoComplete="username"
          autoFocus
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
        <TextField
          variant="outlined"
          margin="normal"
          required
          fullWidth
          name="password"
          label="Password"
          type="password"
          id="password"
          autoComplete="current-password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
          disabled={isLoading}
        >
          {isLoading ? (
            <CircularProgress size={24} className={classes.progress} />
          ) : (
            "Sign In"
          )}
        </Button>
        {errorMessage && (
          <Typography color="error" align="center">
            {errorMessage}
          </Typography>
        )}
      </form>
    </div>
  );
}
