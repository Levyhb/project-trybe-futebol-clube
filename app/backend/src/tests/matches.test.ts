import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const newMatchMock = {
  homeTeamId: 16,
  awayTeamId: 8,
  homeTeamGoals: 2,
  awayTeamGoals: 2
}

const tokenMock = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJkYXRhIjp7ImlkIjoxLCJ1c2VybmFtZSI6IkFkbWluIiwicm9sZSI6ImFkbWluIiwiZW1haWwiOiJhZG1pbkBhZG1pbi5jb20iLCJwYXNzd29yZCI6IiQyYSQwOCR4aS5IeGsxY3pBTzBuWlIuLkIzOTN1MTBhRUQwUlExTjNQQUVYUTdIeHRMaktQRVpCdS5QVyJ9LCJpYXQiOjE2NzQ2Nzc3OTEsImV4cCI6MTY3NTI4MjU5MX0.J_JigT6QfEzhrIDQ0XEt8tTF1yeX5gYClUA6cuSWmGw"


describe('Testes de integração da rota /matches', () => {
  let chaiHttpResponse: Response;

  it('É possível fazer uma requisição na rota GET /matches com sucesso', async () => { 
    const getAllMatches = chaiHttpResponse = await chai
    .request(app)
    .get('/matches')

    expect(getAllMatches).to.have.status(200);
  })
  
    it('É possível fazer uma requisição na rota GET /matches?inProgress=true, retornando todas as partidas em progresso', async () => {
      const getAllMatchesInProgress = chaiHttpResponse = await chai
      .request(app)
      .get('/matches?inProgress=true')
  
      expect(getAllMatchesInProgress).to.have.status(200);
    })

  it('É possível adicionar uma nova partida com sucesso', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/matches')
    .set('authorization', tokenMock)
    .send({
      homeTeamId: newMatchMock.homeTeamId,
      awayTeamId: newMatchMock.awayTeamId,
      homeTeamGoals: newMatchMock.homeTeamGoals,
      awayTeamGoals: newMatchMock.awayTeamGoals,
    })

    expect(chaiHttpResponse).to.have.status(201);
  })

  it('É possível finalizar uma partida em andamento com sucesso.', async () => { 
    chaiHttpResponse = await chai
    .request(app)
    .patch('/matches/41/finish')

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body.message).to.eql('Finished');
  })

  it('É possível atualizar uma partida em andamento com sucesso.', async () => { 
    chaiHttpResponse = await chai
    .request(app)
    .patch('/matches/41')
    .send({ homeTeamGoals: newMatchMock.homeTeamGoals, awayTeamGoals: newMatchMock.homeTeamGoals })

    expect(chaiHttpResponse).to.have.status(200);
    expect(chaiHttpResponse.body.message).to.eql('updated match');
  })
})