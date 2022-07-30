import App from './app';
import { Car } from './interfaces/CarInterface';
import { Motorcycle } from './interfaces/MotorcycleInterface';
import CarController from './controllers/car';
import MotorcycleController from './controllers/motorcycle';
import CustomRouter from './routes';
import errorHandler from './middlewares/ErrorHandler';
import notFoundHandler from './middlewares/NotFoundHandler';

const server = new App();

const carController = new CarController();
const motorcycleController = new MotorcycleController();

const carRouter = new CustomRouter<Car>();
const motorcycleRouter = new CustomRouter<Motorcycle>();

carRouter.addRoute(carController);
motorcycleRouter.addRoute(motorcycleController);

server.addRouter(carRouter.router);
server.addRouter(motorcycleRouter.router);

server.handleError(errorHandler);
server.handleError(notFoundHandler);

export default server;
