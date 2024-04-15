import {
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import { saveBlog } from "../service/BlogAppApis";
import { useNavigate } from "react-router-dom";
import { getUser } from "../util/BlogAppUtil";
import { DEFAULT_BLOG } from "../util/DefaultDataConstants";
import dayjs from "dayjs";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, false] }],
    ["bold", "italic", "underline", "strike", "blockquote", "code-block"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    [{ font: [] }],
    ["link", "image"],
    ["clean"],
  ],
};

const formats = [
  "font",
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "code-block",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
];

export default function AddBlog() {
  const [blog, setBlog] = useState(DEFAULT_BLOG);
  const [user, setUser] = useState(() => getUser())
  const navigate = useNavigate();
  
  useEffect(() => {
    setBlog(prev => ({...prev, date: dayjs().format('DD MMM YYYY'), author: user}))
  }, []);

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Grid
        container
        display={"flex"}
        flexDirection={"column"}
        maxWidth={"sm"}
        sx={{
          height: "100%",
          display: "flex",
          flexDirection: "column",
          rowGap: 5,
        }}
      >
        <Typography variant="h4" textAlign={"center"}>
          Add Blog
        </Typography>
        <Grid item>
          <TextField
            name="title"
            id="title"
            type={"title"}
            value={blog.value}
            placeholder="Enter title"
            label="Enter title"
            required
            fullWidth
            onChange={(event) =>
              setBlog((prev) => ({ ...prev, title: event.target.value }))
            }
          />
        </Grid>
        <Grid item height={200}>
          <ReactQuill
            style={{ height: 150 }}
            formats={formats}
            modules={modules}
            theme="snow"
            value={blog.content}
            placeholder="Write content"
            onChange={(value, delta, sources, editor) => {
              let htmlValue = editor.getHTML();
              let textValue = editor.getText();
              setBlog((prev) => ({
                ...prev,
                content: htmlValue,
              }));
            }}
          />
        </Grid>
        <Grid item container display={"flex"} justifyContent={"flex-end"}>
          <Grid item xs={3}>
            <Button
              type="button"
              variant="contained"
              fullWidth
              disabled={!blog.title || !blog.content}
              onClick={() => saveBlog(blog, navigate)}
            >
              Post
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
