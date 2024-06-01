import cors from 'cors';
import path from 'path';
import morgan from 'morgan';
import helmet from 'helmet';
import cookieParser from 'cookie-parser';
import express, { Application } from 'express';
import ratelimitter from 'express-rate-limit';

import prisma from './models/db.model';
import userRoute from './routes/user.routes';
import statusRoute from './routes/status.routes';
import errorHandler from './errors/errorHandler';
import { NODE_ENV, PORT, ALLOW_ORIGIN } from './config/keys';

let dbStatus = { connected: false };
const app: Application = express();
const isLocal = NODE_ENV === 'development';

const limiter = ratelimitter({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100,
});

const corsOptions = {
  origin: isLocal ? ALLOW_ORIGIN : undefined,
  credentials: isLocal ? true : false,
};

app.use(
  helmet.contentSecurityPolicy({
    useDefaults: true,
    directives: {
      'img-src': ["'self'", 'https: data:'],
    },
  })
);

app.use(limiter);

app.use(cors(corsOptions));
app.use(morgan(isLocal == true ? 'dev' : 'tiny'));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/api', statusRoute);
app.use('/api', userRoute);

app.use(express.static(path.join(__dirname, '..', '..', '..', 'client', 'build')));
app.get('*', (req, res) =>
  res.sendFile(path.join(__dirname, '..', '..', '..', 'client', 'build', 'index.html'))
);

/*
user for production docker build (make sure to add the build folder to the server folder)

app.use(express.static(path.join(__dirname, '..', '..', 'build')));
app.get('*', (req, res) => res.sendFile(path.join(__dirname, '..', '..', 'build', 'index.html')));
**/

app.use(errorHandler);

async function connectToDatabase() {
  prisma
    .$connect()
    .then(() => {
      console.log('\nDatabase is connected');
      dbStatus.connected = true;
    })
    .catch((error) => console.error('Error connecting to the database:', error));
}

export default dbStatus;
export { app, PORT, connectToDatabase };
