import React from "react"
import "../Styles/Components styles/CustomButton.css"
import Logo from '../Components/Images/SelectPDF.png'

export default function SelectPDF() {
    return (
        <div className="main-container">
          <img
            src={Logo}
            alt="Not Found"
          />
          <p>Select PDFs</p>
        </div>
    )
}