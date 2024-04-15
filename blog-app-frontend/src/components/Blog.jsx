import {
  Button,
  Card,
  CardContent,
  Container,
  Divider,
  Grid,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import CommentIcon from "@mui/icons-material/Comment";
import "../css/global.css";
import { useLocation, useNavigate } from "react-router-dom";
import { deleteBlog, saveComment } from "../service/BlogAppApis";
import parse from "html-react-parser";
import { getUser } from "../util/BlogAppUtil";

function Blog() {
  const [user, setUser] = useState(() => getUser())
  const { state: blogData } = useLocation();
  const [blog, setBlog] = useState(blogData);
  const [newComment, setNewComment] = useState("");
  const [hasClicked, setHasClicked] = useState(false);
  const [displayNewComment, setDisplayNewComment] = useState(false);
  const [saveBlogData, setSaveBlogData] = useState(false);
  let navigate = useNavigate();

  useEffect(() => {
    if (saveBlogData) {
      saveComment(blog, navigate);
    }
    setSaveBlogData(false);
  }, [saveBlogData]);

  return (
    <Container maxWidth="md">
      <Grid container rowGap={3} columnSpacing={2}>
        <Grid item xs={12}>
          <Typography variant="h2">{blog.title}</Typography>
        </Grid>
        <Grid item container xs={8}>
          <Grid item container xs={12}>
            <Typography variant="h4">
              {blog.author.firstname} {blog.author.lastname}
            </Typography>
          </Grid>
          <Grid item container xs={12}>
            <Typography variant="h6" sx={{ marginY: "auto" }}>
              {blog.date}
            </Typography>
          </Grid>
        </Grid>
        <Grid item xs={4} className="content-end">
          {(user.email === blog.author.email)
            && <Button sx={{ height: '70%' }} variant="outlined" onClick={() => deleteBlog(blog.blogId, navigate)}>Delete Blog</Button>
          }
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant="h6">
            {parse(blog.content, { trim: true })}
          </Typography>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={8}>
          <Typography variant="h5">Comments</Typography>
        </Grid>
        <Grid item xs={4} className="content-end">
          <IconButton
            onClick={() => {
              setNewComment("");
              setDisplayNewComment((prev) => !prev);
              setHasClicked(false);
            }}
          >
            <CommentIcon />
          </IconButton>
        </Grid>
        {displayNewComment && (
          <Grid
            container
            rowGap={3}
            columnSpacing={2}
            maxWidth="90%"
            sx={{ margin: "auto" }}
          >
            <Grid item xs={12}>
              <TextField
                fullWidth
                id="newComment"
                label="New Comment"
                value={newComment}
                multiline
                size="small"
                rows={5}
                helperText={
                  hasClicked && newComment === "" ? "Must not be empty" : ""
                }
                error={hasClicked && newComment === ""}
                onChange={(e) => setNewComment(e.target.value)}
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                onClick={() => {
                  setHasClicked(true);
                  if (newComment !== "") {
                    setDisplayNewComment(false);
                    setBlog((prev) => ({
                      ...prev,
                      comments: [
                        { name: user.firstname + " " + user.lastname, message: newComment },
                        ...prev.comments,
                      ],
                    }));
                    setNewComment("");
                    setHasClicked(false);
                    setSaveBlogData(true);
                  }
                }}
              >
                Add Comment
              </Button>
            </Grid>
          </Grid>
        )}
        <Grid item xs={12}>
          {blog.comments.map((comment) => (
            <Card sx={{ marginTop: "10px" }}>
              <CardContent>
                <Typography variant="h6">{comment.name}</Typography>
                <Typography variant="body1">{comment.message}</Typography>
              </CardContent>
            </Card>
          ))}
        </Grid>
      </Grid>
    </Container>
  );
}

export default Blog;
