import { useEffect, useState, useContext } from "react";
import API from "../api";
import { AuthContext } from "../context/context.jsx";
import CreatePost from "../components/post.jsx";
import PostCard from "../components/postCard.jsx";
const Home = () => {
  const [posts, setPosts] = useState([]);
  const { logout } = useContext(AuthContext);

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const { data } = await API.get("/p");
    console.log("FULL RESPONSE:", data);
    setPosts(data);
  };

  return (
    <div>
      <button onClick={logout} >Logout</button>

      <CreatePost refresh={fetchPosts} />

      {posts.length === 0 ? (
        <p></p>
      ) : (
        posts.map((p) => (
          <PostCard key={p._id} post={p} />
        ))
      )}
    </div>
  );
};

export default Home;
