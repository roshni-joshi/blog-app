import { Button, Card, CardActions, CardContent, Typography } from '@mui/material';
import React from 'react';  
import { useNavigate } from 'react-router-dom';

function BlogCard({blogData}) {
  let navigate = useNavigate();
  return (
    <Card variant='outlined' sx={{ maxWidth: 360 }}>
      <CardContent>
        <Typography variant='h5'>{blogData.title}</Typography>
        <Typography variant='h6'>{blogData.author.firstname} {blogData.author.lastname}</Typography>
        <Typography variant='body1'>{blogData.date}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small" onClick={() => navigate("/blog", {state: blogData})}>Read More</Button>
      </CardActions>
    </Card>
  )
}

export default BlogCard
