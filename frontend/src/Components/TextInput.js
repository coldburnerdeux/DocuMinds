import React from "react"
import "../Styles/Components styles/TextInput.css"
import SendIcon from '../Components/Images/SendIcon.png'

export default function TextInput() {
  return (
    <div className="Main-container">
      <input placeholder="Enter Your Prompt "></input>
      <img
        src={SendIcon}
        alt="Not Found"
      />
    </div>
  )
}
