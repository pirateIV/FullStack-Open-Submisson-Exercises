const blogRouter = require('express').Router();
const Blog = require('../models/blog');
const { error } = require('../utils/logger');

blogRouter.get('/api/blogs', (req, res) => {
  Blog.find({})
    .then((blogs) => res.json(blogs))
    .catch((err = error(err)));
});

blogRouter.post('/api/blogs', (req, res) => {
  const blogPost = new Blog(req.body);

  blogPost
    .save()
    .then((newBlog) => {
      res.json(newBlog);
    })
    .catch((err) => error(err));
});

module.exports = blogRouter;
