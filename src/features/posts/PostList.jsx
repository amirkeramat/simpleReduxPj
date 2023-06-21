import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts, selectLoading } from "./postsSlice";
import { fetchPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./Reactions";
import { useEffect } from "react";
const PostList = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchPosts());
  }, []);
  const posts = useSelector(selectAllPosts);
  const loading = useSelector(selectLoading);
  const orderedPosts =
    !loading &&
    posts.length &&
    posts.slice().sort((a, b) => b.date.localeCompare(a.date));
  const renderedPosts =
    !loading &&
    orderedPosts.length &&
    orderedPosts.map((post) => (
      <article key={post.id}>
        <h3>{post.title}</h3>
        <p>{post.body.substring(0, 100)}</p>
        <PostAuthor userId={post.userId} />
        <TimeAgo timestamp={post.date} />
        <ReactionButtons post={post} />
      </article>
    ));
  return (
    <section className="posts">
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostList;
