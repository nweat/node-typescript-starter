import app from '../server';
import request from 'supertest';

describe('v1', () => {
  it('GET /v1/user/21 - should respond with a 200', (done) => {
    request(app).get('/v1/user/21').set('Accept', 'application/json').expect('Content-Type', /json/).expect(200, done);
  });
});
