import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const teamsMock = [
  {
    id: 1,
    teamName: "Avaí/Kindermann"
  },
  {
    id: 2,
    teamName: "Bahia"
  },
  {
    id: 3,
    teamName: "Botafogo"
  },
]

const teamById = {
    id: 2,
    teamName: "Bahia"
  }

describe('Teste de integração da rota de teams', () => {
  let chaiHttpResponse: Response;

  it('É possível fazer uma requisição na rota GET /teams com sucesso', async () => {
    const getAllTeams = chaiHttpResponse = await chai
    .request(app)
    .get('/teams')

    expect(getAllTeams).to.have.status(200)
  })

  it('É possível fazer uma requisição na rota GET /teams/:id com sucesso retornando o time com o id passado como parâmetro', async () => {
    const getTeam = chaiHttpResponse = await chai
    .request(app)
    .get('/teams/2')

    expect(getTeam).to.have.status(200)
    expect(chaiHttpResponse.body).to.eql(teamById)
  })
})