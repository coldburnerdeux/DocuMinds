import React, { useState } from "react";
import { useNavigate } from 'react-router-dom'
import '../Styles/Api.css'
import Logo from '../Components/Images/logo.png'

const Apikey = () => {

  const [apiKey, setApiKey] = useState("");

  const handleSubmit = async () => {
    const response = await fetch('http://localhost:8000/set-api-key', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({apiKey})
    });
    navigate('/home');
  };

  const handlePage = () => {
    window.open('https://platform.openai.com/account/api-keys');
  };

  const navigate = useNavigate();

  return (
    <div className="back-container">
      <div className="logo-container">
        <img src={Logo} alt="Not Found" />
      </div>
      <input
        placeholder="API KEY"
        className="api-input"
        value={apiKey}
        onChange={(e) => setApiKey(e.target.value)} 
      />
      <button className="api-button" type="submit" onClick={handleSubmit}>Submit</button>
      <div className="account-status">
        <p>
        You Don't You Have  an API key <button onClick={handlePage}>Get Key</button>
        </p>
      </div>
    </div>
  )
}

export default Apikey;