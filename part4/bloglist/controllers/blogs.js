const blogsrouter = require('express').Router();
const Blog = require('../models/blog');
const jwt = require('jsonwebtoken')
const User = require('../models/user')
const userExtractor = require('../utils/middleware').userExtractor

blogsrouter.get('/', async(request, response) => {
  const blogs= await Blog
  .find({})
  .populate('user', {username:1, name:1})
  response.json(blogs)
})


blogsrouter.post('/',userExtractor, async(request, response,next) => {
  const blog = new Blog(request.body)
  const user = request.user
  if (!user ) {
    return response.status(403).json({ error: 'user missing' })
  }  
  if (!blog.title || !blog.url ) {
    return response.status(400).json({ error: 'title or url missing' })
  } 
  blog.likes = blog.likes | 0
  blog.user = user
  user.blogs = user.blogs.concat(blog._id)

  await user.save()

  const savedBlog = await blog.save()

  response.status(201).json(savedBlog)

})

blogsrouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id);
  if (blog) {
    response.json(blog);
  } else {
    response.status(404).end()
  }
})

blogsrouter.delete('/:id', userExtractor,async (request, response, next) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(204).end()
  }

  if (blog.user.toString() !== user.id.toString()) {
    return response.status(401).json({ error: 'Unauthorized' })
  }
  await blog.deleteOne()
  user.blogs = user.blogs.filter(b => b._id.toString() !== blog._id.toString())
  await user.save()
  response.status(204).end()
})

blogsrouter.put('/:id', async (request, response,next) => {
  const body = request.body;

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes,
  };

  const updatedBlog = await Blog
    .findByIdAndUpdate(request.params.id, blog, { new: true });
  response.json(updatedBlog);
})





module.exports = blogsrouter;

// It would also be possible to register a middleware only for a specific operation:(that we do not need in app.use() in app.js)
// const middleware = require('../utils/middleware');
// router.post('/', middleware.userExtractor, async (request, response) => {}