import React, { useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom'
import '../Styles/Login.css'
import Logo from '../Components/Images/logo.png'

const Signup = () => {
  const navigate = useNavigate();

  const handleSignIn = () => {
    navigate('/');
  };
  // const handleSubmit = () => {
  //   navigate('/api');
  // };

  const SignUp = () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in 
        const user = userCredential.user;
        console.log(user);
        // addDoc(empCollectionRef, {
        //   email: email
        // });
        navigate('/', { replace: true });
        Swal.fire({
          title: "Success!",
          text: "You Successfully Created an Account",
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
        {/* <input
          type="name"
          placeholder="Name"
          className="input"
        /> */}
        <input
          type={email}
          placeholder="Email"
          className="input"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type={password}
          placeholder="Password"
          className="input"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button className="button" type="submit" onClick={SignUp}>Register</button>
        <div className="account-status">
          <p>
            Allready have an account? <button onClick={handleSignIn}>Sign In</button>
          </p>
        </div>
      </div>
    </div>
  )
}

export default Signup