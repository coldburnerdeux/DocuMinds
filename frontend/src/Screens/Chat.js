import React, { useState, useEffect, useRef } from "react";

import '../Styles/Home.css'
import '../Styles/Chat.css'
import "../Styles/Components styles/TextInput.css"

import SendIcon from '../Components/Images/SendIcon.png'
import TimeLogo from '../Components/Images/Timelogo.png'

import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import CssBaseline from '@mui/material/CssBaseline';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import ForumIcon from '@mui/icons-material/Forum';
import CancelIcon from '@mui/icons-material/Cancel';
import ChatIcon from '@mui/icons-material/Chat';

import Button from '@mui/material/Button';
import AddIcon from '@mui/icons-material/Add';

const drawerWidth = 300;

const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    flexGrow: 1,
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginRight: -drawerWidth,
    ...(open && {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginRight: 0,
    }),
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: 'flex-end',
}));

export default function Chat() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

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

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <IconButton
          style={{ position: 'absolute', top: '2%', right: '2%' }}
          aria-label="open drawer"
          edge="end"
          onClick={handleDrawerOpen}
          sx={{ ...(open && { display: 'none' }) }}
        >
          <ForumIcon fontSize="large" sx={{ color: '#000' }} />
        </IconButton>
        <Main open={open}>
          <div className="final-chat-container" style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }} ref={chatContainerRef}>
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

            <div className="final-Main-container">
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
        </Main>
        <Drawer
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            '& .MuiDrawer-paper': {
              width: drawerWidth,
              color: '#000',
              backgroundColor: '#EBFFF8',
            },
          }}
          variant="persistent"
          anchor="right"
          open={open}
        >
          <DrawerHeader>
            <IconButton onClick={handleDrawerClose}>
              <CancelIcon sx={{ color: '#000' }} />
            </IconButton>
          </DrawerHeader>
          <List>
            {/* {['Inbox', 'Starred', 'Send email', 'Drafts'].map((text, index) => (
              <ListItem key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon>
                    {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                  </ListItemIcon>
                  <ListItemText primary={text} />
                </ListItemButton>
              </ListItem>
            ))} */}
            <Button variant="outlined" startIcon={<AddIcon/>} sx={{ color: '#000', backgroundColor: '#fff', borderColor: '#000', marginLeft: '15%', width: '70%', fontSize:'20px' }} onClick={handleDrawerClose}>
              New Chat
            </Button>
          </List>
          <Divider />
          <List>
            <div className="historybadge-container">
              <img
                src={TimeLogo}
                alt="Not Found"
              />
              <p>History</p>
            </div>
            {['Chat 1', 'Chat 2', 'Chat 3'].map((text) => (
              <ListItem sx={{marginLeft:'10%'}} key={text} disablePadding>
                <ListItemButton>
                  <ListItemIcon >
                    {<ChatIcon fontSize="large" sx={{ color: '#000' }} />}
                  </ListItemIcon>
                  <ListItemText>
        <Typography variant="h6">{text}</Typography> 
      </ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Drawer>
      </Box>
    </>
  );
}