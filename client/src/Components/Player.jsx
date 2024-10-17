import axios from "axios";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import CommentForm from './CommentForm.jsx'

const VideoPlayer = () => {
  const [creatorDetails, setCreatorDetails] = useState();
  const [isSubcribed, setIsSubscribed] = useState(false);
  const loggedInUserId = useSelector((state) => state.auth.userDetails._id);

  // Get the state passed via the useLocation hook

  const location = useLocation();
  const { title, description, videoUrl, userId , videoId } = location.state || {};
  

  async function getData() {
    try {
      setCreatorDetails(userId);

      const subscribedData = await axios.post(
        "http://localhost:3000/subscribe/isSubscribed",
        {
          creatorId: userId._id,
        },
        { withCredentials: true }
      );
      if (subscribedData && subscribedData.data.msg === "Not Subscribed") {
        setIsSubscribed(false); // Not subscribed
      } else if (subscribedData) {
        setIsSubscribed(true); // Subscribed
      }
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // setError and show cant play video or server error
        console.log("error");
      }
    }
  }

  useEffect(() => {
    getData();
  }, []);

  console.log(creatorDetails)
  async function subscribeHandeler() {
    
    try {
      setCreatorDetails((currDetails) => {
        return {
          ...currDetails,
          numberOfSubscribers: currDetails.numberOfSubscribers + 1,
        };
      });
      const response = await axios.post(
        "http://localhost:3000/subscribe/subscribe",
        {
          userId: loggedInUserId,
          subscribedToId: creatorDetails._id,
        },
        { withCredentials: true }
      );
      setIsSubscribed(true);
     
    } catch (error) {
      if (error.response && error.response.status === 400) {
        // setError and show cant play video or server error
      }
    }
  }

  function unSubscribeHandeler() {
    // Handle unsubscribe event
    setIsSubscribed(false);
    
    setCreatorDetails((currDetails) => {
      return {
        ...currDetails,
        numberOfSubscribers: currDetails.numberOfSubscribers - 1,
      };
    });
    axios
      .post("http://localhost:3000/subscribe/unsubscribe", {
        subscriber: loggedInUserId,
        subscribedTo: creatorDetails._id,
      })
      .then((response) => {
        console.log(response.data.msg); // Log the success message
      })
      .catch((error) => {
        console.error(
          "Error during unsubscription:",
          error.response?.data || error.message
        );

        // Roll back the optimistic update if the API call fails
        setIsSubscribed(true);
      });
  }

  if (!creatorDetails) {
    return <div>Loading</div>;
  }

  return (
    <div className="container mx-auto p-1 z-0 ">
      {videoUrl ? (
        <div className="group w-10/12 h-96 ">
          {/* Video Player */}
          <div className=" top-20  left-10 right-0 bg-opacity-70 text-black text-lg font-bold px-4 py-2 opacity-0 group-hover:opacity-100 transition-opacity duration-1000">
            {title}
          </div>
          <video className="w-full h-full" controls src={videoUrl} autoPlay>
            Your browser does not support the video tag.
          </video> 

          {/* Title Overlay (on hover, positioned inside the video at the top) */}
          
        </div>
      ) : (
        <p className="text-red-500">No video data available</p>
      )}
      <div className="flex flex-row justify-between items-center w-10/12 mt-10 ">
        <div className="flex flex-row gap-3 items-center mt-3 mb-3">
          <div>
            {creatorDetails && (
              <img
                className="h-8 w-8 rounded-full"
                src={creatorDetails.profilePicture}
                alt="profile_picture"
              />
            )}
          </div>
          <div className="flex flex-col text-sm">
            <h4>{creatorDetails.fullName}</h4>
            <p>
              {!creatorDetails.numberOfSubscribers
                ? "No"
                : creatorDetails.numberOfSubscribers}{" "}
              Subcribers
            </p>
          </div>
        </div>
        <div>
          {creatorDetails._id !== loggedInUserId && (
            <button
              onClick={isSubcribed ? unSubscribeHandeler : subscribeHandeler}
              className="bg-blue-500 text-white font-bold py-2 px-4 rounded transition duration-300 ease-in-out transform hover:bg-slate-700 hover:scale-105"
            >
              {isSubcribed ? "Subscribed" : "Subscribe"}
            </button>
          )}
        </div>
      </div>
      <p className="text-lg mb-6 mt-5">{description}</p>
      {/* {creatorDetails._id !== loggedInUserId && <CommentForm videoId={videoId} userId={loggedInUserId}  />}
       */}
       <CommentForm videoId={videoId} userId={loggedInUserId} />
       
    </div>
  );
};

export default VideoPlayer;
