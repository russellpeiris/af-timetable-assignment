import cookieParser from 'cookie-parser';
import cors from 'cors';
import { config } from 'dotenv';
import express, { type Express } from 'express';
import winston from 'winston';
import { connectDB } from './config/DBconnect';
import { authenticate, authorizeAdmin } from './middlewares/auth.middleware';
import adminRoutes from './routes/admin.routes';
import authRouter from './routes/auth.routes';
import commonRoutes from './routes/common.routes';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';

config();

export const app: Express = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  limit: 100, // Limit each IP to 100 requests per `window` (here, per 15 minutes).
  standardHeaders: 'draft-7', // draft-6: `RateLimit-*` headers; draft-7: combined `RateLimit` header
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers.
});
app.use(
  helmet({
    xssFilter: true, // Enable XSS filter
    frameguard: { action: 'deny' }, // Prevent Clickjacking
  }),
);

app.use(limiter);
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
      console.log(`Server running on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    logger.error(error.message);
    console.log(error.message);
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
