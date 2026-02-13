import { useContext } from "react";
import API from "../api.jsx";
import { AuthContext } from "../context/context.jsx";
import CommentSection from "./CommentSection";

const PostCard = ({ post, refresh }) => {
  const { user } = useContext(AuthContext);

  const handleDelete = async () => {
    try {
      if (!user?.token) {
        alert("Login required");
        return;
      }

      await API.delete(`/p/${post._id}`, {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      });

      refresh(); 
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div
      style={{
        border: "1px solid #ccc",
        padding: "15px",
        margin: "10px 0",
        borderRadius: "8px",
      }}
    >
  
      <h4 style={{ marginBottom: "5px" }}>
        {post.author?.name || "Unknown User"}
      </h4>

      
      <small style={{ color: "gray" }}>
        {new Date(post.createdAt).toLocaleString()}
      </small>

      
      <p style={{ marginTop: "10px" }}>{post.content}</p>

    
      {user?._id === post.author?._id && (
        <button
          onClick={handleDelete}
          style={{
            marginTop: "10px",
            backgroundColor: "red",
            color: "white",
            border: "none",
            padding: "5px 10px",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Delete
        </button>
      )}

    
      <CommentSection postId={post._id} />
    </div>
  );
};

export default PostCard;
