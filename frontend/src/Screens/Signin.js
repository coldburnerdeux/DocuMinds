import React, { useEffect, useState } from 'react'
import app from '../Config'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { useNavigate } from 'react-router-dom'
import Swal from 'sweetalert2'
import '../Styles/Login.css'
import Logo from '../Components/Images/logo.png'

const Signin = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/signup');
  };

  // const handleSubmit = () => {
  //   navigate('/api');
  // };

  const auth = getAuth(app);

  const SignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        navigate('/api', { replace: true });
        Swal.fire({
          title: "Success!",
          text: "You Successfully Logged In",
          icon: "success",
          button: "Ok!",
        });
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        Swal.fire({
          title: "Error!",
          text: "Try Again",
          icon: "error",
          button: "Ok!",
        });
      });
  }

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")

  return (
    <div className="login-container">
      <div className="left-side">
        <h2>Enter the</h2>
        <h1>ChatVerse</h1>
        <p>Your Personal Chat Assistant</p>
      </div>
      <div className="right-side">
        <div className="logo-container">
          <img
            src={Logo}
            alt="Not Found" />
        </div>
        <input
          type={"email"}
          placeholder="Email"
          className="input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={"password"}
          placeholder="Password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" type="submit" onClick={SignIn}>Sign In</button>
        <div className="account-status">
          <p>
            Don't have an account? <button onClick={handleSignIn}>Sign Up</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signin