const express = require('express');
const bodyParser = require('body-parser');
const {randomBytes} = require('crypto');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
  const {id: postId} = req.params;

  const comments = commentsByPostId[postId] || [];
  res.send(comments);
});

app.post('/posts/:id/comments', async (req, res) => {
  const commentId = randomBytes(4).toString('hex');
  const {content} = req.body;
  const {id: postId} = req.params;

  const comment = {
    id: commentId,
    postId,
    content,
    status: 'pending',
  };

  const comments = commentsByPostId[postId] || [];
  comments.push(comment);

  commentsByPostId[postId] = comments;

  await axios.post('http://localhost:4005/events', {
    type: 'CommentCreated',
    data: comment,
  });

  res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
  const {type, data} = req.body;

  if (type === 'CommentModerated') {
    const {postId, id, status, content} = data;
    const comments = commentsByPostId[postId];

    const comment = comments.find((comment) => {
      return comment.id === id;
    });
    comment.status = status;

    await axios.post('http://localhost:4005/events', {
      type: 'CommentUpdated',
      data: {id, status, postId, content},
    });
  }

  res.send({});
});

app.listen(4001, () => {
  console.log('Listening on 4001');
});
