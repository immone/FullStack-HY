const mongoose = require('mongoose')
require('dotenv').config()

const blogSchema = mongoose.Schema({
    title: {type: String, required: true},
    author: String,
    url: {type: String, required: true},
    likes: {type: Number, default: 0}
})
  
// transforms the default MongoDB identifier attribute
// `._id` to `.id` and deletes the attribute `.__v`
blogSchema.set('toJSON', {
    transform: (document, returnedObject) => {
      returnedObject.id = returnedObject._id.toString()
      delete returnedObject._id
      delete returnedObject.__v
    }
})

module.exports =  mongoose.model('Blog', blogSchema)