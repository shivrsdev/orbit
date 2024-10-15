// /src/components/login.tsx
// Login component

import { useState } from "preact/hooks";
import { Context } from "../context";
import axios, { AxiosError } from "axios";

export function Login(props: { context: Context }) {
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (event: Event) => {
    event.preventDefault();

    setLoading(true);

    if (username.length === 0 || password.length < 8) {
      setError("Incorrect username or password");
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      const response = await axios.post("/auth/login", {
        username: username,
        password: password,
      });

      if (response.data.token) {
        props.context.setToken(response.data.token);
        props.context.setUserId(response.data.userId);
      }

      setUsername("");
      setPassword("");

      setLoading(false);

      props.context.setPage("HOME");
    } catch (error) {
      if (
        error instanceof AxiosError &&
        (error.status === 401 || error.status === 422)
      )
        // Unauthorized
        setError("Incorrect username or password");
      // Error has occured
      else setError("An unexpected error has occured");

      setLoading(false);
    }

    setTimeout(() => setError(""), 3000);
  };

  const signup = async () => {
    if (username.length === 0 || password.length < 8) {
      setError(
        "Password must be minimum 8 characters and username must be filled"
      );
      setTimeout(() => setError(""), 3000);
      return;
    }

    try {
      await axios.post("/auth/signup", {
        username: username,
        password: password,
      });
    } catch (error) {
      if (error instanceof AxiosError) {
        switch (error.status) {
          case 500:
            setError("User already exists");
            break;
          case 422:
            setError(
              "Password must be minimum 8 characters and username must be filled"
            );
            break;
        }
      } else setError("An unexpected error has occured");
    }

    setTimeout(() => setError(""), 3000);

    setUsername("");
    setPassword("");
  };

  return (
    <main className="container">
      <div style="width: 75%; margin-right: auto; margin-left: auto; text-align: center; padding: 70px 0;">
        <article>
          <h1>Login</h1>
          <p style="color: #E23F44;">{error}</p>
          <form onSubmit={login}>
            <input
              type="text"
              name="username"
              placeholder="Username"
              onChange={(event) => setUsername(event.currentTarget.value)}
              value={username}
            />
            <input
              type="password"
              name="password"
              placeholder="Password"
              onChange={(event) => setPassword(event.currentTarget.value)}
              value={password}
            />
            <input
              class="outline"
              type="submit"
              value={loading ? "Loading..." : "Login"}
            />
            <input
              onClick={signup}
              class="outline contrast"
              type="button"
              value={loading ? "Loading..." : "Sign up"}
            />
          </form>
        </article>
      </div>
    </main>
  );
}
