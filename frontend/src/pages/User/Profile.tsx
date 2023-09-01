import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Box,
  CircularProgress,
  Container,
  Input,
  InputLabel,
} from "@mui/material";
import Navbar from "../../components/Navbar/Header";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import ChatBubbleIcon from "@mui/icons-material/ChatBubble";
import Dialog from "@mui/material/Dialog";
import Card from "@mui/material/Card";
import { FormControl } from "@mui/material";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";

function Profile() {
  const { id } = useParams();
  const [userData, setUserdata] = useState(null);
  const [posts, setPosts] = useState([]);
  const [open, setOpen] = useState(null);

  const handleClickOpen = (id: any) => {
    setOpen(id);
  };

  const handleClose = () => {
    setOpen(null);
  };
  // useEffect(()=>{
  //     database.users.doc(id).onSnapshot((snap)=>{
  //         setUserdata(snap.data())
  //     })
  // },[id])

  // useEffect(async()=>{
  //     if(userData!=null){
  //     let parr = [];
  //     for(let i=0;i<userData?.postIds?.length;i++){
  //         let postData = await database.posts.doc(userData.postIds[i]).get()
  //         parr.push({...postData.data(),postId:postData.id})
  //     }
  //     setPosts(parr)
  // }
  // },[userData])

  return (
    <Container maxWidth='md'>
      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          margin: "18px 0px",
          borderBottom: "1px solid grey",
          width: "75%",
        }}
      >
        <Box>
          <Avatar
            alt='Remy Sharp'
            src='/static/images/avatar/1.jpg'
            style={{
              width: "160px",
              height: "160px",
              borderRadius: "80px",
              marginBottom: "10px",
            }}
          />
        </Box>
        <Box
          sx={{
            flexGrow: 1,
            display: "flex",
            justifyContent: "space-around",
            alignItems: "center",
            margin: "3rem",
          }}
        >
          <h4>Name</h4>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <h6>
              {/* {user?.posts?.length}{" "}
              {user?.posts?.length === 1 ? "post" : "posts"} */}
            </h6>

            <h6> followers</h6>
            <h6> following</h6>
          </div>
        </Box>
        <div className='gallery'>
          {/* {user?.posts?.length === 0 && (
          <h2 style={{ textAlign: "center" }}>No posts yet</h2>
        )} */}
          {/* {user?.posts &&
          user?.posts.map((item) => {
            return (
              <img
                className='item'
                src={item.image}
                alt={item.title}
                key={item._id}
              />
            );
          })} */}
        </div>
      </Box>
    </Container>
  );
}

export default Profile;
