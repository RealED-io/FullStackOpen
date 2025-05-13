const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const Blog = require('../models/blogs')

const api = supertest(app)

const initialBlogs = [
    {
        title: "React patterns",
        author: "Michael Chan",
        url: "https://reactpatterns.com/",
        likes: 7,
        __v: 0
    },
    {
        title: "Go To Statement Considered Harmful",
        author: "Edsger W. Dijkstra",
        url: "http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html",
        likes: 5,
        __v: 0
    },
    {
        title: "Canonical string reduction",
        author: "Edsger W. Dijkstra",
        url: "http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html",
        likes: 12,
        __v: 0
    },
    {
        title: "First class tests",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll",
        likes: 10,
        __v: 0
    },
    {
        title: "TDD harms architecture",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html",
        likes: 0,
        __v: 0
    },
    {
        title: "Type wars",
        author: "Robert C. Martin",
        url: "http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html",
        likes: 2,
        __v: 0
    }
]

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs)
})

test('dummy test "1!=2"', () => {
    assert.notEqual(1, 2)
})

describe('GET blogs', () => {
    test('successfully returns json', async () => {
        await api
            .get('/api/blogs')
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    test('returns correct length/count', async () => {
        const res = await api.get('/api/blogs')
        assert.equal(res.body.length, initialBlogs.length)
    })

    test('id is defined', async () => {
        const blogs = await api.get('/api/blogs')

        blogs.body.forEach(blog => {
            assert.ok(blog.id)
        })
    })
})

describe('POST blogs', () => {
    const newBlog = {
        title: "A",
        author: "B",
        url: "C",
        likes: 4,
    }

    test('adding 1 post increases length/count by 1', async () => {
        await api
                .post('/api/blogs')
                .send(newBlog)
        const res = await api.get('/api/blogs')
        assert.equal(res.body.length, initialBlogs.length + 1)
    })

    const newBlogWithoutLike = {
        title: "D",
        author: "E",
        url: "F"
    }

    test('adding a post without like defaults to 0 likes', async () => {
        const { body: { id } } = await api
                .post('/api/blogs')
                .send(newBlogWithoutLike)
        const res = await api.get(`/api/blogs/${id}`)
        assert.equal(res.body.likes, 0)
    })

    const newBrokenBlog = {
        author: "G",
        url: "H"
    }

    test('adding a post without title responds to 400', async () => {
        await api
                .post('/api/blogs')
                .send(newBrokenBlog)
                .expect(400)
    })


})

after(async () => {
    await mongoose.connection.close()
})