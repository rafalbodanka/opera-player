import { expect } from 'chai';
import request from 'supertest';
import app from './server.js';

describe('GET /get-audio/:id', () => {
    it('should return a valid audio file', async () => {
        const res = await request(app).get('/get-audio/1');
        // You can add more assertions based on your application's behavior
        expect(res.status).to.equal(200);
        expect(res.header['content-type']).to.equal('audio/mpeg');
    });

    it('should return 404 for an invalid audio file ID', async () => {
        const res = await request(app).get('/get-audio/invalid');
        expect(res.status).to.equal(404);
    });
});

describe('GET /get-image/:id', () => {
    it('should return a valid image file', async () => {
        const res = await request(app).get('/get-image/1');
        // You can add more assertions based on your application's behavior
        expect(res.status).to.equal(200);
        expect(res.header['content-type']).to.equal('image/png');
    });

    it('should return 404 for an invalid image file ID', async () => {
        const res = await request(app).get('/get-image/invalid');
        expect(res.status).to.equal(404);
    });
});

describe('GET /data', () => {
    it('should return JSON data', async () => {
        const res = await request(app).get('/data');
        // You can add more assertions based on your application's behavior
        expect(res.status).to.equal(200);
        expect(res.header['content-type']).to.equal('application/json; charset=utf-8');
    });
});