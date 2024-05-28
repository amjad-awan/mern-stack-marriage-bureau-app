import React from 'react'
import { Button } from 'reactstrap'

import "./style.css"
import { LuRefreshCw } from 'react-icons/lu'

const ClearButton = ({cleareFilter, bColor, textColor}) => {
  return (
    <Button onClick={cleareFilter} className="__clear-btn" style={{borderColor:bColor, color:textColor}}  ><LuRefreshCw /></Button>

  )
}

export default ClearButton