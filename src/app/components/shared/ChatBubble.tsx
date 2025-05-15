import React from 'react'

const ChatBubble = ({text, className}) => {
  return (
    
    <div className={`bubble ${className}` } >
      {text}
    </div>
  )
}

export default ChatBubble