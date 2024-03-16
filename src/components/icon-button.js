import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const IconButton = ({ icon, link, width, height, alt }) => (
  <a href={link} target="_blank" rel="noopener noreferrer" aria-label={alt}>
    <div className="icon-button">
      <FontAwesomeIcon width={width} height={height} icon={icon} size="lg" />
    </div>
  </a>
)

export default IconButton
