// /src/main.tsx
// Entry point to frontend

import { render } from "preact";
import { useState } from "preact/hooks";
import { Login } from "./views/login";
import { Home } from "./views/home";
import { Post } from "./views/post";

function App() {
  const [view, setView] = useState("LOGIN");
  const [token, setToken] = useState("");

  return (
    <main className="container">
      {view === "LOGIN" ? (
        <Login setView={setView} setToken={setToken} />
      ) : view === "HOME" ? (
        <Home setView={setView} token={token} />
      ) : view === "POST" ? (
        <Post setView={setView} token={token}/>
      ) : (
        <p>You are in the wrong place!</p>
      )}
    </main>
  );
}

render(<App />, document.getElementById("app")!);
