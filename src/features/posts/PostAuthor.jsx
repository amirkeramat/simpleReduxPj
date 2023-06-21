import { useSelector, useDispatch } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
import { fetchUsers } from "../users/usersSlice";
import { useEffect } from "react";
selectAllUsers;

const PostAuthor = ({ userId }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchUsers());
  }, []);
  const users = useSelector(selectAllUsers);
  const author = users.find((user) => user.id === userId);
  return <span>By {author ? author.name : "unknown author"}</span>;
};

export default PostAuthor;
