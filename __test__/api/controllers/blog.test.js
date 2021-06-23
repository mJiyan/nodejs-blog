const should = require('should'),
    request = require('supertest'),
    app = require('../../../src/app');

let model = require('../helpers/test.model.json');

let token;
let blogId;

const user = model.user;
let blog = model.blog;


describe('POST /blogs', () => {
    beforeAll((done) => {
        request(app)
            .post('/signin')
            .send({
                email: user.email, password: user.password
            })
            .end((err, res) => {
                token = res.body.token;
                blog.user_id = res.body.id;
                done();
            });
    });

    const { title, ...blogWithoutTitle } = blog;

    test('It should require a title', (done) => {
        return request(app)
            .post('/blogs')
            .send(blogWithoutTitle)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(500);
                done();
            });
    });

    test('It should require authorization', (done) => {
        return request(app)
            .post('/blogs')
            .send(blog)
            .then((res) => {
                expect(res.statusCode).toBe(401);
                done();
            });
    });

    test('It should create a new blog', (done) => {
        return request(app)
            .post('/blogs')
            .send(blog)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
                blogId = res.body.id;
                done();
            });
    });
});


describe('GET /blogs', () => {
    test('It should require authorization', () => {
        return request(app)
            .get('/blogs')
            .then((res) => {
                expect(res.statusCode).toBe(401);
            });
    });

    test('It should responds with JSON Array', () => {
        return request(app)
            .get('/blogs')
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
            });
    });
});



describe('GET /blog/:id', () => {

    test('It should require authorization', () => {
        return request(app)
            .get(`/blog/${blogId}`)
            .then((res) => {
                expect(res.statusCode).toBe(401);
            });
    });

    test('It should responds with JSON', () => {
        return request(app)
            .get(`/blog/${blogId}`)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
            });
    });
});


describe('PUT /blog/:id', () => {
    test('It should require authorization', () => {
        return request(app)
            .put(`/blog/${blogId}`)
            .send({ title: 'False Alarm', isPublished: false })
            .then((res) => {
                expect(res.statusCode).toBe(401);
            });
    });

    test('It should update the blog title and isPublished', () => {
        return request(app)
            .put(`/blog/${blogId}`)
            .send({ title: 'False Alarm', isPublished: false })
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
            });
    });
});


describe('DELETE /blog/:id', () => {
    test('It should require authorization', () => {
        return request(app)
            .delete(`/blog/${blogId}`)
            .then((res) => {
                expect(res.statusCode).toBe(401);
            });
    });

    test('It should require exist id', () => {
        return request(app)
            .delete(`/blog/111111111111111111111111`)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(404);
            });
    });


    test('It should remove the blog', () => {
        return request(app)
            .delete(`/blog/${blogId}`)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
            });
    });

});