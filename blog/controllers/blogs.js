const blogsRouter = require('express').Router()
const blog = require('../models/blog')
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
    response.status(400).json({ error: 'title or url missing' }).end()
  } else {
    const blog = new Blog({
      title: body.title,
      author: body.author,
      url: body.url,
      likes: body.likes || 0,
    })

    console.log(`success adding ${blog} to DB`)
    const savedBlog = await blog.save()
    response.status(201).json(savedBlog)
  }
})

blogsRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogsRouter.put('/:id', async (request, response) => {
  const { title, author, url, likes } = request.body
  const findBlog = await Blog.findById(request.params.id)

  if (!findBlog) {
    console.log('blog does not exist')
    return response.status(400).send({ error: 'bad id' })
  }

  findBlog.title = title
  findBlog.author = author
  findBlog.url = url
  findBlog.likes = likes

  const updatedBlog = await findBlog.save()
  console.log('updated blog===', updatedBlog)
  response.json(updatedBlog)
})






module.exports = blogsRouter
