// /src/components/home.tsx
// Home component

import { useEffect, useState } from "preact/hooks";
import { Context } from "../context";
import axios from "axios";
import { Post } from "../models/post";

export function Home(props: { context: Context }) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get("/api/posts/newest", {
        headers: {
          Authorization: props.context.token,
        },
      });

      setPosts(response.data);
    };

    fetchPosts();
  }, [props.context.token]);

  return (
    <main className="container">
      <h1 style="text-align: center; padding: 25px 0;">Orbit</h1>
      <input
        type="button"
        value="Create post"
        onClick={() => props.context.setPage("CREATE_POST")}
      />
      <div className="posts">
        {posts.length === 0 ? (
          <h1 style="text-align: center; padding: 70px 0;">no posts...</h1>
        ) : (
          posts.map((post) => (
            <div className="post">
              <article>
                <h3>{post.title}</h3>
                <p>From {post.author}.</p>
                {/* Only show 40 letters of the post */}
                <p>
                  {post.content.slice(0, 40)}
                  {post.content.length > 40 && "..."}
                </p>
                <p>{post.likesCount} likes.</p>
                <button
                  onClick={() => {
                    props.context.setData({
                      postId: post.id,
                    });
                    props.context.setPage("POST");
                  }}
                >
                  Open
                </button>
              </article>
            </div>
          ))
        )}
      </div>
    </main>
  );
}
