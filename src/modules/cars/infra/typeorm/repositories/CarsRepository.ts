import { getRepository, Repository } from 'typeorm';

import { ICreateCarDto } from '../../../dtos/ICreateCarDTO';
import { ICarsRepository } from '../../../repositories/ICarsRepository';
import { Car } from '../entities/Car';

class CarsRepository implements ICarsRepository {
    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({
        brand,
        category_id,
        daily_rate,
        description,
        fine_amount,
        license_plate,
        name,
        id
    }: ICreateCarDto): Promise<Car> {
        const car = this.repository.create({
            brand,
            category_id,
            daily_rate,
            description,
            fine_amount,
            license_plate,
            name,
            id
        });

        await this.repository.save(car);

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({
            license_plate,
        });

        return car;
    }

    async findAvailable(
        brand?: string,
        category_id?: string,
        name?: string,
    ): Promise<Car[]> {
        console.log('brand', brand)
        const carsQuery = this.repository
            .createQueryBuilder('c')
            .where("available = :available", { available: true });

        if (brand) {
            console.log('brand', brand)
            carsQuery.andWhere("c.brand = :brand", { brand })
        }

        if (name) {
            carsQuery.andWhere("c.name = :name", { name })
        }

        if (category_id) {
            carsQuery.andWhere("c.category_id = :category_id", { category_id })
        }

        const cars = await carsQuery.getMany()

        return cars
    }

    async findById(car_id: string): Promise<Car> {
        const car = await this.repository.findOne(car_id)
        return car
    }
}

export { CarsRepository };
