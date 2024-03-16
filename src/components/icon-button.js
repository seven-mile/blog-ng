import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const IconButton = ({ icon, link, width, height }) => (
  <a href={link} target="_blank" rel="noopener noreferrer">
    <div className="icon-button-border">
      <div className="icon-button">
        <FontAwesomeIcon icon={icon} width={width} height={height} size="lg" />
      </div>
    </div>
  </a>
)

export default IconButton
