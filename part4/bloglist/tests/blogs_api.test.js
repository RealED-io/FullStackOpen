const { before, test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const Blog = require('../models/blogs')
const User = require('../models/users')
const app = require('../app')
const jwt = require('jsonwebtoken')

const api = supertest(app)

const initialUser = {
    username: 'root',
    name: 'Super User',
    password: 'superpassword'
}

const initialBlogs = [
    {
        title: 'React patterns',
        author: 'Michael Chan',
        url: 'https://reactpatterns.com/',
        likes: 7,
    },
    {
        title: 'Go To Statement Considered Harmful',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
        likes: 5,
    },
    {
        title: 'Canonical string reduction',
        author: 'Edsger W. Dijkstra',
        url: 'http://www.cs.utexas.edu/~EWD/transcriptions/EWD08xx/EWD808.html',
        likes: 12,
    },
    {
        title: 'First class tests',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/05/05/TestDefinitions.htmll',
        likes: 10,
    },
    {
        title: 'TDD harms architecture',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2017/03/03/TDD-Harms-Architecture.html',
        likes: 0,
    },
    {
        title: 'Type wars',
        author: 'Robert C. Martin',
        url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
        likes: 2,
    }
]

before(async () => {
    // Try to add initial user if not yet added, ignores duplicate username error
    try {
        await User.create(initialUser)
    } catch (error) {
        if (!(error.name === 'MongoServerError' && error.code === 11000)) {
            throw error
        }
    }
    this.user = await User.findOne({ username: initialUser.username })
    const userForToken = {
        username: this.user.username,
        id: this.user._id,
    }
    this.token = `Bearer ${jwt.sign(userForToken, process.env.SECRET, { expiresIn: 5 * 60 })}`
})

beforeEach(async () => {
    await Blog.deleteMany({})
    await Blog.insertMany(initialBlogs.map(blog => ({ ...blog, user: this.user._id.toString() })))
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
        title: 'A',
        author: 'B',
        url: 'C',
        likes: 4
    }

    const blogNoTitle = {
        author: 'G',
        url: 'H'
    }

    const blogNoLike = {
        title: 'D',
        author: 'E',
        url: 'F'
    }

    test('adding 1 post increases length/count by 1', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', this.token)
            .send(newBlog)
        const res = await api.get('/api/blogs')
        assert.equal(res.body.length, initialBlogs.length + 1)
    })

    test('adding a post without like defaults to 0 likes', async () => {
        const { body: { id } } = await api
            .post('/api/blogs')
            .set('Authorization', this.token)
            .send(blogNoLike)
        const res = await api.get(`/api/blogs/${id}`)
        assert.equal(res.body.likes, 0)
    })

    test('adding a post without title responds to 400', async () => {
        await api
            .post('/api/blogs')
            .set('Authorization', this.token)
            .send(blogNoTitle)
            .expect(400)
    })

    test('adding a post without auth responds to 401', async () => {
        await api
            .post('/api/blogs')
            .send(newBlog)
            .expect(401)
    })
})

describe('DELETE blogs', () => {
    let blogs
    beforeEach(async () => {
        const res = await api.get('/api/blogs')
        blogs = res.body
    })

    test('Delete 1 blog decreases length/count by 1', async () => {
        const id = blogs[0].id
        await api
            .delete(`/api/blogs/${id}`)
            .set('Authorization', this.token)
        const res = await api.get('/api/blogs')
        assert.equal(res.body.length, blogs.length - 1)
    })

    test('Delete without auth responds to 401', async () => {
        const id = blogs[0].id
        await api
            .delete(`/api/blogs/${id}`)
            .expect(401)
    })
})

describe('PUT blogs', () => {
    test('update blogs likes', async () => {
        const res = await api.get('/api/blogs')
        const blogs = res.body
        const blog = blogs[0]
        const newResponse = await api
            .put(`/api/blogs/${blog.id}`)
            .send({ likes: blog.likes + 1 })
        assert.equal(newResponse.body.likes, blog.likes + 1)
    })
})

after(async () => {
    await mongoose.connection.close()
})