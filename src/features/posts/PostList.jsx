import { useDispatch, useSelector } from "react-redux";
import { selectAllPosts } from "./postsSlice";
import { fetchPosts } from "./postsSlice";
import PostAuthor from "./PostAuthor";
import TimeAgo from "./TimeAgo";
import ReactionButtons from "./Reactions";
import { useEffect } from "react";
const PostList = () => {
  const dispatch = useDispatch()
  useEffect(()=>{
    dispatch(fetchPosts())
  },[])
  const posts = useSelector(selectAllPosts);
  const orderedPosts = posts
    .slice()
    .sort((a, b) => b.date.localeCompare(a.date));
  const renderedPosts = orderedPosts.map((post) => (
    <article key={post.id}>
      <h3>{post.body}</h3>
      <p>{post.desc.substring(0, 100)}</p>
      <PostAuthor userId={post.userId} />
      <TimeAgo timestamp={post.date} />
      <ReactionButtons post={post}/>
    </article>
  ));
  return (
    <section className='posts'>
      <h2>Posts</h2>
      {renderedPosts}
    </section>
  );
};

export default PostList;
