import React from "react"
import ContentLoader from "react-content-loader"

const MyLoader = (props) => (
  <ContentLoader 
    speed={2}
    width={96}
    height={125}
    viewBox="0 0 96 125"
    backgroundColor="card"
    foregroundColor="card"
    {...props}
  >
    <rect x="303" y="683" rx="8" ry="8" width="387" height="28" /> 
    <rect x="0" y="0" rx="100" ry="100" width="96" height="96" /> 
    <rect x="1" y="106" rx="0" ry="0" width="105" height="21" />
  </ContentLoader>
)

export default MyLoader
