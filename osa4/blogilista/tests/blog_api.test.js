const {describe, test, after, beforeEach } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const helper = require('./test_helper')

const Blog = require('../models/blog')
const User = require('../models/user')
const { forOwn } = require('lodash')


describe('when there is initially some blogs saved', () => {
    let token; // this is so token can be accessed in each test
    beforeEach(async () => {
        // create user, login user, save token value in variable `token`
        const newUser = {
            username: 'PeikkoMuumi',
            name: 'Muumi Peikko',
            password: 'salattusalasana',
            blogs: []
          }   
        await Blog.deleteMany({})
        await User.deleteMany({})

        const obj = await api
            .post('/api/users')
            .send(newUser)   

        // add user id to field
        const k = helper.initialBlogs[0]
        const temp = {...k, user:obj.body.id} 
        const idAdded = [temp, helper.initialBlogs[1], helper.initialBlogs[2]]

        await Blog.insertMany(idAdded)
        const auth = await api
                        .post('/api/login')
                        .send({
                        username: newUser.username,
                        password: newUser.password
        })
        token = await `Bearer ${auth.body.token}`
    })

    // Tests that the blogs are in JSON
    test('notes are in the right format', async () => {
        await api
            .get('/api/blogs')
            .set('Authorization', token) // Works.
            .expect(200)
            .expect('Content-Type', /application\/json/)
    })

    // Tests that there is the correct number of blogs
    test('there is the right amount of blogs', async () => {
        const response = await api
            .get('/api/blogs')
            .set('Authorization', token) 

        assert.strictEqual(response.body.length, helper.initialBlogs.length)
    })

    //Tests that every document in the DB has the field id
    test('each of the blogs has an id field', async () => {
        const response = await api
                            .get('/api/blogs')
                            .set('Authorization', token) 
        
        const blogsJSON = response.body

        assert.strictEqual(blogsJSON.every(x=>x.id), true)
    })

    // Tests that posting new blogs works
    test('posting new valid blogs works', async () => {
        const response = await api.get('/api/blogs').set('Authorization', token)
        
        const newBlog = {
            title: 'A User-friendly Introduction to Lebesgue Measure and Integration',
            author: 'Gail S. Nelson',
            url: 'https://www.amazon.com/User-friendly-Introduction-Lebesgue-Integration-Mathematical/dp/1470421992/ref=sr_1_1?crid=1RVWPZ5JOAYYB&dib=eyJ2IjoiMSJ9.Pf2W-q52pJb8SDsIA84BszFIl--JGdKRnG_HYeZipRtMbdYV7eZ_BOpfwi-NypcU1cII91HNeQp_ew0i_3WH-l7Wcwvx9WYviixFXZ-GsY27nN0xWzGSz6E3fnY49PE2cBpCCE3bjKcF_jO61u_nxucf1QYQ8Xol1DkXeBMu5h7Z3uY8XpbvhnvHnlVWABZ3torlmyypZGyS5FeJzuDrl2kuZeKbjjgc29b4eC7TNdg.zMlIpuDNHciGircUD-ygUc9bTYa_JbnfONxoWmwXzXg&dib_tag=se&keywords=lebesgue&qid=1712263227&sprefix=lebesgu%2Caps%2C154&sr=8-1',
            likes: 19
        }

        await api
            .post('/api/blogs')
            .set('Authorization', token) 
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const newResponse = await api.get('/api/blogs').set('Authorization', token) 
        
        assert.strictEqual(newResponse.body.length, response.body.length+1)
        assert(newResponse.body.map(x=>x.author).includes('Gail S. Nelson'), true)
    })

    // Tests that likes defaults to 0
    test('a blog with no likes field defaults to 0', async () => {
        const newBlog = {
            title: 'Galois Theory Through Exercises',
            author: 'Juliusz Brzeziński ',
            url: 'https://www.amazon.com/Through-Exercises-Springer-Undergraduate-Mathematics/dp/3319723251/ref=sr_1_2?crid=3EH98277P9DMD&dib=eyJ2IjoiMSJ9.9YHYqHFt4z_exI3tVJtz-p2uC9GoSoOKWY7dXe0H0u-CmKV5fnthrHY3DJOr-8J6T_mwSDxNSN39_Vbb0NhnIQxrkjgbRnCNxWqlUYeTjBC7tiSwVpimkWZV5SvnCsvrzKAKWWzdxnpkWwHx-XwIXyJKdCaoruUuqJBuPonDJtgQApU_7lQNZaAMSgp1IGClU7JcpTMjphHzKkcBzNleNccUYepjWhe98i3O1Dww9PPJz1SozAhKmDfuJSu-FAhZXSRzLvNtyG--WrNs5NMqphvOBU4J4hrzcSWK-2h6XN8.TpzEcoJGwfl3TSVVQaMb5Vk9ccaGjauO2ptLtbLXDG4&dib_tag=se&keywords=galois&qid=1712263942&sprefix=galo%2Caps%2C183&sr=8-2',
        }

        await api
            .post('/api/blogs')
            .set('Authorization', token) 
            .send(newBlog)
            .expect(201)
            .expect('Content-Type', /application\/json/)
        
        const response = await api.get('/api/blogs').set('Authorization', token) 
        const newestBlog = response.body.find(x => x.title === 'Galois Theory Through Exercises')

        assert.strictEqual(newestBlog.likes, 0)
    })

    // Test that url and title fields are defined
    test('a blog with no title or url causes response code 400', async () => {
        const newBlog = {
            title: 'A Course on Group Theory',
            author: 'John S. Rose',
            likes: 30
        }

        await api
            .post('/api/blogs')
            .set('Authorization', token) 
            .send(newBlog)
            .expect(400)

        const secondBlog = {
            author: 'John S. Rose',
            url: 'https://www.amazon.com/Course-Group-Theory-Dover-Mathematics/dp/0486681947/ref=sr_1_2?crid=MIRD1MBY256E&dib=eyJ2IjoiMSJ9.dIyDyKpArf2bXkhGED6GoMQ6POMBMjEuq7gO9wsxs9vD3SUlLKeciE1Evz9Yq-Yq4ljh4MI4M3Yiq7KXCly5ChRbKap8fYjhx6z65FRNGnzgPj9sGEd0zx3YD7X90jwm16mRnqM59JTvPrUREJezyfbWJvctB-19tIkiYehyXP_tv_VWwpFzWgAjm08jHFGAaDU3LnjEP12gPC09X5t6JCknSFfuqFONekKhcX27AterKQJBBC9zOCmyleUIoKUDo-zAufyZqb1bFMGM5hVwEDQqdou4kyDf-Qmxb71WOwc.hf0P0nJWl1zlDeZynOp7vwLnq5KLAUK-cI-vujBAeCw&dib_tag=se&keywords=group+theory&qid=1712264743&sprefix=group+theor%2Caps%2C156&sr=8-2',
            likes: 30
        }

        await api
            .post('/api/blogs')
            .set('Authorization', token) 
            .send(secondBlog)
            .expect(400)
    })

    // Test that blogs can be deleted
    test('a blog can be deleted', async () => {
        const response = await api.get('/api/blogs').set('Authorization', token) 
        const blogId = response.body.map(x => x.id)[0]
        await api
            .delete(`/api/blogs/${blogId}`)
            .set('Authorization', token) 
            .expect(204)

        const responseAfterDelete = await api.get('/api/blogs').set('Authorization', token) 
        const blogIdAfterDelete = responseAfterDelete.body.map(x => x.id)[0]
        
        assert(blogId !== blogIdAfterDelete)
        assert.strictEqual(responseAfterDelete.body.length, response.body.length-1)
    })

    // Test that blog's like field can be updated
    test('a blogs like field can be updated', async () => {
        const response = await api.get('/api/blogs').set('Authorization', token) 
        const blog = response.body[0]
        const blogId = blog.id

        const newBlog = {
            title: blog.title,
            author: blog.author,
            url: blog.url,
            likes: (80 + blog.likes*40 % 32)
        }
        
        await api
            .put(`/api/blogs/${blogId}`)
            .set('Authorization', token) 
            .send(newBlog)
            .expect('Content-Type', /application\/json/)

        const responseAfterUpdate = await api.get('/api/blogs').set('Authorization', token) 
        const blogLikesAfterUpdate = responseAfterUpdate.body.find(x => x.id === blogId).likes
        
        assert.strictEqual(blogLikesAfterUpdate, newBlog.likes)
    })

       // Test that absence of token causes 401
       test('having no token causes 401', () => {
        const newBlog = {
            title: 'A User-friendly Introduction to Lebesgue Measure and Integration',
            author: 'Gail S. Nelson',
            url: 'https://www.amazon.com/User-friendly-Introduction-Lebesgue-Integration-Mathematical/dp/1470421992/ref=sr_1_1?crid=1RVWPZ5JOAYYB&dib=eyJ2IjoiMSJ9.Pf2W-q52pJb8SDsIA84BszFIl--JGdKRnG_HYeZipRtMbdYV7eZ_BOpfwi-NypcU1cII91HNeQp_ew0i_3WH-l7Wcwvx9WYviixFXZ-GsY27nN0xWzGSz6E3fnY49PE2cBpCCE3bjKcF_jO61u_nxucf1QYQ8Xol1DkXeBMu5h7Z3uY8XpbvhnvHnlVWABZ3torlmyypZGyS5FeJzuDrl2kuZeKbjjgc29b4eC7TNdg.zMlIpuDNHciGircUD-ygUc9bTYa_JbnfONxoWmwXzXg&dib_tag=se&keywords=lebesgue&qid=1712263227&sprefix=lebesgu%2Caps%2C154&sr=8-1',
            likes: 19
        }
        // TBD
    })
})

after(async () => {
    await mongoose.connection.close()
})