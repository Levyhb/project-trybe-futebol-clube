import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');
import { app } from '../app';
import { Response } from 'superagent';

chai.use(chaiHttp);

const { expect } = chai;

const adminUser = {
  username: 'Admin',
  role: 'admin',
  email: 'admin@admin.com',
  password: 'secret_admin',
};

const tokenDecoded = {role: 'admin'};

describe('Testes de integração da rota de login', () => {
  let chaiHttpResponse: Response;

  it('É possível fazer o login com sucesso, retornando um token', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: adminUser.email, password: adminUser.password });

    expect(chaiHttpResponse).to.have.status(200);
  })

  it('Se um dos campos nao forem preenchidos deverá retornar um erro', async () => {
    chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ password: adminUser.password });

    expect(chaiHttpResponse).to.have.status(400);
  })

  it('Deverá retornar um erro se o usuário nao existir', async () => {
    const chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: 'aloha@aloha.com', password: 'aloha123' });

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body.message).to.eql('Incorrect email or password');
  })

  it('deverá retornar um erro se a senha do usuário estiver incorreta', async () => {
    const chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: adminUser.email, password: 'aloha123' });

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body.message).to.eql('Incorrect email or password');
  })

  it('deverá retornar um erro se a senha do usuário estiver incorreta', async () => {
    const chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: adminUser.email, password: 'aloha123' });

    expect(chaiHttpResponse).to.have.status(401);
    expect(chaiHttpResponse.body.message).to.eql('Incorrect email or password');
  })

  it('Deverá validar o login com sucesso, retornando a propriedade "role".', async () => {
    const chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: adminUser.email, password: adminUser.password });

    const validateLogin = await chai
    .request(app)
    .get('/login/validate')
    .send()
    .set('authorization', chaiHttpResponse.body.token);

    expect(validateLogin).to.have.status(200);
    expect(validateLogin.body).to.have.property('role');
  })

  it('Deve retornar um erro caso o token seja inválido', async () => {
    const chaiHttpResponse = await chai
    .request(app)
    .post('/login')
    .send({ email: adminUser.email, password: adminUser.password });

    const validateLogin = await chai
    .request(app)
    .get('/login/validate')
    .send()
    .set('authorization', 'token_errado');

    expect(validateLogin).to.have.status(400);
    expect(chaiHttpResponse.body.message).to.eql('Invalid token');
  })
})