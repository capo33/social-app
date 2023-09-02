import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
// Material Ui
import {
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
  Card,
  Button,
  CardContent,
  Divider,
} from "@mui/material";

// Material Icon
 
import {
   userProfileById,
} from "../../redux/fetures/User/userSlice";
import { getAllPosts } from "../../redux/fetures/Post/postSlice";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";

function UserProfile() {
  const { id } = useParams<{ id: string }>();

  const { guest } = useAppSelector((state) => state.user);
  console.log(guest?.user);

  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

  useEffect(() => {
    dispatch(userProfileById(id as string));
  }, [dispatch, id]);

  return (
    <Container sx={{ my: 10 }}>
      <CardContent
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <Avatar
            src={guest?.user?.image}
            alt={guest?.user?.username}
            sx={{
              width: "160px",
              height: "160px",
              borderRadius: "80px",
              mr: 3,
            }}
          />
          <div>
            <Typography variant='h5'>{guest?.user?.username}</Typography>
            <Typography variant='body1'>@{guest?.user?.username}</Typography>

            {/* Follow & UnFollow */}
            <Link to='/update-profile'>
              <Button variant='contained' color='info'></Button>
              <Button variant='contained' color='info'></Button>
            </Link>
          </div>
        </Box>
        <Typography variant='body2' sx={{ mb: 1 }}>
          {guest?.user?.bio ? `Bio: ${guest?.user?.bio}` : "No Bio"}
        </Typography>
        <Typography
          variant='h6'
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <span>
            <strong>{guest?.posts?.length}</strong>
            {guest?.posts?.length === 1 ? " post" : " posts "}
          </span>
          <span style={{ marginLeft: "20px" }}>
            <strong>{guest?.user?.followers?.length}</strong> followers
          </span>
          <span style={{ marginLeft: "20px" }}>
            <strong>{guest?.user?.following?.length}</strong> following
          </span>
        </Typography>

        <Divider style={{ margin: "20px 0", color: "black" }} />

        <Typography variant='h6'>Posts</Typography>

        <Divider style={{ margin: "20px 0", color: "black" }} />

        {guest?.posts?.length === 0 && (
          <h2 style={{ textAlign: "center" }}>No posts yet</h2>
        )}

        <Grid container spacing={2}>
          {guest?.posts &&
            guest?.posts?.map((post) => (
              <Grid item xs={12} sm={6} md={4} key={post._id}>
                <Card>
                  <img
                    src={post.image}
                    alt={`Post ${post._id}`}
                    style={{ width: "100%", height: "auto" }}
                  />
                  <CardContent>
                    <Typography variant='body2'>{post.title}</Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
        </Grid>
      </CardContent>
    </Container>
  );
}

export default UserProfile;
