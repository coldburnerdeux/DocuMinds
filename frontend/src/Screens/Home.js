import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from 'react-router-dom'

// import { FileUploader } from "react-drag-drop-files";
// import '../Styles/Components styles/Uploader.css'
import '../Styles/Components styles/DropFileInput.css';
import DropFileInput from "../Components/DropFileInput";

import '../Styles/Home.css'
import '../Styles/Chat.css'
import '../Styles/Components styles/CustomButton.css'
import "../Styles/Components styles/HistoryButton.css"
import "../Styles/Components styles/TextInput.css"

import LogoDrive from '../Components/Images/SelectDrive.png'
import LogoFolder from '../Components/Images/SelectFolder.png'
import LogoFile from '../Components/Images/SelectPDF.png'
import LogoHistory from '../Components/Images/History.png'
import SendIcon from '../Components/Images/SendIcon.png'

import Backdrop from '@mui/material/Backdrop';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};


const Home = () => {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [file, setFile] = useState(null);
  const handleChange = (file) => {
    setFile(file);
  };

  const onFileChange = (files) => {
    console.log(files);
  }

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([{ role: "assistant", content: "Hello! How can I assist you today ? 🙂" }]);
  const [isTyping, setIsTyping] = useState(false);

  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        msgs.push(data.output);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const chatContainerRef = useRef(null);  // Create a ref for the chat container

  useEffect(() => {
    // Scroll the chat container to the bottom whenever the chats array changes
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [chats]);

  const navigate = useNavigate();
  const handlesubmit = () => {
      navigate('/chat');
    };
  return (
    <>
      <Modal
        open={open}
        onClose={handleClose}
        closeAfterTransition
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 500,
          },
        }}
      >
        <Fade in={open}>
          <Box sx={style} align={'center'} borderRadius={'20px'} border={'none'} borderColor={'transparent'}>
            {/* <Typography id="transition-modal-title" variant="h6" component="h2">
              Text in a modal
            </Typography>
            <Typography id="transition-modal-description" sx={{ mt: 2 }}>
              Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
            </Typography> */}

            {/* <div className="App">
              <FileUploader
                multiple={true}
                handleChange={handleChange}
                name="file"
                types={fileTypes}
              />
              <p>{file ? `File name: ${file[0].name}` : "no files uploaded yet"}</p>
            </div> */}

            <div className="box">
              <DropFileInput
                onFileChange={(files) => onFileChange(files)}
              />
            </div>

            <button style={{
              cursor: 'pointer',
              backgroundColor: '#5C8374',
              padding: "2%",
              fontSize: '24px',
              borderRadius: '50px',
              width: '150px',
              color: '#fff',
              border: 'none'
            }} onClick={handlesubmit}>Submit</button>
          </Box>
        </Fade>
      </Modal>

      <div>
        <div className='select-container'>
          <div className="main-container" onClick={handleOpen}>
          <img
              src={LogoFile}
              alt="Not Found"
            />
            <p>Select PDFs</p>
          </div >
          <div className="main-container" onClick={handleOpen}>
            <img
              src={LogoFolder}
              alt="Not Found"
            />
            <p>Select Folder</p>
          </div>
          <div className="main-container" onClick={handleOpen}>
            <img
              src={LogoDrive}
              alt="Not Found"
            />
            <p>From Drive</p>
          </div>
        </div>
        <div className='history-button'>
          <div className="button-container">
            <button style={{ border: 'none', borderRadius: '10%', backgroundColor: '#fff' }}>
              <div className="item-container">
                <p className="history">History</p>
                <img
                  src={LogoHistory}
                  alt="Not Found"
                  className="group"
                />
              </div>
            </button>
          </div>
        </div>
        <div className="chat-container" style={{scrollbarWidth: 'none', msOverflowStyle: 'none'}} ref={chatContainerRef}>
            {chats && chats.length
              ? chats.map((chat, index) => (
                <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                  {/* <span>
                  <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span> */}
                  <span>{chat.content}</span>
                </p>
              ))
              : ""}

            <div className={isTyping ? "" : "hide"}>
              <p>
                <i>{isTyping ? "Typing" : ""}</i>
              </p>
            </div>

          <div className="Main-container">
            <form action="" onSubmit={(e) => chat(e, message)}>
              <input
                value={message}
                placeholder="Enter our prompt and hit enter"
                onChange={(e) => setMessage(e.target.value)}
              />
              <img
              src={SendIcon}
              alt="Not Found"
              onClick={(e) => chat(e, message)}
            />
            </form>
          </div>
        </div>
        {/* <div>
          <div className="Main-container">
            <input placeholder="Enter Your Prompt "></input>
            <img
              src={SendIcon}
              alt="Not Found"
            />
          </div>
        </div> */}
        {/* <Button className='submit' onClick={handleSignIn} variant="contained">Done</Button> */}
      </div>
    </>
  )
}

export default Home