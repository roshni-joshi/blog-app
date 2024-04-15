import { Button, Container, Divider, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import '../css/global.css';
import { DEFAULT_ALL_BLOGS, DEFAULT_USER } from '../util/DefaultDataConstants';
import BlogCard from './BlogCard';
import { getUser } from '../util/BlogAppUtil';
import { getAllBlogs } from '../service/BlogAppApis';
import { useNavigate } from 'react-router';

function Home() {
  const [user, setUser] = useState(() => getUser())
  const [allBlogs, setAllBlogs] = useState(DEFAULT_ALL_BLOGS);
  let navigate = useNavigate();

  useEffect(() => {
    getAllBlogs(setAllBlogs);
  }, []);

  return (
    <Container maxWidth='xl'>
      <Grid container rowGap={3} columnSpacing={2}>
        <Grid item xs={8}>
          <Typography variant='h3'>Welcome {user.firstname} {user.lastname}</Typography>
        </Grid>
        <Grid item xs={4} className='content-end'>
          <Button variant='contained' onClick={() => navigate("/addblog")}>Add New Blog</Button>
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h4'>Your Blogs</Typography>
        </Grid>
        <Grid item container xs={12} rowGap={3} columnSpacing={2}>
          {
            allBlogs.map(blog => (

              (blog.author.email === user.email) ?
                <Grid item md={4} xs={12}>
                  <BlogCard key={blog.blogId} blogData={blog} />
                </Grid>
                : ''

            ))
          }
        </Grid>
        <Grid item xs={12}>
          <Divider />
        </Grid>
        <Grid item xs={12}>
          <Typography variant='h4'>All Blogs</Typography>
        </Grid>
        <Grid item container xs={12} rowGap={3} columnSpacing={2}>
          {
            allBlogs.map(blog => (

              (blog.author.email !== user.email) ?
                <Grid item md={4} xs={12}>
                  <BlogCard key={blog.blogId} blogData={blog} />
                </Grid>
                : ''
            ))
          }
        </Grid>
      </Grid>
    </Container>
  )
}

export default Home
