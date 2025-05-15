import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={1192}
    height={176}
    viewBox="0 0 1192 176"
    backgroundColor="#f3f3f3"
    foregroundColor="#ecebeb"
    {...props}
  >
    <rect x="16" y="16" rx="0" ry="0" width="96" height="96" /> 
    <rect x="124" y="16" rx="0" ry="0" width="122" height="21" /> 
    <rect x="124" y="55" rx="0" ry="0" width="255" height="21" /> 
    <rect x="123" y="91" rx="0" ry="0" width="83" height="21" /> 
    <rect x="227" y="92" rx="0" ry="0" width="88" height="21" /> 
    <rect x="475" y="16" rx="0" ry="0" width="108" height="29" /> 
    <rect x="475" y="92" rx="0" ry="0" width="108" height="29" />
  </ContentLoader>
)

export default MyLoader