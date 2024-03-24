import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express, { type Express } from 'express';
import winston from 'winston';
import { connectDB } from './config/DBconnect';
import adminRoutes from './routes/admin.routes';
import authRouter from './routes/auth.routes';
import { authenticate, authorizeAdmin } from './middlewares/auth.middleware';
import commonRoutes from './routes/common.routes';
import nodemailer from 'nodemailer';

config();

export const app: Express = express();
//Hello world
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.use(cookieParser());
app.use(
  cors({
    origin: 'http://localhost:3000',
    credentials: true,
  }),
);

app.use(express.json());

const port = process.env.PORT ?? 4001;

app.use('/api/common', authenticate, commonRoutes);
app.use('/api/admin', authenticate, authorizeAdmin, adminRoutes);
app.use('/api/auth', authRouter);

// Start the server after connecting to the database
connectDB();

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  transports: [
    new winston.transports.File({
      filename: 'errors.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.simple(),
      ),
    }),
  ],
});
