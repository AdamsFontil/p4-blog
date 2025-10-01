const assert = require('node:assert')
const { test, beforeEach } = require('node:test')
const supertest = require('supertest')
const app = require('../app')
const helper = require('./test_blog_helper')
const Blog = require('../models/blog')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

test('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
  console.log(`response body length is ${response.body.length} vs contant length is ${response.body.length}`)


})
test.only('id string is the identifier', async () => {
  const blogs = await Blog.find({})
  const specificBlog = blogs[2].toJSON()

  console.log('need this blog\'s id:', specificBlog.id)

  const callSpecificBlog = await api
    .get(`/api/blogs/${specificBlog.id}`)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  assert.ok(callSpecificBlog.body.id, 'Expected "id" to be defined')
  assert.strictEqual(typeof callSpecificBlog.body.id, 'string', '"id" should be a string')
  assert.strictEqual(callSpecificBlog.body._id, undefined, 'Expected "_id" to be undefined')
  console.log('confirm that calling specific blog results in id instead _id also _v should be missing', callSpecificBlog.body )
})
