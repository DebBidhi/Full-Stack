const Blog = require('../models/blog');

const blogsInDb = async () => {
    const blogs = await Blog.find({});
    return blogs.map(blog => blog.toJSON());
};

const initialBlogs=[
    {
        title: 'Blog 1',
        author: 'Author 1',
        url: 'www.blog1.com',
        likes: 10,
        user: ""
    },
    {
        title: 'Blog 2',
        author: 'Author 2',
        url: 'www.blog2.com',
        likes: 20
    },
    {
        title: 'Blog 3',
        author: 'Author 2',
        url: 'www.blog3.com',
        likes: 30
    }
]

module.exports = { blogsInDb ,initialBlogs}