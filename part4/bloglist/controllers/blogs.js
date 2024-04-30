const blogsrouter = require('express').Router();
const Blog = require('../models/blog');

blogsrouter.get('/', async(request, response) => {
  const blogs= await Blog
  .find({})
  .populate('user', {username:1, name:1})
  response.json(blogs)
})


blogsrouter.post('/', async(request, response,next) => {
  const body = request.body
  const user = request.user

  const blog = new Blog({
		title: body.title,
		author: body.author,
		url: body.url,
		likes: body.likes? body.likes : 0,
		user: user.id
	})

  const savedBlog = await blog.save() 
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()   
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

blogsrouter.delete('/:id', async (request, response, next) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id)

  if (!blog) {
    return response.status(404).json({ error: 'Blog not found' })
  }

  if (blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    return response.status(401).json({ error: 'Unauthorized' })
  }
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