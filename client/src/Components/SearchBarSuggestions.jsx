import React from 'react'
import { createPortal } from 'react-dom'

function SearchBarSuggestions({suggestions , OnClose , onSubmit}) {
  return createPortal(
    <>
          <div className="fixed top-0  left-0 w-screen h-screen z-10" onClick={OnClose} />

 
    <dialog open>
    <ul className="w-96 fixed top-20 mx-auto right-96 left-96 mt-2 z-50 bg-white  border rounded-md shadow-lg">
    {suggestions.map((suggestion, index) => (
        <li key={index} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={(e) => onSubmit(e,suggestion.title)}>
        {suggestion.title}
      </li>
    ))}
  </ul> 
  </dialog>
    </>
  , document.getElementById('modal'))
}

export default SearchBarSuggestions
