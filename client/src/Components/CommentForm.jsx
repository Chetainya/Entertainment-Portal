import React, { useState, useEffect } from "react";
import axios from "axios";
import Comments from "./Comments";
import { useSelector } from "react-redux";

function CommentForm({ videoId, userId }) {
  
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState("");
  
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const userData = useSelector(state => state.auth.userDetails)

  // Fetch comments when the component loads
  useEffect(() => {
    const fetchComments = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/comment/${videoId}`);
        setComments(response.data);
      } catch (err) {
        console.error("Error fetching comments:", err);
      }
    };

    fetchComments();
  }, [videoId]);

  // Handle new comment submission
  const handleNewCommentSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) {
      setError("Comment cannot be empty");
      return;
    }

    setLoading(true);
    console.log(userId , videoId , newComment)

    try {
      const response = await axios.post("http://localhost:3000/comment/addComment", {
        videoId,
        userId,
        content: newComment,
      });
      console.log(response)
      setComments((prevComments) => [{content : newComment , userId : userData, replies : [] , _id:response.data._id},...prevComments]);
      setNewComment("");
      setError("");
      
    } catch (err) {
      console.error("Error adding comment:", err);
      setError("Error adding comment");
    } finally {
      setLoading(false);
    }
  };

 

  return (
    <div className="comment-section">
      <h3>Comments</h3>

      {/* Comment form */}
      <form onSubmit={handleNewCommentSubmit} className="mb-4 flex items-center">
        <div className="w-2/3">
        <input
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Add a comment..."
          rows={1}
          className="w-2/3 p-2 border rounded"
        ></input>
        {error && <p className="text-red-500">{error}</p>}
        </div>
        <button
          type="submit"
          className="bg-blue-500 h-full text-white p-2 rounded mt-2"
          disabled={loading}
        >
          {loading ? "Posting..." : "Post Comment"}
        </button>
      </form>

      {/* Comment list */}
      {comments.length > 0 ? <Comments fetchedComments={comments} /> : <div>No Comments</div>}
    </div>
  );
}

export default CommentForm;
