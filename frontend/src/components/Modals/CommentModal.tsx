import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { IPost } from "../../interfaces/PostInterface";
import { IconButton } from "@mui/material";
import DeleteForeverIcon from "@mui/icons-material/Delete";

const style = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

type CommentModalProps = {
  post: IPost;
  handleDeleteComment: (postId: string, commentId: string) => void;
};

export default function CommentModal({
  post,
  handleDeleteComment,
}: CommentModalProps) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <div>
      {/* Comments Modal if there is more then two comments */}
      {post?.comments.length > 2 && (
        <>
          <Button 
          onClick={handleOpen} 
          sx={{ ml: 2 }}
           color="warning"
          
          >
            View all {post?.comments.length} comments...
          </Button>
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
                    variant='h6'
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
