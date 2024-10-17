import React, { useEffect, useRef } from 'react'
import { TfiMenuAlt } from "react-icons/tfi";
import Menu from './Menu';

function MenuComponent({isOpen , toggleMenu , userId , id}) {

  

  return (
    <div>
       <button
          onClick={() => toggleMenu(id)}
          className="w-10 h-10 absolute top-44 left-52 z-20 text-bold"
        >
          <TfiMenuAlt />
        </button>

        {isOpen && (
          <div  onClick={(e) => e.stopPropagation()}>
            <Menu className='z-20' creatorId={userId} toggleMenu={toggleMenu} />
          </div>
        )}
    </div>
  )
}

export default MenuComponent
