const _ = require ('lodash')
const blogs = require ('./blogsDBBase')




const mostLikes = (blogs) => {
  if (blogs.length === 0) return 0
  const chain = _(blogs)
    .countBy('author')                          // returns all authors
    .map((count, author) => ({ author, likes: count }))  // turn into array
    .maxBy('likes')                             // get author with most blogs
  console.log('result of chaining lodash', chain)
  return chain
}


console.log('mostLiked', mostLikes(blogs))
