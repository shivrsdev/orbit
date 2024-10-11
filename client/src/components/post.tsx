// /src/components/post.tsx
// Post component

import { useEffect, useState } from "preact/hooks";
import { Post as PostModel } from "../models/post";
import { Context } from "../context";
import axios from "axios";
import { Reply } from "../models/reply";

export function Post(props: { context: Context }) {
  const [post, setPost] = useState<PostModel>();
  const [replies, setReplies] = useState<Reply[]>([]);
  const [replyContent, setReplyContent] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      const response = await axios.get(
        `/api/posts/${props.context.data.postId}`,
        {
          headers: {
            Authorization: props.context.token,
          },
        }
      );
      setPost(response.data);
    };

    const fetchReplies = async () => {
      const response = await axios.get(
        `/api/posts/${props.context.data.postId}/replies/newest`,
        {
          headers: {
            Authorization: props.context.token,
          },
        }
      );
      setReplies(response.data);
    };

    fetchPost();
    fetchReplies();
  }, [props.context.token]);

  const like = async () => {
    await axios.post(
      `/api/posts/${post?.id}/like`,
      {},
      {
        headers: {
          Authorization: props.context.token,
        },
      }
    );

    const newPost: PostModel = {
      id: post!.id,
      author: post!.author,
      authorId: post!.authorId,
      title: post!.title,
      content: post!.content,
      likesCount: post?.liked ? post?.likesCount - 1 : post!.likesCount + 1,
      liked: !post?.liked,
    };

    setPost(newPost);
  };

  const reply = async () => {
    await axios.post(`/api/posts/${post?.id}/replies`, {
      content: replyContent
    }, {
      headers: {
        Authorization: props.context.token
      }
    });

    setReplyContent("");
  }

  return (
    <main className="container">
      <div style="width: 75%; margin-right: auto; margin-left: auto; text-align: center; padding: 70px 0;">
        <h1 style="text-align: center; padding: 25px 0;">Orbit</h1>
        {post ? (
          <div>
            <input
              type="button"
              value="Return"
              onClick={() => props.context.setPage("HOME")}
            />
            <article>
              <h3>{post?.title}</h3>
              <p>{post?.author}</p>
              <p>{post?.content}</p>
              <button
                className={post.liked ? "primary" : "secondary"}
                onClick={like}
              >
                {post.likesCount}
                <i class="bx bxs-like" />
              </button>
            </article>
            <div className="replies">
              <article>
                {replies.length === 0 ? (
                  <h3>Be the first to reply!</h3>
                ) : (
                  replies.map((reply) => (
                    <div className="reply">
                      <h4>{reply.author} - {reply.content}</h4>
                    </div>
                  ))
                )}
                <form action="">
                  <fieldset role="group">
                    <input
                      type="text"
                      name="content"
                      placeholder="What's on your mind?"
                      onChange={event => setReplyContent(event.currentTarget.value)}
                      value={replyContent}
                    />
                    <input type="button" value="Reply" onClick={reply} />
                  </fieldset>
                </form>
              </article>
            </div>
          </div>
        ) : (
          <h1>Loading...</h1>
        )}
      </div>
    </main>
  );
}
