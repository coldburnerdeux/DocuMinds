import React from "react"
import Logo from '../Components/Images/History.png'
import "../Styles/Components styles/HistoryButton.css"

export default function History() {
    return (
        <div className="button-container">
            <button style={{ border: 'none', borderRadius: '10%', backgroundColor:'#fff'}}>
                <div className="item-container">
                    <p className="history">History</p>
                    <img
                        src={Logo}
                        alt="Not Found"
                        className="group"
                    />
                </div>
            </button>
        </div>
    )
}
