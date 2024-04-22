import Blog from './blog'

const BlogForm = ({ blogs, addLike, removeBlog, currentUser }) => (
  <>
    <div>
      {blogs
        .sort(
          (a, b) => {
            if (a.likes > b.likes) {
              return -1
            } else if (a.likes < b.likes) {
              return 1
            }
            return 0
          })
        .map(blog =>
          <Blog
            key={blog.id}
            blog={blog}
            addLike={addLike}
            removeBlog={removeBlog}
            currentUser={currentUser}
          />
        )}
    </div>
  </>
)

export default BlogForm