import React, { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Button,
  Card,
  Container,
  Grid,
  TextField,
  Typography,
  Stack,
  IconButton,
} from "@mui/material";
import CameraAltIcon from "@mui/icons-material/CameraAlt";

import Cloudinary from "../../cloudinary/Cloudinary";
import { useAppSelector, useAppDispatch } from "../../redux/app/store";
import {
  updateUserProfile,
  userProfile,
} from "../../redux/fetures/User/userSlice";
import { IUpdateUser } from "../../interfaces/UserInterface";
const UpdateProfile = () => {
  const { user } = useAppSelector((state) => state.auth);

  const [formData, setFormData] = useState<IUpdateUser>({
    username: user?.username ? user?.username : "",
    email: user?.email ? user?.email : "",
    bio: user?.bio ? user?.bio : "",
    image: user?.image ? user?.image : "",
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;
  const userId = user?._id as string;

  useEffect(() => {
    if (token) {
      dispatch(userProfile(token));
    }
  }, [dispatch, token]);

  useEffect(() => {
    if (user) {
      setFormData({
        username: user?.username as string,
        email: user?.email as string,
        bio: user?.bio as string,
        image: user?.image as string,
      });
    }
  }, [user]);

  // Handle change for all input fields
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      updateUserProfile({
        formData,
        token,
        toast,
      })
    );
  };

  return (
    <Container>
      <>
        <Box
          sx={{ mb: 5 }}
          component={"form"}
          noValidate
          onSubmit={handleSubmit}
        >
          <Grid container gap={4}>
            <Grid item>
              <Typography variant='h6'>Update Profile</Typography>
              <Box>
                <Grid container spacing={3}>
                  <Grid item sm={12}>
                    <img
                      src={formData?.image}
                      alt=''
                      style={{ width: "30%" }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button component='label' variant='outlined'>
                      {/* Upload image to cloudinary */}
                      <Cloudinary
                        setFormData={setFormData}
                        formData={formData}
                      />
                      <CameraAltIcon sx={{ mr: 1 }} /> Upload Photo
                    </Button>
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name='username'
                      onChange={handleChange}
                      value={formData?.username}
                      variant='outlined'
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      name='email'
                      onChange={handleChange}
                      value={formData?.email}
                      variant='outlined'
                    />
                  </Grid>

                  <Grid item xs={12}>
                    <TextField
                      fullWidth
                      label={!formData?.bio ? "Bio" : ""}
                      name='bio'
                      onChange={handleChange}
                      value={formData?.bio}
                      variant='outlined'
                    />
                  </Grid>
                </Grid>
              </Box>
            </Grid>
          </Grid>

          <Box component={"button"} sx={{ mt: 2 }}>
            <Cloudinary formData={formData} setFormData={setFormData} />
          </Box>
          <Button
            variant='contained'
            color='primary'
            sx={{ mt: 2 }}
            type='submit'
          >
            Update
          </Button>
        </Box>
      </>
    </Container>
  );
};

export default UpdateProfile;
