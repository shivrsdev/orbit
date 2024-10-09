// /src/views/login.tsx
// Login view

import { Dispatch, StateUpdater, useState } from "preact/hooks";
import axios from "axios";

export function Login(props: {
  setView: Dispatch<StateUpdater<string>>;
  setToken: Dispatch<StateUpdater<string>>;
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); // "Incorrect username or password"

  const login = async (event: Event) => {
    event.preventDefault();

    try {
      const response = (await axios.post("/auth/login", {
        username: username,
        password: password,
      })) as { data: { token: string } };

      props.setToken(response.data.token);
      props.setView("HOME");

      // Clear input boxes
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);
      setError(
        "Incorrect username or password (in the rare case may be a server error)",
      );

      // After three seconds clear the error text
      setTimeout(() => setError(""), 3000);
    }
  };

  const signup = async () => {
    if(password.length < 8) {
      console.error('Password less than 8 characters');

      setError('Password must be atleast 8 characters');

      setTimeout(() => setError(""), 3000);

      return;
    }

    try {
      await axios.post("/auth/signup", {
        username: username,
        password: password,
      });

      // Clear input boxes
      setUsername("");
      setPassword("");
    } catch (error) {
      console.error(error);

      setError(
        "User already exists (if this keeps occuring, it may be an internal server error)"
      );

      // After three seconds clear the error text
      setTimeout(() => setError(""), 3000);
    }
  }

  return (
    <div style="width: 75%; margin-right: auto; margin-left: auto; text-align: center; padding: 70px 0;">
      <article>
        <h1 style="color: #00B478">login</h1>
        <p style="color: #ff6347">{error}</p>
        <form onSubmit={login}>
          <input
            type="text"
            name="username"
            placeholder="username"
            onChange={(event) => setUsername(event.currentTarget.value)}
            value={username}
          />
          <input
            type="password"
            name="password"
            placeholder="password"
            onChange={(event) => setPassword(event.currentTarget.value)}
            value={password}
          />
          <input class="outline" type="submit" value="login" />
          <input class="outline contrast" type="button" value="sign up" onClick={signup} />
        </form>
      </article>
    </div>
  );
}
