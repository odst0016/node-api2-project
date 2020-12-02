import "./App.css";
import axios from "axios";
import { useState, useEffect } from "react";

function App() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:4000/api/posts`)
      .then((res) => {
        setPosts(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log(posts);
  return (
    <div className="App">
      <div className="App-header">
        {posts.map((post) => (
          <div className="card">
            <h2>{post.title}</h2>
            <p>{post.contents}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
