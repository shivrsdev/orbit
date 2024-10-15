// /src/components/createPost.tsx
// Creating post view

import { useState } from "preact/hooks";
import { Context } from "../context";
import axios from "axios";

export function CreatePost(props: { context: Context }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [error, setError] = useState("");

  const createPost = async (event: Event) => {
    event.preventDefault();

    if(title.length === 0 || title.length > 30) {
      setError("Title must be less than 30 characters and filled");
      setTimeout(() => setError(""), 3000);
      return;
    }

    if(content.length === 0 || content.length > 69) {
      setError("Content must be filled and less than 70 characters");
      setTimeout(() => setError(""), 3000);
      return;
    }

    await axios.post(
      "/api/posts",
      {
        title: title,
        content: content,
      },
      {
        headers: {
          Authorization: props.context.token,
        },
      }
    );

    setTitle("");
    setContent("");

    props.context.setPage("HOME");
  };

  return (
    <main className="container">
      <div style="width: 75%; margin-right: auto; margin-left: auto; text-align: center; padding: 70px 0;">
        <article>
          <h1>Create your own post</h1>
          <p style="color: #E23F44;">{error}</p>
          <form onSubmit={createPost}>
            <input
              type="text"
              name="title"
              placeholder="Title"
              onChange={(event) => setTitle(event.currentTarget.value)}
              value={title}
            />
            <input
              type="text"
              name="content"
              placeholder="What's on your mind?"
              onChange={(event) => setContent(event.currentTarget.value)}
              value={content}
            />
            <div>
              <input type="submit" id="create-post" />
            </div>
          </form>
        </article>
      </div>
    </main>
  );
}
