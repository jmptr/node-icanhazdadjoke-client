import nock from 'nock';
import { ICanHazDadJokeClient } from '../';

describe('ICanHazDadJokeClient', () => {
  let scope: nock.Scope = null;
  let instance: ICanHazDadJokeClient = null;

  beforeAll(() => {
    instance = new ICanHazDadJokeClient();
    instance.client.defaults.adapter = require('axios/lib/adapters/http');
  });

  beforeEach(() => {
    scope = nock(instance.client.defaults.baseURL);
  });

  afterEach(() => {
    expect(scope.isDone()).toBe(true);
  });

  describe('getRandomJoke', () => {
    it('triggers intercept', async (done) => {
      scope.intercept('/', 'GET').reply(200);
      await instance.getRandomJoke();
      done();
    });
  });
  
  describe('getJokeById', () => {
    it('triggers intercept', async (done) => {
      scope.intercept('/j/123', 'GET').reply(200);
      await instance.getJokeById('123');
      done();
    });
  });

  describe('search', () => {
    it('triggers intercept', async (done) => {
      scope.intercept('/search?term=example', 'GET').reply(200);
      await instance.search(null, null, 'example');
      done();
    });
  });

});
