import * as React from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";

interface MainProps {
  post: string;
  description: string;
}

export default function Main(props: MainProps) {
  const { post, description } = props;

  return (
    <Grid
      item
      xs={12}
      md={8}
      sx={{
        "& .markdown": {
          py: 3,
        },
      }}
    >
      <Typography variant='h4' gutterBottom>
        {description}
      </Typography>
      <Divider />
      <Typography variant='h6' gutterBottom>
        {post}
      </Typography>
    </Grid>
  );
}
