import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={368}
    height={391}
    viewBox="0 0 368 391"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="0" y="0" rx="12" ry="12" width="368" height="288" /> 
    <rect x="16" y="301" rx="0" ry="0" width="100" height="21" /> 
    <rect x="16" y="347" rx="0" ry="0" width="100" height="21" /> 
    <rect x="271" y="348" rx="0" ry="0" width="90" height="21" />
  </ContentLoader>
)

export default MyLoader