import axios from "axios";
import React, { useState } from "react";
import { useSelector } from "react-redux";

function CommentsList({ fetchedComment }) {
    const userDetails = useSelector(state => state.auth.userDetails)

    const [comment , setComment] = useState(fetchedComment)
  const [viewReplies, setViewReplies] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [replyText, setReplyText] = useState();

  const handleReplySubmit = async (e, commentId) => {
    e.preventDefault();

    setLoading(true);

    try {
      const response = await axios.post(
        `http://localhost:3000/comment/addReply/${commentId}`,
        {
          content: replyText, // Get the reply text for this specific comment
        },
        { withCredentials: true }
      );

      
      setComment((prevComment) =>{
        return{
            ...prevComment,
            replies : [...prevComment.replies , {content : replyText , userId : userDetails } ]
        }
      }
        
      );
      // Clear the specific reply text for this comment
      setReplyText("");
      setError("");
    } catch (err) {
      console.error("Error adding reply:", err);
      setError("Error adding reply");
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <div key={comment._id} className="mb-4 border-b pb-4">
        <p className="text-sm text-gray-500 font-bold">
          {comment.userId.fullName}
        </p>
        <p>{comment.content}</p>

        {/* Replies */}
        {viewReplies &&
          comment.replies.length > 0 &&
          comment.replies.map((reply, index) => {
            return (
              <div key={reply._id || index} className="ml-10">
               
                <p className="text-sm text-gray-500 font-bold">{reply.userId.fullName}</p>
                <p>{reply.content}</p>
              </div>
            );
          })}

        {/* Reply form */}
        {viewReplies && (
              <form
                onSubmit={(e) => handleReplySubmit(e, comment._id)}
                className="mt-2"
              >
                <textarea
                  
                  value={replyText}
                  onChange={(e) =>
                   
                    setReplyText(e.target.value)
                  }
                  placeholder="Add a reply..."
                  className="w-full p-2 border rounded"
                ></textarea>
                <button
                  type="submit"
                  className="bg-green-500 text-white p-2 rounded mt-2"
                    disabled={loading}
                >
                  {loading ? "Replying..." : "Post Reply"}
                </button>
              </form>)}

        {comment.replies && comment.replies.length === 0 ? (
          <button onClick={() => setViewReplies(true)}>Reply</button>
        ) : null}

        {comment.replies && comment.replies.length > 0 && (
          <button onClick={() => setViewReplies((curr) => !curr)}>
            {viewReplies ? "Hide replies" : "View Replies"}
          </button>
        )}
      </div>
    </div>
  );
}

export default CommentsList;
