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

const cards = [1, 2, 3, 4, 5, 6, 7, 8, 9];

export default function Home() {
  return (
    <>
      <main>
        {/* Hero unit */}
        <Box
          sx={{
            pt: 8,
            pb: 6,
          }}
        >
          <Container maxWidth='sm'>
            <Typography
              component='h1'
              variant='h2'
              align='center'
              color='text.primary'
              gutterBottom
            >
              Social Media App
            </Typography>
            <Typography
              variant='h5'
              align='center'
              color='text.secondary'
              paragraph
            >
              Something short and leading about the collection below—its
              contents, the creator, etc. Make it short and sweet, but not too
              short so folks don&apos;t simply skip over it entirely.
            </Typography>
          </Container>
        </Box>
        <Container sx={{ py: 8 }} maxWidth='md'>
          {/* End hero unit */}
          <Grid container spacing={4}>
            {cards.map((card) => (
              <Grid item key={card} xs={12} sm={6} md={6}>
                <Card sx={{ maxWidth: 345 }}>
                  <CardHeader
                    avatar={
                      <Avatar sx={{ bgcolor: red[500] }} aria-label='recipe'>
                        R
                      </Avatar>
                    }
                    action={
                      <IconButton>
                        <MoreVertIcon />
                      </IconButton>
                    }
                    title='Shrimp and Chorizo Paella'
                    subheader='September 14, 2016'
                  />

                  <CardMedia
                    component='img'
                    height='194'
                    image='https://source.unsplash.com/random?wallpapers'
                    alt='Paella dish'
                  />
                  <CardContent>
                    <Typography variant='body2' color='text.secondary'>
                      This impressive
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
      </main>
      {/* Footer */}

      {/* End footer */}
    </>
  );
}
