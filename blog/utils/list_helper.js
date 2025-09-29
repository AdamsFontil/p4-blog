const _ = require ('lodash')



const dummy = (blogs) => {
  console.log('what is blogs---', blogs)
  return 1
}


// const average = array => {
//   const reducer = (sum, item) => {
//     return sum + item
//   }

//   return array.length === 0
//     ? 0
//     : array.reduce(reducer, 0) / array.length
// }


const totalLikes = (blogs) => {
  // console.log('what do where have here',blogs)
  // console.log('blogs length is', blogs.length)

  if (blogs.length === 0) {
    console.log('empty list returning 0')
    return 0
  } else {
    const total = blogs.reduce((sum, blog) => sum + blog.likes, 0)
    console.log('total likes are ...',total)
    return total

  }

}


const favoriteBlog = (blogs) => {
  console.log('blogs input:', blogs)

  if (blogs.length === 0) return 0

  const max = blogs.reduce((maxSoFar, currentBlog, index) => {
    console.log('Iteration:', index)
    console.log('maxSoFar:', maxSoFar)
    console.log('currentBlog:', currentBlog)
    console.log('compare the likes',maxSoFar.likes, currentBlog.likes)
    if (currentBlog.likes > maxSoFar.likes) {
      console.log('found new big', currentBlog)
      return currentBlog
    } else return maxSoFar

  })

  console.log('what is max', max)
  return max
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return 0
  const chain = _(blogs)
    .countBy('author')                          // returns all authors
    .map((count, author) => ({ author, blogs: count }))  // turn into array
    .maxBy('blogs')                             // get author with most blogs
  console.log('result of chaining lodash', chain)
  return chain
}






module.exports = {
  dummy, totalLikes, favoriteBlog, mostBlogs
}
