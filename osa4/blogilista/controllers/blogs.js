const blogRouter = require('express').Router()
const blog = require('../models/blog')
const Blog = require('../models/blog')
const User = require('../models/user')
const { userExtractor } = require('../utils/middleware')

blogRouter.post('/', userExtractor, async (request, response) => {
    const {title, author, likes, url} = request.body
    const user = request.user
    const blog = new Blog({
      title, 
      author,
      likes,
      url,
      user: request.user._id
    })

    if (!user ) {
      return response.status(403).json({ error: 'user missing' })
    }  
  
    if (!blog.title || !blog.url ) {
      return response.status(400).json({ error: 'title or url missing' })
    } 

    try { 
      await user.save()
      const savedBlog = await blog.save()
      user.blogs = user.blogs.concat(savedBlog._id)
      response.status(201).json(savedBlog)
    }
    catch(exception) {
      response.status(400).end()
    }
})

blogRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', {username: 1, user: 1})
  response.json(blogs)
})

blogRouter.delete('/:id', userExtractor, async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  const user = request.user
  if (user._id.toString() === blog.user.toString()) {
    await Blog.findByIdAndDelete(request.params.id)
    response.status(204).end()
  } else {
    response.status(401).json({ error: 'unauthorized to delete blog' })
  }
})

blogRouter.put('/:id', async (request, response) => {
  const updatedBlog = {
    title: request.body.title,
    author: request.body.author,
    url: request.body.url,
    likes: request.body.likes
  }

  const ret = await Blog.findByIdAndUpdate(request.params.id, updatedBlog, { new: true})
  response.json(ret)
  
})

module.exports = blogRouter