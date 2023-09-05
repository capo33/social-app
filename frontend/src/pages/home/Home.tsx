import { useEffect } from "react";
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
import PublicIcon from "@mui/icons-material/Public";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeleteForeverIcon from "@mui/icons-material/DeleteForever";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
<<<<<<< HEAD
import BookmarkIcon from "@mui/icons-material/Bookmark";
=======

>>>>>>> 0098bee24d3f0aedadf8e626edd42bfbe57a4104
import {
  commentPost,
  deleteCommentPost,
  deletePost,
  getAllPosts,
<<<<<<< HEAD
  getSavedPosts,
  likePost,
  savePost,
  unlikePost,
  unsavePost,
} from "../../redux/fetures/Post/postSlice";
import { formatDate } from "../../utils/Index";
import { CommentInput } from "../../components/Index";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";

export default function Home() {
  const { posts, savedPosts } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);
  const { user: me } = useAppSelector((state) => state.user);

  const dispatch = useAppDispatch();

  const token = user?.token as string;
  const postIds = savedPosts?.map((post) => post._id);

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch, me, token]);

  useEffect(() => {
    dispatch(getSavedPosts({ userId: me?._id as string, token }));
  }, [dispatch, me, token]);
=======
  likePost,
  unlikePost,
} from "../../redux/fetures/Post/postSlice";
import { formatDate } from "../../utils/Index";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import { CommentInput } from "../../components/Index";
 
export default function Home() {
  const { posts } = useAppSelector((state) => state.posts);
  const { user } = useAppSelector((state) => state.auth);

  const dispatch = useAppDispatch();
  const token = user?.token as string;

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

>>>>>>> 0098bee24d3f0aedadf8e626edd42bfbe57a4104
  // Like post
  const handleLike = async (id: string) => {
    dispatch(likePost({ postId: id, token }));
  };

  // Unlike post
  const handleUnlike = async (id: string) => {
    dispatch(unlikePost({ postId: id, token }));
  };

  // Comment post
  const handleComment = (comment: string, id: string) => {
    dispatch(commentPost({ comment, postId: id, token }));
  };

  // Delete comment
  const handleDeleteComment = (postId: string, commentId: string) => {
    dispatch(deleteCommentPost({ postId, commentId, token }));
  };

<<<<<<< HEAD
  // Save Recipe
  const handleSaveRecipe = (postId: string) => {
    dispatch(
      savePost({
        postId,
        userId: me?._id as string,
        token,
      })
    );
  };

  // Unsave Recipe
  const handleUnsaveRecipe = (postId: string) => {
    dispatch(
      unsavePost({
        postId,
        userId: me?._id as string,
        token,
      })
    );
  };

=======
>>>>>>> 0098bee24d3f0aedadf8e626edd42bfbe57a4104
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

                  {/* Image */}
<<<<<<< HEAD
                  <Link to={`/${post?.title}/${post?._id}`}>
                    <CardMedia
                      component='img'
                      height='194'
                      image={post?.image}
                      alt={post?.title}
                    />
                  </Link>
=======
                  <CardMedia
                    component='img'
                    height='194'
                    image={post?.image}
                    alt={post?.title}
                  />
>>>>>>> 0098bee24d3f0aedadf8e626edd42bfbe57a4104
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
                    </CardActions>
                    <CardActions disableSpacing>
<<<<<<< HEAD
                      {/* {postIds?.includes(post?._id!) ? ( */}
                      {postIds?.includes(post?._id as any) ? (
                        <IconButton
                          onClick={() => handleUnsaveRecipe(post?._id!)}
                        >
                          <BookmarkIcon sx={{ color: "black" }} />
                        </IconButton>
                      ) : (
                        <IconButton
                          onClick={() => handleSaveRecipe(post?._id!)}
                        >
                          <BookmarkBorderIcon sx={{ color: "black" }} />
                        </IconButton>
                      )}
=======
                      <IconButton aria-label='Save'>
                        <BookmarkBorderIcon />
                      </IconButton>
>>>>>>> 0098bee24d3f0aedadf8e626edd42bfbe57a4104
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
                  <CommentInput
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
