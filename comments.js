// Create web server
// Create API
// Create route
// Create controller
// Create model
// Create database

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Comment = require('./models/Comment');

const app = express();
const port = 3000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/comments', { useNewUrlParser: true, useUnifiedTopology: true });

app.get('/comments', async (req, res) => {
  const comments = await Comment.find();
  res.json(comments);
});

app.post('/comments', async (req, res) => {
  const { name, email, comment } = req.body;
  const newComment = new Comment({
    name,
    email,
    comment,
  });
  const savedComment = await newComment.save();
  res.json(savedComment);
});

app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
});