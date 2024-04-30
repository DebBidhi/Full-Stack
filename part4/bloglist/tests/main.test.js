const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)

const helper = require('./maintest_helper')

const Blog = require('../models/blog')

describe('Blog list application', () => {
    beforeEach(async () => {
        await Blog.deleteMany({})
        await Blog.insertMany(helper.initialBlogs)
    })

    test('GET /api/blogs returns correct amount of blog posts in JSON format', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    test('Blog posts have unique identifier property named id', async () => {
        const response = await helper.blogsInDb()
        const blog = response[0]
        assert.ok(blog.id)
    })

    test('POST /api/blogs creates a new blog post', async () => {
        const newBlog = {
            title: 'Test Blog',
            author: 'Test Author',
            url: 'www.testblog.com',
            likes: 5
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        assert.strictEqual(response.body.length, helper.initialBlogs.length + 1)

        const titles = response.body.map(blog => blog.title)
        assert.ok(titles.includes('Test Blog'))
    })

    test('If likes property is missing, it will default to 0', async () => {
        const newBlog = {
            title: 'Test Blog',
            author: 'Test Author',
            url: 'www.testblog.com'
        }

        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs')
        const blog = response.body.find(blog => blog.title === 'Test Blog')
        assert.strictEqual(blog.likes, 0)
    })

    test('If title and url properties are missing, return 400 Bad Request', async () => {
        const newBlog = {
            author: 'Test Author',
            likes: 5
        }
        
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(400)
    })

    test('DELETE /api/blogs deletes a blog post', async () => {
        const response = await helper.blogsInDb()
        const blogToDelete = response[0]
        await api
            .delete(`/api/blogs/${blogToDelete.id}`)
            .expect(204)
        
        const blogsAtEnd = await helper.blogsInDb()
        assert.strictEqual(blogsAtEnd.length, helper.initialBlogs.length - 1)

        const titles = blogsAtEnd.map(blog => blog.title)
        assert.ok(!titles.includes(blogToDelete.title))
    })

    test('PUT /api/blogs updates a blog post', async () => {
        const response = await helper.blogsInDb()
        const blogToUpdate = response[0]
        const updatedBlog = {
            title: 'Updated Blog',
            author: 'Updated Author',
            likes: 10
        }

        await api
            .put(`/api/blogs/${blogToUpdate.id}`)
            .send(updatedBlog)
            .expect(200)
            .expect('Content-Type', /application\/json/)
        
        const blogsAtEnd = await helper.blogsInDb()
        const updatedBlogAtEnd = blogsAtEnd.find(blog => blog.id === blogToUpdate.id)
        assert.deepStrictEqual(updatedBlogAtEnd, { ...blogToUpdate, ...updatedBlog })
    })
})



after(async () => {
    await mongoose.connection.close()
})
