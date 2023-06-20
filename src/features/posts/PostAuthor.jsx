import { useSelector } from "react-redux";
import { selectAllUsers } from "../users/usersSlice";
selectAllUsers

const PostAuthor = ({userId}) => {
    const users = useSelector(selectAllUsers)
    const author = users.find(user=>user.id === userId)
  return (
    <span>By {author ? author.name : 'unknown author'}</span>
  )
}

export default PostAuthor