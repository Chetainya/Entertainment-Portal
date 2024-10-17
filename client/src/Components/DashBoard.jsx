import React, { useEffect, useState } from "react";
import axios from "axios";
import {  useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import ListItem from "./ListItem";
import CustomLink from './CustomLink'
import {motion} from 'framer-motion'
const Dashboard = () => {
  const userDetails = useSelector((state) => state.auth.userDetails);
  const [videos, setVideos] = useState([]);
  const [series, setSeries] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();
  const [openMenuId, setOpenMenuId] = useState(null); // State to track which menu is open

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Fetch user's uploaded videos
        const videosResponse = await axios.get(
          "http://localhost:3000/upload/videos",
          {
            withCredentials: true,
          }
        );

        // Update state with fetched data
        setVideos(videosResponse.data);

        const seriesResponse = await axios.get('http://localhost:3000/series/get' , {
          withCredentials : true
        })
        setSeries(seriesResponse.data);
        console.log(seriesResponse.data)

      } catch (error) {
        if (error.response && error.response.status === 400) {
          // Token expired or user not logged in
          setErrorMessage("Session expired. Please log in again.");
          navigate("/login"); // Redirect to login
        } else {
          setErrorMessage("An error occurred while fetching data.");
        }
      }
    };

    fetchUserData();
  }, [navigate]);

  const toggleMenu = (id) => {
    console.log(openMenuId , id)
    setOpenMenuId((currOpenMenuId) => currOpenMenuId === id ? null : id); // Toggle the menu
  };

  if (errorMessage) {
    return <p className="text-red-500">{errorMessage}</p>;
  }

  if (!userDetails) {
    return <p>Loading...</p>;
  }

  return (
    <div className=" p-2">
      
      <div className="flex  justify-between  px-4">
  <div className="relative z-1 left-1/2 transform -translate-x-1/2 text-center">
  <h5 className="text-2xl">Studio with Analytics</h5>
  </div>
  <div className="ml-auto">
    
  <CustomLink NavigateTo="/upload">Upload a new Video</CustomLink>
  </div>
</div>


      {/* User Details */}
      
      {/* User's Uploaded Videos */}
      <div>
        <h3 className="text-xl z-9 font-semibold mb-4">Uploaded Videos</h3>
        {videos.length > 0 ? (
          <motion.ul variants={
            {
              hidden : {opacity : 0},
              show : {opacity : 1 , transition : { staggerChildren : 0.05 }}
            }
            
          }
          initial='hidden'
          animate='show' 
          className="list-disc pl-6 flex gap-10 flex-row flex-wrap mt-20 z-10 relative">
            {videos.map((video) => (
              
              <ListItem key={video._id} id={video._id} title={video.title} description={video.description} thumbnail={video.thumbnail} url={video.url} userId={video.userId} uploadedDate={video.uploadedAt} series={video.series} isOpen={openMenuId === video._id} 
              toggleMenu={() => toggleMenu(video._id)} />
            ))}
          </motion.ul>
        ) : (
          <p>No videos uploaded yet.</p>
        )}
      </div>
      <h3 className="text-xl font-semibold mb-4">Series</h3>
      <div>
        {series.length === 0 && <p className="">No series created yet</p>}
        <ul>
        </ul>
        {series && series.length > 0 && 
        series.map((series) => {
          return <ListItem key={series.id} seriesName={series.seriesName} description={series.description} thumbnail={series.thumbnail} userId={series.userId} />
        })
        }
        
      </div>
    </div>
  );
};

export default Dashboard;
