import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

import MenuComponent from "./MenuComponent";

function ListItem({
  id,
  title,
  description,
  url,
  userId,
  thumbnail,
  uploadedDate,
  series,
  fullName,
  seriesName,
  isOpen,
  toggleMenu,
}) {
  let type = "video";
  if (seriesName) {
    type = "series";
  } else if (fullName) {
    type = "user";
  }

  return (
    <motion.li
      variants={{
        hidden: { opacity: 0 },
        show: { opacity: 1 },
      }}
      key={id}
      className="relative z-9  shadow-md min-h-64 max-w-2xl w-64 min-w-60 rounded-md mb-4 flex flex-col transition-transform duration-300"
    >
      <Link
        to={{
          pathname: `/${type}/${id}`,
        }}
        state={{
          title,
          description,
          videoUrl: url,
          userId,
          thumbnail,
          uploadedDate,
          series,
          videoId: id,
        }}
        className="text-blue-500"
      >
        <img
          src={thumbnail || userId.profilePicture}
          className={`w-full h-36 ${type === 'user' || 'series' ? 'rounded-3xl' : ''} `}
          alt="Thumbnail"
        />
        <div className="p-2 text-black">
          {type === 'video' ? <p>{title}</p> : <p>{description}</p>}
          <div className="flex flex-col gap-2 justify-between text-xs">
            <div className="flex flex-row gap-2 mt-1 items-center justify-between">
              <div className="flex flex-row gap-2 items-center">
                <img
                  src={userId.profilePicture}
                  className="w-5 h-5 rounded-full"
                  alt="profile_picture"
                />
                <p>{userId.fullName}</p>
              </div>
            </div>
            {type === 'video' && <div className="flex flex-row justify-between">
              <p>Views for future</p>
            </div>}
          </div>
        </div>
      </Link>

      <MenuComponent
      
        isOpen={isOpen}
        toggleMenu={toggleMenu}
        userId={userId}
        id={id}
      />
    </motion.li>
  );
}

export default ListItem;
