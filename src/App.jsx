import React, { useState } from "react";
import "./App.css";
import axios from "axios";
const App = () => {
  const [postData, setPostData] = useState(null);
  const [allData, setAllData] = useState([]);
  const [isError, setIsError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [postId, setPostId] = useState("");
  
  const fetchAllData = () => {
    setIsLoading(true);
    setIsError("");
    axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        setAllData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(error.message);
        setIsLoading(false);
      });
  };
  const fetchSpecificData = () => {
    setIsLoading(true);
    setIsError("");
    axios
      .get(`https://jsonplaceholder.typicode.com/posts/${postId}`)
      .then((response) => {
        setPostData(response.data);
        setIsLoading(false);
      })
      .catch((error) => {
        setIsError(error.message);
        setIsLoading(false);
      });
  };
  return (
    <>
      <h1>Showing API's Data with Axios</h1>
      {isError && <h2>{isError}</h2>}
      <input className="main-input"
        type="text"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
        placeholder="Enter post ID"
      /> <br></br> <br></br> 
      <button  className="buttons" onClick={fetchSpecificData} disabled={isLoading} >
        {isLoading ? "Loading Specific Data..." : "Fetch Specific Data"}
      </button> 
      <button className="buttons" onClick={fetchAllData} disabled={isLoading}>
        {isLoading ? "Loading All Data..." : "Fetch All Data"}
      </button>
      {postData && (
        <div className="card">
          <h2>{postData.title}</h2>
          <p>{postData.body}</p>
        </div>
      )}
      {allData.length > 0 && (
        <div className="grid">
          {allData.slice(0, 9).map((post) => {
            const { body, id, title } = post;
            return (
              <div key={id} className="card">
                <h2>{title.slice(0, 15).toUpperCase()}</h2>
                <p>{body.slice(0, 100)}</p>
              </div>
            );
          })}
        </div>
      )}
    </>
  );
};
export default App;


