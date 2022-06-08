import { inject, injectable } from 'tsyringe';

import { AppError } from '../../../../shared/errors/AppError';
import { ICreateCarDto } from '../../dtos/ICreateCarDTO';
import { Car } from '../../infra/typeorm/entities/Car';
import { ICarsRepository } from '../../repositories/ICarsRepository';


@injectable()
class CreateCarService {
    constructor(
        @inject('CarsRepository')
        private carsRepository: ICarsRepository,
    ) { }

    async execute({
        name,
        description,
        daily_rate,
        license_plate,
        fine_amount,
        brand,
        category_id,
        specifications
    }: ICreateCarDto): Promise<Car> {
        const carAlreadyExists = await this.carsRepository.findByLicensePlate(
            license_plate,
        );

        if (carAlreadyExists) {
            throw new AppError('Car already exists!');
        }

        const car = await this.carsRepository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications
        });

        return car;
    }

}

export { CreateCarService };
