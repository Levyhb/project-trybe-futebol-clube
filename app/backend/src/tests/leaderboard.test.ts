import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;


describe('Testes de integração da rota /leaderboard', () => {
  let chaiHttpResponse: Response;
  it('Deve retornar a classificação dos times como mandantes com sucesso.', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/leaderboard/home')

    expect(chaiHttpResponse).to.have.status(200);
  });

  it('Deve retornar a classificação dos times como visitantes com sucesso.', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/leaderboard/away')

    expect(chaiHttpResponse).to.have.status(200);
  });

  it('Deve retornar a classificação geral dos times com sucesso.', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .get('/leaderboard')

    expect(chaiHttpResponse).to.have.status(200);
  });
})