import React from "react"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

const IconButton = ({ icon, link, width, height, size, alt }) => (
  <div className="icon-button" style={{ width, height }}>
    <a className="icon-button-link" href={link} target="_blank" rel="noopener noreferrer" aria-label={alt}>
      <FontAwesomeIcon icon={icon} size={size} />
    </a>
  </div>
)

export default IconButton
