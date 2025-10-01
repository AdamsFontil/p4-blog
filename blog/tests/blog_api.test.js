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

test.only('blogs are returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-Type', /application\/json/)
})

test.only('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  assert.strictEqual(response.body.length, helper.initialBlogs.length)
  console.log(`response body length is ${response.body.length} vs contant length is ${response.body.length}`)
})
