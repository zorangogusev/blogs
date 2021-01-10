function deleteBlog(e) {
    e.preventDefault()

    if(confirm('Delete Blog?')) $('#formForDeleteBlog').submit()
}
