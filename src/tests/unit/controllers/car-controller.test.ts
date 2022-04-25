import { createSandbox } from 'sinon';
import chai from 'chai';
import chaiHttp = require('chai-http');
import CarController from '../../../controllers/car';
import CarService from '../../../services/car';
import * as service from '../../mocks/car-service';

chai.use(chaiHttp);

const { expect } = chai;

const sandbox = createSandbox();

describe('Testa camada de controladores', () => {

  before(async () => {
    sandbox
      .stub(CarService.prototype, 'create')
      .resolves(service.create as any);
  });

  after(() => {
    sandbox.restore();
  })

  it('Deve ser possível cadastrar um carro com sucesso', async () => {
    const carService = new CarService();
    const carController = new CarController(carService);
    const response = await carController.create()
  });

});
