import { hash } from 'bcryptjs';
import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { IUsersRepository } from '../../repositories/IUserRepository';

@injectable()
class CreateUserService {
    constructor(
        @inject('UsersRepository')
        private usersRepository: IUsersRepository,
    ) {}

    async executa({
        name,
        email,
        password,
        driver_license,
    }: ICreateUserDTO): Promise<void> {
        const usersExists = await this.usersRepository.findByEmail(email);

        if (usersExists) {
            throw new AppError('User already exists');
        }

        const passwordHash = await hash(password, 8);

        await this.usersRepository.create({
            name,
            email,
            password: passwordHash,
            driver_license,
        });
    }
}

export { CreateUserService };
