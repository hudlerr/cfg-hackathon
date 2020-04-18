const test = require('tape');
const request = require('supertest');
const app = require('../server/routes/handler');

test('All routes should return the expected results', (t) => {
    request(app)
        .get('/')
        .expect(200)
        .expect('Content-Type', /html/)
        .end((err, res) => {
            t.error(err);
            t.end();
        });
});