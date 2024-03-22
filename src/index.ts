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

const app: Express = express();

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
connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((error: Error) => {
    console.error('Failed to start the server', error.message);
    process.exit(1);
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
