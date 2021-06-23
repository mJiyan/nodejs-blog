const should = require('should'),
    request = require('supertest'),
    app = require('../../../src/app');


let token;
let userId;

const user = {
    email: 'mjiyan@mail.com',
    password: 'pass123123',
};

describe('GET /users', () => {
    beforeAll((done) => {
        request(app)
            .post('/signin')
            .send({
                email: user.email, password: user.password
            })
            .end((err, res) => {
                token = res.body.token;
                userId = res.body.id;
                done();
            });
    });

    test('It should require authorization', (done) => {
        return request(app)
            .get(`/users`)
            .then((res) => {
                expect(res.statusCode).toBe(401);
                done();
            });
    });

    test('It should list users', (done) => {
        return request(app)
            .get(`/users`)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
                done();
            });
    });
});



describe('DELETE /user/:id', () => {

    test('It should require authorization', (done) => {
        return request(app)
            .delete(`/user/${userId}`)
            .then((res) => {
                expect(res.statusCode).toBe(401);
                console.log('USERID: ', userId);
                done();
            });
    });

    test('It should require exist id', (done) => {
        return request(app)
            .delete(`/user/111111111111111111111111`)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(404);
                done();
            });
    });

    test('It should remove an user', (done) => {
        return request(app)
            .delete(`/user/${userId}`)
            .set('Authorization', `Bearer ${token}`)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
                done();
            });
    });

});
