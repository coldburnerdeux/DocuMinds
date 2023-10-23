import React from "react"
import "../Styles/Components styles/CustomButton.css"
import Logo from '../Components/Images/SelectDrive.png'

export default function SelectDrive() {
    return (
        <div className="main-container">
          <img
            src={Logo}
            alt="Not Found"
          />
          <p>From Drive</p>
        </div>
    )
}