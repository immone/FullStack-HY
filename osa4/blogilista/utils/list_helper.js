const _ = require('lodash');

const dummy = (blogs) => {
  return 1
}

// Helper to sum array
const sum = (ar) => {
  return(
    ar.reduce((s, e) => s + e, 0)
  )
}

const totalLikes = (blogs) => {
  return sum(blogs.map(x => x.likes))
}

// Helper to find max index
const maxByIndex = (l) => {
  return ( 
    l.reduce((a,b,i) => a[0] < b ? [b,i] : a, [Number.MIN_VALUE,-1])
  )
}

const favoriteBlog = (blogs) => {
  if (blogs.length === 0) return null
  const maxInd = maxByIndex(blogs.map(x => x.likes))
  return blogs[maxInd[1]]
}

const mostBlogs = (blogs) => {
  if (blogs.length === 0) return null
  const d = _.mapValues( _.groupBy(blogs, x => x.author), x=>x.length) // just some adhoc way to do this fast
  const m = _.max(Object.values(d))
  const key = _.findKey(d, x => x=== m)
  return {'author': key, 'blogs': Number(m)}
}

const mostLikes = (blogs) => {
  if (blogs.length === 0) return null
  const d =  _.groupBy(blogs, x => x.author)// just some adhoc way to do this fast
  const v = _.mapValues(_.mapValues(d, x=> x.map(y => y.likes)), sum) // since values are lists
  const m = _.max(Object.values(v))
  const key = _.findKey(v, x => x === m)
  return {'author': key, 'likes': Number(m)}
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}