import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

// Material UI
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Grid,
  Box,
  Typography,
  Container,
  CardHeader,
  Avatar,
  IconButton,
  Stack,
} from "@mui/material";

// Material UI Icons
import { red } from "@mui/material/colors";
import ChatIcon from "@mui/icons-material/Chat";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import { getAllPosts } from "../../redux/fetures/Post/postSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

export default function Home() {
  const { posts } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);
  console.log(posts);

  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();
  const token = user?.token;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  return (
    <Container maxWidth='lg'>
      <Box>
        <Typography
          component='h1'
          variant='h2'
          align='center'
          color='text.primary'
          gutterBottom
          sx={{ fontFamily: "monospace", color: "blue" }}
        >
          Social Network
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {posts &&
          posts?.map((post) => (
            <Grid
              item
              key={post?._id}
              xs={12}
              sm={6}
              md={7}
              sx={{
                m: "0 auto",
              }}
            >
              <Card>
                <CardHeader
                  avatar={
                    <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                      {post?.postedBy?.image}
                    </Avatar>
                  }
                  action={
                    <IconButton>
                      <MoreVertIcon />
                    </IconButton>
                  }
                  title={post?.postedBy?.username}
                  subheader='September 14, 2016'
                />

                <CardMedia
                  component='img'
                  height='194'
                  image={post?.image}
                  alt={post?.title}
                />
                <CardContent>
                  <Typography variant='body2' color='text.secondary'>
                    {post?.description}
                  </Typography>
                </CardContent>
                <Stack
                  direction='row'
                  justifyContent='space-between'
                  alignItems='center'
                  spacing={4}
                >
                  <CardActions disableSpacing>
                    <IconButton aria-label='add to favorites'>
                      <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label='share'>
                      <ChatIcon />
                    </IconButton>
                  </CardActions>
                  <CardActions disableSpacing>
                    <IconButton aria-label='Save'>
                      <BookmarkBorderIcon />
                    </IconButton>
                  </CardActions>
                </Stack>
              </Card>
            </Grid>
          ))}
      </Grid>
    </Container>
  );
}
