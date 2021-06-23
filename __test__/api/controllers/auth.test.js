const should = require('should'),
    request = require('supertest'),
    app = require('../../../src/app');

let model = require('../helpers/test.model.json');

let token;
let userId;
let user = model.user


describe('POST /register', () => {

    let { name_surname, ...userWithoutName } = user;

    test('It should require a name_surname', (done) => {
        return request(app)
            .post('/register')
            .send(userWithoutName)
            .then((res) => {
                expect(res.statusCode).toBe(422);
                done();
            });
    });


    let { email, ...userWithWrongEmail } = user;
    userWithWrongEmail = { ...userWithWrongEmail, email: 'mjiyan' };

    test('It should require a valid email', (done) => {
        return request(app)
            .post('/register')
            .send(userWithWrongEmail)
            .then((res) => {
                expect(res.statusCode).toBe(422);
                done();
            });
    });



    let { password, ...userWithWrongPass } = user;
    userWithoutPass = { ...userWithWrongPass, password: '123' };

    test('It should require a valid password', (done) => {
        return request(app)
            .post('/register')
            .send(userWithoutPass)
            .then((res) => {
                expect(res.statusCode).toBe(422);
                done();
            });
    });

    test('It should register a new user', (done) => {
        return request(app)
            .post('/register')
            .send(user)
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
                done();
                userId = res.body.id;
            });
    });

    test('It should require an unique email', (done) => {
        return request(app)
            .post('/register')
            .send(user)
            .then((res) => {
                expect(res.statusCode).toBe(500);
                done();
            });
    });
});


describe('POST /signin', () => {
    test('It should require exist user', (done) => {
        return request(app)
            .post('/signin')
            .send({ email: '2S4WmNj0nq.eMbEX7eR0h@mail.com', password: 'user.password' })
            .then((res) => {
                expect(res.statusCode).toBe(401);
                done();
            });
    });

    test('A user should be logs in', (done) => {
        return request(app)
            .post('/signin')
            .send({ email: user.email, password: user.password })
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
                token = res.body.token;
                done();
            });
    });
});

describe('POST /signout', () => {
    test('It should require exist id ', (done) => {
        return request(app)
            .post('/signout')
            .send({ id: '111111111111111111111111' })
            .then((res) => {
                expect(res.statusCode).toBe(404);
                done();
            });
    });

    test('A user should be logs out', (done) => {
        return request(app)
            .post('/signout')
            .send({ id: userId })
            .then((res) => {
                expect(res.statusCode).toBe(200);
                expect(res.type).toBe('application/json');
                token = res.body.token;
                done();
            });
    });
});
