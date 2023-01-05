import React from 'react'
import {MdPictureAsPdf} from'react-icons/md'
import './EachFile.css'

const EachFile = ({name}) => {
  return (
    <div 
        draggable={true}
        className="uploaded-files-list">
        <div className="eachFile" > <MdPictureAsPdf/> {name} </div> 
    </div>
    
  )
}

export default EachFile