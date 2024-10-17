import axios from "axios";
import React, { useEffect, useState } from "react";
import ListItem from "./ListItem";
import { motion } from "framer-motion";

function Home() {
  const [videos, setVideos] = useState([]);
  const [openMenuId, setOpenMenuId] = useState(null); // State to track which menu is open

  const toggleMenu = (id) => {
    setOpenMenuId(openMenuId === id ? null : id); // Toggle the menu
  };

  useEffect(() => {
    async function getVideos() {
      const videosResponse = await axios.get("http://localhost:3000/home", {
        withCredentials: true,
      });
      console.log(videosResponse.data);
      // Update state with fetched data
      setVideos(videosResponse.data.videos);
    }
    getVideos();
  }, []);

  return (
    <div>
      <div>
        {videos.length > 0 ? (
          <motion.ul
            variants={{
              hidden: { opacity: 0 },
              show: { opacity: 1, transition: { staggerChildren: 0.1 } },
            }}
            initial="hidden"
            animate="show"
            className="list-disc pl-6"
          >
            {videos.map((video) => (
              <ListItem
              key={video._id}
                id={video._id}
                title={video.title}
                url={video.url}
                userId={video.user}
                thumbnail={video.thumbnail}
                uploadedDate={video.uplaodedAt}
                fullName={video.fullName}
                isOpen={openMenuId === video._id}
                toggleMenu={() => toggleMenu(video._id)}
              />
            ))}
          </motion.ul>
        ) : (
          <p>No videos to Show</p>
        )}
      </div>
    </div>
  );
}

export default Home;
