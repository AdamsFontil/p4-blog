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







module.exports = {
  dummy, totalLikes
}
