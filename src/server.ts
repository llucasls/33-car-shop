import App from './app';
import { Car } from './interfaces/CarInterface';
import CarController from './controllers/car';
import CustomRouter from './routes';
import errorHandler from './middlewares/ErrorHandler';
import notFoundHandler from './middlewares/NotFoundHandler';

const server = new App();

const carController = new CarController();

const carRouter = new CustomRouter<Car>();
carRouter.addRoute(carController);

server.addRouter(carRouter.router);

server.handleError(errorHandler);
server.handleError(notFoundHandler);

export default server;
