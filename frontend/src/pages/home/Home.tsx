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
  Button,
  TextField,
} from "@mui/material";

// Material UI Icons
import { red } from "@mui/material/colors";
import ChatIcon from "@mui/icons-material/Chat";
import PublicIcon from "@mui/icons-material/Public";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteIcon from "@mui/icons-material/Favorite";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import {
  deletePost,
  getAllPosts,
  likePost,
  unlikePost,
} from "../../redux/fetures/Post/postSlice";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { formatDate } from "../../utils/Index";

export default function Home() {
  const { posts } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);

  const [comment, setComment] = useState("");
  const [show, setShow] = useState(false);

  const dispatch = useAppDispatch();
  const token = user?.token as string;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  const handleLike = async (id: string) => {
    dispatch(likePost({ postId: id, token }));
  };

  const handleUnlike = async (id: string) => {
    dispatch(unlikePost({ postId: id, token }));
  };

  return (
    <Container maxWidth='lg' sx={{ my: 10 }}>
      <Box>
        <Typography
          component='h1'
          variant='h2'
          align='center'
          color='text.primary'
          gutterBottom
        >
          Social Network <PublicIcon sx={{ fontSize: 40 }} />
        </Typography>
      </Box>
      <Grid container spacing={4}>
        {posts &&
          posts.map((post) => {
            const postId = post?._id;
            console.log(postId);

            return (
              <Grid item key={post?._id} xs={12} sm={6}>
                <Card>
                  {/* Navigate to my own profile or to the other user profile */}

                  <CardHeader
                    avatar={
                      <Link
                        to={
                          post?.postedBy?._id !== user?._id
                            ? `/profile/${post?.postedBy?._id}`
                            : "/profile"
                        }
                      >
                        <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                          {post?.postedBy?.image}
                        </Avatar>
                      </Link>
                    }
                    action={
                      post?.postedBy?._id === user?._id && (
                        <IconButton>
                          <DeleteForeverIcon
                            onClick={() =>
                              dispatch(deletePost({ postId, token, toast }))
                            }
                          />
                        </IconButton>
                      )
                    }
                    title={`by@ ${post?.postedBy?.username}`}
                    subheader={formatDate(post?.createdAt)}
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
                  {/* Comments */}
                  <CardActions disableSpacing>
                    {post?.comments?.length > 0 && (
                      <IconButton
                        aria-label='comments'
                        onClick={() => setShow(!show)}
                        sx={{ color: "white" }}
                      >
                        <ChatIcon />
                      </IconButton>
                    )}
                    {show &&
                      post?.comments?.map((comment) => (
                        <Typography
                          key={comment?._id}
                          variant='body2'
                          color='text.secondary'
                        >
                          {comment?.comment}
                        </Typography>
                      ))}
                  </CardActions>
                  {/* Add Comments */}
                  <CardActions disableSpacing>
                    <form
                      noValidate
                      autoComplete='off'
                      style={{ width: "100%" }}
                      className='comment-form'
                      id='comment-form'
                    >
                      <Stack direction='row' spacing={2}></Stack>
                      <TextField
                        id='standard-basic'
                        type='text'
                        label='Add Comment'
                        value={comment}
                        name='comment'
                        onChange={(e) => setComment(e.target.value)}
                        fullWidth
                        variant='standard'
                      />
                      <Button
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        sx={{ mt: 3, mb: 2 }}
                      >
                        Submit
                      </Button>
                    </form>
                  </CardActions>
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
