'use strict';
process.env.NODE_ENV = 'test';

const assert = require('chai').assert;
const request = require('supertest');

const app = require('..' + __filename.split(__dirname)[1]);
 
assert.isTrue(true);
assert.isFalse(false);

//return;
describe('homepage', () =>
{
    it('check Socket.IO chat',(done) =>
    {
        request(app).get('/')
            .expect(200)
            .expect('Content-Type', /html/)
            .expect(/Socket.IO chat/, done)
    });

    it('check chat client JS',(done) => {
        request(app).get('/p/chatClient.js')
        .expect(200)
        .expect('Content-Type', /javascript/)
        .expect(/socket/)
        .expect(/class Channel/)
        .end(done)
    });

    it('check css',(done) => {
        request(app).get('/p/chatWindow.css')
        .expect(200)
        .expect('Content-Type', /css/)
        .expect(/body/)
        .end(done)
    });
});


describe('connect trough socket', () =>
{
    it('connect',(done) =>
    {
        request(app).get('/')
            .expect(200)
            .expect('Content-Type', /html/)
            .expect(/Socket.IO chat/, done)
    })
});