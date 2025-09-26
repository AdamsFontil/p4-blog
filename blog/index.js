const express = require('express')
const mongoose = require('mongoose')

const app = express()

const blogSchema = mongoose.Schema({
  title: String,
  author: String,
  url: String,
  likes: Number,
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = 'mongodb+srv://adamsfuntil_db_user:BV9Ajub4BQELdslZ@cluster0.ntim1gf.mongodb.net/BlogApp?retryWrites=true&w=majority&appName=Cluster0'
mongoose.connect(mongoUrl)
console.log('connected to', mongoUrl)

app.use(express.json())

app.get('/api/blogs', (request, response) => {
  Blog.find({}).then((blogs) => {
    response.json(blogs)
    console.log('getting blogs,', blogs)
  })
})

app.post('/api/blogs', (request, response) => {
  const blog = new Blog(request.body)

  blog.save().then((result) => {
    response.status(201).json(result)
  })
})

const PORT = process.env.PORT || 3005
console.log('what prt am i using', PORT)
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})
