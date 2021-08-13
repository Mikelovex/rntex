import { AppError } from '../../../../shared/errors/AppError';
import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { CreateCarService } from './CreateCarService';

let createCarService: CreateCarService;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('Create Car', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        createCarService = new CreateCarService(carsRepositoryInMemory);
    });
    it('should be able to create a new car', async () => {
        const car = await createCarService.execute({
            name: 'name car',
            description: 'description car',
            daily_rate: 100,
            license_plate: 'abc-1234',
            fine_amount: 60,
            brand: 'brand',
            category_id: 'category',
        });

        expect(car).toHaveProperty('id');
    });

    it('should not be able to create a car with exist license plate', async () => {
        expect(async () => {
            await createCarService.execute({
                name: 'name car1',
                description: 'description car',
                daily_rate: 100,
                license_plate: 'abc-1234',
                fine_amount: 60,
                brand: 'brand',
                category_id: 'category',
            });

            await createCarService.execute({
                name: 'name car2',
                description: 'description car',
                daily_rate: 100,
                license_plate: 'abc-1234',
                fine_amount: 60,
                brand: 'brand',
                category_id: 'category',
            });
        }).rejects.toBeInstanceOf(AppError);
    });

    it('should not be able to create a car with available true by default', async () => {
        const car = await createCarService.execute({
            name: 'name available',
            description: 'description car',
            daily_rate: 100,
            license_plate: 'abcd-1234',
            fine_amount: 60,
            brand: 'brand',
            category_id: 'category',
        });

        expect(car.available).toBe(true);
    });
});
