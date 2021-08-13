import { AppError } from '../../../../shared/errors/AppError';
import { ICreateUserDTO } from '../../dtos/ICreateUserDTO';
import { UsersRepositoryInMemory } from '../../repositories/in-memory/UsersRepositoryInMemory';
import { CreateUserService } from '../CreateUser/CreateUserService';
import { AuthenticateUserService } from './AuthenticateUserService';

let authenticateUserService: AuthenticateUserService;
let usersRepositoryInMemory: UsersRepositoryInMemory;
let createUserService: CreateUserService;

describe('Authenticate User', () => {
    beforeEach(() => {
        usersRepositoryInMemory = new UsersRepositoryInMemory();
        authenticateUserService = new AuthenticateUserService(
            usersRepositoryInMemory,
        );
        createUserService = new CreateUserService(usersRepositoryInMemory);
    });
    it('should be able to authenticate an user', async () => {
        const user: ICreateUserDTO = {
            driver_license: '000123',
            email: 'user@email.com',
            password: '1234',
            name: 'User test',
        };
        await createUserService.executa(user);

        const result = await authenticateUserService.execute({
            email: user.email,
            password: user.password,
        });

        expect(result).toHaveProperty('token');
    });

    it('should not be able to authenticate an nonexistent user', () => {
        expect(async () => {
            await authenticateUserService.execute({
                email: 'dsd',
                password: 'dsadas',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to authenticate with incorrect password', () => {
        expect(async () => {
            const user: ICreateUserDTO = {
                driver_license: '999',
                email: 'user@dssds.com',
                password: '1234',
                name: 'User test error',
            };

            await createUserService.executa(user);

            await authenticateUserService.execute({
                email: user.email,
                password: 'dsdas',
            });
        }).rejects.toBeInstanceOf(AppError);
    });
});
