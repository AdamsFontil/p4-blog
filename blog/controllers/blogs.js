const blogsRouter = require('express').Router()
const Blog = require('../models/blog')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog.find({})
  response.status(200).json(blogs)
  console.log('returning blogs,', blogs, 'status code---', response.statusCode )

})

blogsRouter.get('/:id', async (request, response) => {
  const blog = await Blog.findById(request.params.id)
  if (blog) {
    response.json(blog)
  } else {
    response.status(404).end
  }

})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  if (!body.url || !body.title) {
    console.log('missing url or title')
    response.status(400).json({ error: 'title or url missing' })
  }

  const blog = new Blog({
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
  })

  console.log(`success adding ${blog} to DB`)
  const savedBlog = await blog.save()
  response.status(201).json(savedBlog)

})



module.exports = blogsRouter
