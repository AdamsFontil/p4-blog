const Blog = require('../models/blog')
const initialBlogs = require('../blogsDBBase')

const nonExistingId = async () => {
  const blog = new Blog({ author: 'nonegiven' })
  await blog.save()
  await blog.deleteOne()
  return blog._id.toString()
}

const blogsInDb = async () => {
  const blogs = await Blog.find({})
  return blogs.map(blog => blog.toJSON())
}

module.exports = {
  initialBlogs, nonExistingId, blogsInDb
}
