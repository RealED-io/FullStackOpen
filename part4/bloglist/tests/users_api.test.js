const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const User = require('../models/users')

const api = supertest(app)

const initialUsers = [
    {
        username: 'root',
        name: 'Super User',
        password: 'superpassword'
    },
]

beforeEach(async () => {
    await User.deleteMany({})
    await User.insertMany(initialUsers)
})

test('dummy test "1!=2"', () => {
    assert.notEqual(1, 2)
})

describe('POST users', () => {
    test('Test invalid username length', async () => {
        const newUser = {
            username: 'a',
            name: 'b',
            password: 'casdaasd'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('Test invalid password length', async () => {
        const newUser = {
            username: 'abcde',
            name: 'b',
            password: 'e'
        }
        await api
            .post('/api/users')
            .send(newUser)
            .expect(400)
    })

    test('Test adding user actually adds the user', async () => {
        const newUser = {
            username: 'abcde',
            name: 'fghij',
            password: 'klmno'
        }
        const res = await api
            .post('/api/users')
            .send(newUser)

        const returnedUser = res.body

        const getUser = await api
            .get(`/api/users/${returnedUser.id}`)
        assert.deepEqual(getUser.body, returnedUser)
    })

})

after(async () => {
    await mongoose.connection.close()
})