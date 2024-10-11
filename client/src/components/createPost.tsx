// /src/components/createPost.tsx
// Creating post view

import { useState } from "preact/hooks";
import { Context } from "../context";
import axios from "axios";

export function CreatePost(props: { context: Context }) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const createPost = async (event: Event) => {
    event.preventDefault();

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
