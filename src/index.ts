import server from './server';

const port = process.env.PORT || 3001;

server.startServer(port);
