// const assert = require('node:assert')
// const bcrypt = require('bcrypt')
// const { test, beforeEach, describe } = require('node:test')
// const supertest = require('supertest')

// const app = require('../app')
// const helper = require('./test_blog_helper')
// const User = require('../models/user')

// const api = supertest(app)




// describe.only('when there is initially one user in db22', () => {
//   beforeEach(async () => {
//     await User.deleteMany({})

//     const passwordHash = await bcrypt.hash('sekret', 10)
//     const user = new User({ username: 'root', name: 'root user', passwordHash })
//     console.log('testing beforeeach')

//     await user.save()
//   })

//   test('creation succeeds with a fresh username23', async () => {
//     const usersAtStart = await helper.usersInDb()
//     console.log('users in db', usersAtStart)

//     const newUser = {
//       username: 'mluukkai',
//       name: 'Matti Luukkainen',
//       password: 'salainen',
//     }

//     await api
//       .post('/api/users')
//       .send(newUser)
//       .expect(201)
//       .expect('Content-Type', /application\/json/)

//     const usersAtEnd = await helper.usersInDb()
//     assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1)
//     console.log('users at end', usersAtEnd)

//     const usernames = usersAtEnd.map(u => u.username)
//     assert(usernames.includes(newUser.username))
//   })
// })
