import React from 'react'
import { useLocation } from 'react-router-dom'

function Analytics() {
    const location = useLocation();
    console.log(location.state);
  return (
    <div>
      
    </div>
  )
}

export default Analytics
