import React from 'react'
import Colors from '../Colors'


function Button({title , OnClick , ...props}) {
  return (
    <button className={`bg-${Colors.buttonColor}-500 p-2 rounded-lg w-full text-white hover:opacity-80`} onClick={OnClick} {...props}>
      {title}
    </button>
  )
}

export default Button
