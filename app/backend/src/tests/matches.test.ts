import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';
import matchesMock from './mock/matches.mock';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testes de integração da rota /matches', () => {
  let chaiHttpResponse: Response;

  it('É possível fazer uma requisição na rota GET /matches com sucesso', async () => { 
    const getAllMatches = chaiHttpResponse = await chai
    .request(app)
    .get('/matches')

    expect(getAllMatches).to.have.status(200);
  })

  it('É possível fazer uma requisição na rota GET /matches?inProgress=true com sucesso', async () => {
    const getAllMatchesInProgress = chaiHttpResponse = await chai
    .request(app)
    .get('/matches?inProgress=true')

    expect(getAllMatchesInProgress).to.have.status(200);
  })
})