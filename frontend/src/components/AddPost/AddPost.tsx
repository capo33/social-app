import React, { useState } from "react";
import {
  TextField,
  Button,
  Container,
  Stack,
  Typography,
  Box,
} from "@mui/material";
import { toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

import { IPostCreate } from "../../interfaces/PostInterface";
import { useAppDispatch, useAppSelector } from "../../redux/app/store";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import axios from "axios";
import { createPost } from "../../redux/fetures/Post/postSlice";

const AddPost = () => {
  const { user } = useAppSelector((state) => state.auth);
  const [formData, setFormData] = useState<IPostCreate>({
    title: "",
    description: "",
    image: "",
    tags: [],
  });

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const token = user?.token as string;

  const uploadImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.currentTarget.files?.[0];
    if (!file) return;
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", process.env.REACT_APP_PRESET_NAME as string);
    const response = await axios.post(
      `https://api.cloudinary.com/v1_1/${process.env.REACT_APP_CLOUD_NAME}/upload`,
      data
    );
    setFormData({ ...formData, image: response.data.url });
  };

  const handleSubmit = async (e: React.FocusEvent<HTMLFormElement>) => {
    e.preventDefault();

    dispatch(
      createPost({
        formData,
        token,
        toast,
      })
    );
    navigate("/");
    setFormData({
      title: "",
      description: "",
      image: "",
      tags: [],
    });
  };

  // Delete image from cloudinary
  const deleteImage = () => {
    setFormData({ ...formData, image: "" });
  };

  return (
    <Container maxWidth='sm' sx={{ marginTop: 10 }}>
      <Typography variant='h4' color='#01579B'>
        Add Post
      </Typography>
      <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
        <Stack spacing={2} direction='row' sx={{ marginBottom: 4 }}>
          <TextField
            type='text'
            variant='outlined'
            color='success'
            label='Title'
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            value={formData.title}
            fullWidth
            required
          />
        </Stack>
        <TextField
          type='text'
          variant='outlined'
          color='secondary'
          label='Description'
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          rows={4}
          multiline
          value={formData.description}
          fullWidth
          required
          sx={{ mb: 4 }}
        />
        <TextField
          type='text'
          variant='outlined'
          color='secondary'
          label='Tags'
          onChange={(e) =>
            setFormData({ ...formData, tags: e.target.value.split(",") })
          }
          value={formData.tags}
          fullWidth
          required
          sx={{ mb: 4 }}
        />

        <Stack>
          <Button variant='outlined' component='label'>
            <IconButton
              aria-label='upload picture'
              component='label'
              size='small'
            >
              <input
                hidden
                accept='image/*'
                type='file'
                onChange={uploadImage}
              />
              <PhotoCamera />
              Upload
            </IconButton>
          </Button>
        </Stack>
        <Button component='label' onClick={deleteImage}>
          Delete Image
        </Button>
        {formData.image && (
          <img
            src={formData.image}
            alt={formData.title}
            style={{
              width: "50%",
              height: "50%",
              objectFit: "cover",
              margin: "5px auto",
              display: "block",
            }}
          />
        )}
        <Button
          type='submit'
          fullWidth
          variant='contained'
          color='info'
          sx={{ mt: 3, mb: 2 }}
        >
          Add Post
        </Button>
      </Box>
    </Container>
  );
};

export default AddPost;
