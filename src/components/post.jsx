import { useState, useContext } from "react";
import API from "../api.jsx";
import { AuthContext } from "../context/context.jsx";

const CreatePost = ({ refresh }) => {
  const { user } = useContext(AuthContext);
  const [content, setContent] = useState("");

  const handleCreate = async () => {
    try {
      if (!content.trim()) return;

      await API.post(
        "/p",
        { content },
        {
          headers: {
            Authorization: `Bearer ${user?.token}`,
          },
        }
      );

      setContent("");
      refresh();   // 👈 Home se fetchPosts call hoga
    } catch (error) {
      console.log(error.response?.data || error.message);
    }
  };

  return (
    <div style={{ width: "500px", margin: "auto" }}>
      <h2>Create Post</h2>

      <textarea
        placeholder="Write something..."
        value={content}
        onChange={(e) => setContent(e.target.value)}
        style={{ width: "100%", padding: "10px" }}
      />

      <button
        onClick={handleCreate}
        style={{ marginTop: "10px", padding: "8px 15px" }}
      >
        Post
      </button>

      <hr />
    </div>
  );
};

export default CreatePost;
