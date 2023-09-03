import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { Link } from "react-router-dom";

import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import Divider from "@mui/material/Divider";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import DirectionsIcon from "@mui/icons-material/Directions";
import SendIcon from "@mui/icons-material/Send";
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
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";

import {
  commentPost,
  deleteCommentPost,
  deletePost,
  getAllPosts,
  likePost,
  unlikePost,
} from "../../redux/fetures/Post/postSlice";
import { formatDate, subStringFunc } from "../../utils/Index";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { IPost } from "../../interfaces/PostInterface";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Modal from "@mui/material/Modal";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

function BasicModal({ post, handleDeleteComment }: any) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Comments Modal if there is more then two comments */}
      {post?.comments.length > 2 && (
        <>
          <Button onClick={handleOpen}>View comments</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              {post.comments.map((comment: any) => (
                <Box
                  key={comment._id}
                  sx={{
                    p: "5px 4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ ml: 2 }}
                  >
                    <span style={{ fontWeight: "bolder" }}>
                      {comment?.postedBy?.username}{" "}
                    </span>
                    {comment.comment}
                  </Typography>
                  <IconButton
                    aria-label='delete'
                    onClick={() => handleDeleteComment(post._id, comment._id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Modal>
        </>
      )}
    </div>
  );
}
type PostProps = {
  post: IPost;
  handleComment: (comment: string, id: string) => void;
  handleDeleteComment: (postId: string, commentId: string) => void;
  show: boolean;
  toggleComment: () => void;
};

function Post({
  post,
  handleComment,
  handleDeleteComment,
  show,
  toggleComment,
}: PostProps) {
  const [inputValue, setInputValue] = useState<string>("");
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  return (
    <Box>
      <Box sx={{ display: "flex", justifyContent: "space-between" }}>
        <TextField
          sx={{ ml: 2, width: "100%" }}
          variant='standard'
          placeholder='Add a comment...'
          inputProps={{ "aria-label": "Add a comment..." }}
          value={inputValue}
          onChange={handleChange}
        />
        <IconButton
          type='button'
          sx={{ p: "10px" }}
          aria-label='search'
          onClick={() => {
            handleComment(inputValue, post._id);
            setInputValue("");
          }}
        >
          <SendIcon />
        </IconButton>
      </Box>

      {/* Comments Modal if there is more then two comments */}
      {/* {post?.comments.length > 2 && (
        <>
          <Button onClick={handleOpen}>View comments</Button>
          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby='modal-modal-title'
            aria-describedby='modal-modal-description'
          >
            <Box sx={style}>
              {post.comments.map((comment: any) => (
                <Box
                  key={comment._id}
                  sx={{
                    p: "5px 4px",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    width: "100%",
                  }}
                >
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ ml: 2 }}
                  >
                    <span style={{ fontWeight: "bolder" }}>
                      {comment?.postedBy?.username}{" "}
                    </span>
                    {comment.comment}
                  </Typography>
                  <IconButton
                    aria-label='delete'
                    onClick={() => handleDeleteComment(post._id, comment._id)}
                  >
                    <DeleteForeverIcon />
                  </IconButton>
                </Box>
              ))}
            </Box>
          </Modal>
        </>
      )} */}

      <BasicModal post={post} handleDeleteComment={handleDeleteComment} />

      {/* Show cooments */}
      {show && (
        <>
          {post.comments.map((comment: any) => (
            <Box
              key={comment._id}
              sx={{
                p: "2px 4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant='body2' color='text.secondary' sx={{ ml: 2 }}>
                <span style={{ fontWeight: "bolder" }}>
                  {comment?.postedBy?.username}{" "}
                </span>
                {comment.comment}
              </Typography>
              <IconButton
                aria-label='delete'
                onClick={() => handleDeleteComment(post._id, comment._id)}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          ))}
        </>
      )}

      {/* Show first two comments */}
      {post?.comments.length > 0 && !show && (
        <>
          {post.comments.slice(0, 2).map((comment: any) => (
            <Box
              key={comment._id}
              sx={{
                p: "2px 4px",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                width: "100%",
              }}
            >
              <Typography variant='body2' color='text.secondary' sx={{ ml: 2 }}>
                <span style={{ fontWeight: "bolder" }}>
                  {comment?.postedBy?.username}{" "}
                </span>
                {comment.comment}
              </Typography>
              <IconButton
                aria-label='delete'
                onClick={() => handleDeleteComment(post._id, comment._id)}
              >
                <DeleteForeverIcon />
              </IconButton>
            </Box>
          ))}
        </>
      )}
    </Box>
  );
}

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

  const handleComment = (comment: string, id: string) => {
    dispatch(commentPost({ comment, postId: id, token }));
    setComment("");
  };

  const handleDeleteComment = (postId: string, commentId: string) => {
    dispatch(deleteCommentPost({ postId, commentId, token }));
    console.log("postId", postId, "commentId", commentId);
    console.log("token", token);
  };

  //  Show and hide comments
  const toggleComment = () => {
    if (show) {
      setShow(false);
    } else {
      setShow(true);
    }
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
                        <IconButton
                          onClick={() =>
                            dispatch(deletePost({ postId, token, toast }))
                          }
                        >
                          <DeleteForeverIcon />
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
                    {/* Like & Unlike */}
                    <CardActions disableSpacing>
                      {post?.likes?.includes(user?._id!) ? (
                        <IconButton
                          aria-label='unlike'
                          onClick={() => handleUnlike(post?._id!)}
                        >
                          <FavoriteIcon sx={{ color: "red" }} />
                        </IconButton>
                      ) : (
                        <IconButton
                          aria-label='like'
                          onClick={() => handleLike(post?._id!)}
                        >
                          <FavoriteBorderIcon />
                        </IconButton>
                      )}

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
                  <Typography
                    variant='body2'
                    color='text.secondary'
                    sx={{ ml: 2 }}
                  >
                    {post?.likes?.length}{" "}
                    {post?.likes?.length > 1 ? "likes" : "like"}
                  </Typography>

                  {/* Add Comments */}
                  <Post
                    show={show}
                    toggleComment={toggleComment}
                    post={post}
                    handleComment={handleComment}
                    handleDeleteComment={handleDeleteComment}
                  />
                </Card>
              </Grid>
            );
          })}
      </Grid>
    </Container>
  );
}
