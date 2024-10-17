// import React from 'react'
// import { useSelector } from 'react-redux'

// function Menu({creatorId}) {
//   const loggedInUser = useSelector(state => state.auth.userDetails)
//   console.log(loggedInUser)
  
//   return (
//     <div className="absolute right-0 left-40 top-10 mt-2 w-48 bg-white rounded-md shadow-lg z-5000">
//           <ul className="py-1 text-gray-700">
//             <li className="hover:bg-gray-100 cursor-pointer px-4 py-2">{creatorId._id === loggedInUser._id ? "Add to Series" : "Option 1"}</li>
//             <li className="hover:bg-gray-100 cursor-pointer px-4 py-2">Option 2</li>
//             <li className="hover:bg-gray-100 cursor-pointer px-4 py-2">Option 3</li>
//           </ul>
//         </div>
//   )
// }

// export default Menu

console.log(document.getElementById('modal'))

import React from 'react';
// import { createPortal } from 'react-dom';
import { useSelector } from 'react-redux';

function Menu({ creatorId , toggleMenu }) {
  const loggedInUser = useSelector(state => state.auth.userDetails);

  return (<>
    <div className="fixed top-0 left-0 w-screen h-screen" onClick={toggleMenu} />
    <dialog open>

    <div className="absolute z-20 bottom-12 border-4 mt-2 w-48 bg-white rounded-md ">
      <ul className="py-1 text-gray-700">
        {/* Check if the logged-in user is the creator of the video */}
        <li onClick={toggleMenu} className="hover:bg-gray-100 cursor-pointer px-4 py-2">
          {creatorId._id === loggedInUser._id ? "Add to Series" : "Option 1"}
        </li>
        <li onClick={toggleMenu} className="hover:bg-gray-100 cursor-pointer px-4 py-2">Option 2</li>
        <li onClick={toggleMenu} className="hover:bg-gray-100 cursor-pointer px-4 py-2">Option 3</li>
      </ul>
    </div>
    </dialog>
    </>
  )
}

export default Menu;
