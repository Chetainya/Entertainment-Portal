import React from 'react'
import { Link } from 'react-router-dom'
import Colors from '../Colors'
import {motion} from 'framer-motion'

function CustomLink({children, title , NavigateTo , ...props }) {
  return (
    <motion.div whileHover={{scale : 1.2}}>

    <Link className={`bg-${Colors.buttonColor}-500  text-white p-2 rounded-lg hover:opacity-80`} to={NavigateTo} {...props}>
        {title || children}
    </Link>
    </motion.div>
  )
}

export default CustomLink
