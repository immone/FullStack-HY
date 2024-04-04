const blogRouter = require('express').Router()
const Blog = require('../models/blog')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    response.json(blogs)
})
  
blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    try {
      const savedBlog = await blog.save()
      response.status(201).json(savedBlog)
    }
    catch(exception) {
      response.status(400).end()
    }

})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()

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