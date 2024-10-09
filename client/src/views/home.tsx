import axios from "axios";
import { Dispatch, StateUpdater, useEffect, useState } from "preact/hooks";

interface Post {
  id: number;
  author: string;
  title: string;
  content: string;
  likesCount: number;
  liked: boolean;
}

export function Home(props: { token: string, setView: Dispatch<StateUpdater<string>> }) {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("/api/posts/newest", {
          headers: {
            Authorization: props.token,
          },
        });

        setPosts(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchPosts();
  }, [props.token]);

  const likePost = async (postId: number) => {
    try {
      await axios.post(
        `/api/posts/${postId}/like`,
        {},
        {
          headers: {
            Authorization: props.token,
          },
        },
      );

      setPosts(
        posts.map((post) => {
          return post.id === postId
            ? {
                ...post,
                likesCount: post.liked
                  ? post.likesCount - 1
                  : post.likesCount + 1,
                liked: !post.liked,
              }
            : post;
        }),
      );
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style="width: 75%; margin-right: auto; margin-left: auto; text-align: center;">
      <header>
        <h1 style="color: #00B478; padding: 20px;">orbit</h1>
      </header>
      <main>
        <section className="posts">
          <button style="margin-bottom: 20px; width: 100%;" onClick={() => props.setView("POST")}>Create post</button>
          {posts.length > 0 ? (
            posts.map((post) => (
              <article key={post.id} className="post">
                <header>
                  <h3>{post.author}</h3>
                </header>
                <body>
                  <details>
                    <summary style="font-size: 20px; padding: 50px; line-height: 30px;">
                      {post.title}
                    </summary>
                    <p>{post.content}</p>
                  </details>
                </body>
                <footer>
                  <button
                    className={post.liked ? "primary" : "secondary"}
                    onClick={() => likePost(post.id)}
                  >
                    <i class="bx bxs-like"></i>
                  </button>
                </footer>
              </article>
            ))
          ) : (
            <p>No posts available.</p>
          )}
        </section>
      </main>
    </div>
  );
}
