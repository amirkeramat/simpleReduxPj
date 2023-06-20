import { useDispatch } from "react-redux";
import { addReaction } from "./PostsSlice";
const reactionEmojis = {
  thumbsUp: "👍",
  wow: "😮",
  heart: "❤️",
  rocket: "🚀",
  coffee: "☕️",
};
const ReactionButtons = ({ post }) => {
  const dispatch = useDispatch();
  const reactionButtons = Object.entries(reactionEmojis).map(
    ([name, emoji]) => {
      return (
        <button
          key={name}
          type='button'
          onClick={() => {
            dispatch(addReaction({ postId: post.id, reaction: name }));
          }}>
          {emoji} {post.reactions[name]}
        </button>
      );
    }
  );
  return <div className="reaction-btn">{reactionButtons}</div>;
};

export default ReactionButtons;
