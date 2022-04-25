import Sinon, { SinonStub } from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import { Request, Response, NextFunction } from 'express';
import CarController from '../../../controllers/car';
import CarService from '../../../services/car';
import * as service from '../../mocks/car-service';
import { create as mustang } from '../../mocks/car-service';

chai.use(chaiHttp);

const { expect } = chai;

// const sandbox = createSandbox();

describe('Testa camada de controladores', () => {
  const carService = new CarService();
  const res = {} as unknown as Response;
  res.json = Sinon.stub().returns(mustang);
  const req = {
    body: mustang,
  } as Request;
  res.status = Sinon.stub().returns(res);
  const next = Sinon.stub() as unknown as NextFunction;

  before(async () => {
    Sinon
      .stub(carService, 'create')
      .resolves(mustang);
  });

  after(() => {
    Sinon.restore();
  })

  it('Deve ser possível cadastrar um carro com sucesso', async () => {
    const carController = new CarController(carService);
    await carController.create(req, res);
    expect((res.status as SinonStub).calledWith(201)).to.be.true
  });

});
