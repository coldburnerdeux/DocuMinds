import React from "react"
import "../Styles/Components styles/CustomButton.css"
import Logo from '../Components/Images/SelectFolder.png'

export default function SelectFolder() {
    return (
        <div className="main-container">
          <img
            src={Logo}
            alt="Not Found"
          />
          <p>Select Folder</p>
        </div>
    )
}