import { useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/context.jsx";

const CommentSection = ({ postId }) => {
  const [comment, setComment] = useState("");
  const { user } = useContext(AuthContext);

  const addComment = async () => {
    await API.post(`/posts/${postId}/comment`,
      { content: comment },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    setComment("");
  };

  const addAdminReply = async () => {
    await API.post(`/posts/${postId}/admin-reply`,
      { content: comment },
      { headers: { Authorization: `Bearer ${user.token}` } }
    );
    setComment("");
  };

  return (
    <div>
      <input
        placeholder="Add comment"
        value={comment}
        onChange={(e)=>setComment(e.target.value)}
      />
      <button onClick={addComment}>Comment</button>

      {user?.role === "admin" && (
        <button onClick={addAdminReply}>
          Admin Reply
        </button>
      )}
    </div>
  );
};

export default CommentSection;
