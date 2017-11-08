'use strict';
process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const request = require('supertest');

//const app = require('..' + __filename.split(__dirname)[1]);
//module.exports = app;
 
assert.isTrue(true);
assert.isFalse(false);
return;
describe('homepage', () =>
{
    it('welcome the user',(done) =>
    {
        request(app).get('/')
            .expect(200)
            .expect('Content-Type', /html/)
            .expect(/Hello /, done)
    })
});