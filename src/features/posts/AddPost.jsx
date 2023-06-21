import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { addNewPost } from "./postsSlice";
import { selectAllUsers } from "../users/usersSlice";
const AddPost = () => {
  const { register, handleSubmit, reset } = useForm();
  const users = useSelector(selectAllUsers);
  const dispatch = useDispatch();
  const addPostsHandler = ({ title, body, userID }) => {
    const userId = Number(userID);
    if (title && body && userId !== -1) {
      dispatch(
        addNewPost({
          title,
          body,
          userId,
        })
      );
      reset();
    }
  };
  return (
    <section className="add-post">
      <h2>Add post</h2>
      <form className="addPost-form" onSubmit={handleSubmit(addPostsHandler)}>
        <label htmlFor="post-title">Post Title</label>
        <input type="text" name="" id="" {...register("title")} />
        <label htmlFor="post-desc">Post Description</label>
        <input type="text" name="" id="" {...register("body")} />
        <label htmlFor="post-user">User</label>
        <select name="" id="post-user" {...register("userID")}>
          <option value="-1">select User</option>
          {users.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name}
            </option>
          ))}
        </select>

        <button className="submit">Add Post</button>
      </form>
    </section>
  );
};

export default AddPost;
