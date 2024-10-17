// import axios from "axios";
// import React, { useState } from "react";

// function Comments({ fetchedComments }) {
//     console.log(fetchedComments)
//   const [replyText, setReplyText] = useState("");
//   const [comments, setComments] = useState(fetchedComments);
//   const [viewReplies, setViewReplies] = useState(false);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   // Handle reply submission
//   const handleReplySubmit = async (e, commentId) => {
//     e.preventDefault();

//     setLoading(true);

//     try {
//       const response = await axios.post(
//         `http://localhost:3000/comment/addReply/${commentId}`,
        
//         {
//           content: replyText,
//         },
//         { withCredentials: true },
//       );

//       setComments((prevComments) =>
//         prevComments.map((comment) =>
//           comment._id === commentId
//             ? { ...comment, replies: [...comment.replies, response.data] }
//             : comment
//         )
//       );
//       //   setReplyText({ ...replyText, [commentId]: "" });
//       setReplyText("");
//       setError("");
//     } catch (err) {
//       console.error("Error adding reply:", err);
//       setError("Error adding reply");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div>
//       {comments.length > 0 &&
//         comments.map((comment) => (
//           <div key={comment._id} className="mb-4 border-b pb-4">
//             <p className="text-sm text-gray-500 font-bold">
//               {comment.userId.fullName}
//             </p>
//             <p>{comment.content}</p>

//             {/* Replies */}
//             {viewReplies && comment.replies && comment.replies.length > 0 && (
//               <div className="pl-4 mt-2">
//                 <h4 className="text-gray-600">Replies:</h4>
//                 {comment.replies.map((reply, index) => (
//                   <div key={index} className="mb-2">
//                     <p>{reply.content}</p>
//                     <p className="text-sm text-gray-500">By: {reply.userId}</p>
//                   </div>
//                 ))}
//               </div>
//             )}

//             {/* Reply form */}
//             {viewReplies && (
//               <form
//                 onSubmit={(e) => handleReplySubmit(e, comment._id)}
//                 className="mt-2"
//               >
//                 <textarea
//                   //   value={replyText[comment._id] || ""}
//                   value={replyText}
//                   onChange={(e) =>
//                     // setReplyText({ ...replyText, [comment._id]: e.target.value })
//                     setReplyText(e.target.value)
//                   }
//                   placeholder="Add a reply..."
//                   className="w-full p-2 border rounded"
//                 ></textarea>
//                 <button
//                   type="submit"
//                   className="bg-green-500 text-white p-2 rounded mt-2"
//                   //   disabled={loading}
//                 >
//                   {loading ? "Replying..." : "Post Reply"}
//                 </button>
//               </form>
//             )}
//             {comment.replies.length === 0 && (
//               <button onClick={() => setViewReplies(true)}>
//                 {!viewReplies && "Reply"}
//               </button>
//             )}
//             {comment.replies.length > 0 && (
//               <button onClick={() => setViewReplies((curr) => !curr)}>
//                 {viewReplies ? "Hide replies" : "View Replies"}
//               </button>
//             )}
//           </div>
//         ))}
//     </div>
//   );
// }

// export default Comments;



import React  from "react";
import CommentsList from "./CommentsList";

function Comments({ fetchedComments }) {
  
  
  

  // Handle reply submission
  
  console.log(fetchedComments)

  return (
    <div>
      {fetchedComments.length > 0 &&
        fetchedComments.map((comment , index) => (
          <CommentsList key={comment._id || index} fetchedComment={comment} />
        ))}
    </div>
  );
}

export default Comments;
