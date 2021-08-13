import { NextFunction, Request, Response } from 'express';
import { verify } from 'jsonwebtoken';

import { UsersRepository } from '../../../../modules/accounts/infra/typeorm/repositories/UsersRepository';
import { AppError } from '../../../errors/AppError';

interface IPayload {
    sub: string;
}

export async function ensureAuthenticated(
    req: Request,
    res: Response,
    next: NextFunction,
): Promise<void> {
    const authheader = req.headers.authorization;

    if (!authheader) {
        throw new AppError('Token is missing', 401);
    }

    const [, token] = authheader.split(' ');

    try {
        const { sub: user_id } = verify(
            token,
            'ncjuygcavvhlslçznxucgebxhdsvryi',
        ) as IPayload;

        const usersRepository = new UsersRepository();

        const user = usersRepository.findById(user_id);

        if (!user) {
            throw new AppError('User does not exists', 401);
        }

        req.user = {
            id: user_id,
        };

        next();
    } catch {
        throw new AppError('invalid token', 401);
    }
}
