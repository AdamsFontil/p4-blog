const assert = require('node:assert')
const bcrypt = require('bcrypt')
const { test, beforeEach, describe } = require('node:test')
// const mongoose = require('mongoose')
const supertest = require('supertest')

const app = require('../app')
const helper = require('./test_blog_helper')
const Blog = require('../models/blog')
const User = require('../models/user')

const api = supertest(app)

beforeEach(async () => {
  await Blog.deleteMany({})
  await Blog.insertMany(helper.initialBlogs)
})

describe('checking initial blogs', () => {
  test('blogs are returned as json', async () => {
    await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  })

  test('all blogs are returned', async () => {
    const response = await api.get('/api/blogs')
    assert.strictEqual(response.body.length, helper.initialBlogs.length)
    //console.log(`response body length is ${response.body.length} vs contant length is ${response.body.length}`)

  })
  test('id string is the identifier', async () => {
    const blogs = await Blog.find({})
    const specificBlog = blogs[2].toJSON()

    //console.log('need this blog\'s id:', specificBlog.id)

    const callSpecificBlog = await api
      .get(`/api/blogs/${specificBlog.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    assert.ok(callSpecificBlog.body.id, 'Expected "id" to be defined')
    assert.strictEqual(typeof callSpecificBlog.body.id, 'string', '"id" should be a string')
    assert.strictEqual(callSpecificBlog.body._id, undefined, 'Expected "_id" to be undefined')
    //console.log('confirm that calling specific blog results in id instead _id also _v should be missing', callSpecificBlog.body )
  })
})

describe('adding blogs', () => {
  test('a valid blog can be added ', async () => {
    const newBlog = {
      title: 'Con gai va con trai deu thich tao',
      author: 'PFPITME',
      url: 'vPod101.com',
      likes: 9224
    }
    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
    const blogsAtEnd = await helper.blogsInDb()
    //console.log('blogs at the end, look for new entry,',blogsAtEnd)
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length + 1)
    assert(
      blogsAtEnd.some(blog =>
        blog.title === newBlog.title &&
      blog.author === newBlog.author &&
      blog.url === newBlog.url &&
      blog.likes === newBlog.likes
      ),
      'Expected blog with matching content not found'
    )
  })
  test ('no likes = 0', async () => {
    const blogWithoutLikes = {
      title: 'Con gai va con trai deu thich tao',
      author: 'PFPITME',
      url: 'vPod101.com'
    }
    const result = await api
      .post('/api/blogs')
      .send(blogWithoutLikes)
      .expect(201)
      .expect('Content-Type',/application\/json/)

    //console.log('result is---', result.body)
    assert.strictEqual(result.body.likes, 0)
  })
  test('missing title returns error 400', async () => {
    const blogWithoutTitle = {
      author: 'PFPITME',
      url: 'vPod101.com',
      likes: 23
    }
    await api
      .post('/api/blogs')
      .send(blogWithoutTitle)
      .expect(400)

    //console.log('result is---', result.body)
    const blogsAtEnd = await helper.blogsInDb()
    //console.log('blogs at the end, no new entry,',blogsAtEnd)
    //console.log('length vs length', blogsAtEnd.length, helper.initialBlogs.length)
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
  test('missing url results in an error 400', async () => {
    const blogWithoutUrl = {
      title: 'Con gai va con trai deu thich tao',
      author: 'PFPITME',
      likes: 23
    }
    await api
      .post('/api/blogs')
      .send(blogWithoutUrl)
      .expect(400)

    //console.log('result is---', result.body)
    const blogsAtEnd = await helper.blogsInDb()
    //console.log('blogs at the end, no new entry,',blogsAtEnd)
    //console.log('length vs length', blogsAtEnd.length, helper.initialBlogs.length)
    assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length)
  })
})
describe('deleting posts', () => {
  test('succeeds with code of 204 id is', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]
    console.log('blogs at start', blogsAtStart)
    console.log('blog to remove', blogToDelete)

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()
    console.log('blogsAttheEnd', blogsAtEnd)
    console.log('target', blogToDelete)
    console.log(`lengths compared ${blogsAtEnd.length} vs ${blogsAtStart.length - 1}`)
    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length - 1)

    const contents = blogsAtEnd.map(blogs => blogs)
    console.log('what are contents', contents)
    assert(!contents.includes.blogToDelete)
  })
})
describe('updating blogs', () => {
  test('correct id updates the DB', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const targetAtStart = blogsAtStart[0]
    const updatedBlog = {
      title: 'React patterns23',
      author: 'Michael Chan2',
      url: 'https://reactpatterns.com/2',
      likes: 72,
    }
    console.log('target---',targetAtStart)
    const result =  await api
      .put(`/api/blogs/${targetAtStart.id}`)
      .send(updatedBlog)
      .expect(200)

    console.log('what is result,,,', result.data)
    const blogsAtEnd = await helper.blogsInDb()

    assert.strictEqual(blogsAtEnd.length, blogsAtStart.length)
    assert(
      blogsAtEnd.some(
        blog =>
          blog.title === updatedBlog.title &&
          blog.author === updatedBlog.author &&
          blog.url === updatedBlog.url &&
          blog.likes === updatedBlog.likes
      )
    )
  })
  test('wrong id returns error', async () => {
    const fakeId = '68dd023b84cdb7f07f351d156'
    const putMethodShouldNotWork = {
      title: 'React patterns23',
      author: 'Michael Chan2',
      url: 'https://reactpatterns.com/2',
      likes: 72,
    }
    await api
      .put(`/api/blogs/${fakeId}`)
      .send(putMethodShouldNotWork)
      .expect(400)

    console.log('typeof FakeID', typeof(fakeId))

  })
})
describe('when there is initially one user in db25', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const passwordHash = await bcrypt.hash('sekret', 10)
    const user = new User({ username: 'root', name: 'root user', passwordHash })
    console.log('testing beforeeach')

    await user.save()
  })

  test('creation succeeds with a fresh username23', async () => {
    const usersAtStart = await helper.usersInDb()
    console.log('users in db', usersAtStart)

    const newUser = {
      username: 'mluukkai',
      name: 'Matti Luukkainen',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    console.log('users at end', usersAtEnd)

    const usernames = usersAtEnd.map(u => u.username)
    assert(usernames.includes(newUser.username))
  })
  test.only('missing parameters ie name or username fails with code 400', async () => {
    const usersAtStart = await helper.usersInDb()
    console.log('users in db', usersAtStart)

    const missingName = {
      username: 'mluukkai',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(missingName)
      .expect(400)

    const missingUserName = {
      name: 'mluukkai',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(missingUserName)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    console.log('users at end', usersAtEnd)

    const usernames = usersAtEnd.map(u => u.username)
    assert(!usernames.includes(missingName.username))
    assert(!usernames.includes(missingUserName.name))

  })
  test('usernames must be unique', async () => {
    const usersAtStart = await helper.usersInDb()
    console.log('users at start', usersAtStart)

    const attempt1User = {
      username: 'mluukkai',
      name: 'Not Matti',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(attempt1User)
      .expect(201)

    const usersInMiddle = await helper.usersInDb()
    console.log('middle', usersInMiddle)

    const sameUserNameDifferentName = {
      username: 'mluukkai',
      name: 'Not Matti 2',
      password: 'salainen',
    }
    await api
      .post('/api/users')
      .send(sameUserNameDifferentName)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
    console.log('users at end', usersAtEnd)
  })
  test.only('usernames and names less than 3 char return error', async () => {
    const usersAtStart = await helper.usersInDb()
    console.log('users at start', usersAtStart)

    const badUsername = {
      username: 'ml',
      name: 'Matti Salli',
      password: 'salainen',
    }

    await api
      .post('/api/users')
      .send(badUsername)
      .expect(400)

    const usersInMiddle = await helper.usersInDb()
    console.log('middle', usersInMiddle)

    const badName = {
      username: 'mluukkai',
      name: 'No',
      password: 'salainen',
    }
    await api
      .post('/api/users')
      .send(badName)
      .expect(400)

    const usersAtEnd = await helper.usersInDb()
    assert.strictEqual(usersAtEnd.length, usersAtStart.length)
    console.log('users at end', usersAtEnd)
  })

})
