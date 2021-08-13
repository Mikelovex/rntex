import 'reflect-metadata';
import cors from 'cors';
import express, { NextFunction, Response, Request } from 'express';

import { AppError } from '../../errors/AppError';
import createConnection from '../database/index';
import 'express-async-errors';
import { router } from './routes/index';

import '../../container/index';

createConnection();
const app = express();

app.use(cors());

app.use(express.json());

app.use(router);

app.use(
    (err: Error, request: Request, response: Response, next: NextFunction) => {
        if (err instanceof AppError) {
            return response.status(err.statusCode).json({
                message: err.message,
            });
        }

        return response.status(500).json({
            status: 'error',
            message: `internal server error - ${err.message}`,
        });
    },
);

app.listen(3333, () => console.log('Server is running...'));
