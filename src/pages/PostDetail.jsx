import { useMemo } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function PostDetail() {
  const { id } = useParams();
  const posts = useSelector((s) => s.posts.items);

  const post = useMemo(
    () => posts.find((p) => String(p.id) === String(id)),
    [posts, id]
  );

  return (
    <div>
      <h1>Post detail</h1>

      {!post ? (
        <p>
          Post not found (maybe you didn’t load posts yet). Go back to{" "}
          <Link to="/posts">Posts</Link>.
        </p>
      ) : (
        <>
          <h2>{post.title}</h2>
          <p>{post.body}</p>
          <p>
            <b>UserId:</b> {post.userId}
          </p>
          <Link to="/posts">Back</Link>
        </>
      )}
    </div>
  );
}

