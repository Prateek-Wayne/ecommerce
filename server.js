import http from 'http';
import app from './app/app.js';

const PORT=process.env.PORT||7000;
const server = http.createServer(app);
server.listen(PORT,console.log(`Server is starting at PORT ${PORT}`));
