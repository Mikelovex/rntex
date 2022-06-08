import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsService } from './ListCarsService';

let listCarsService: ListCarsService;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsService = new ListCarsService(carsRepositoryInMemory);
    });

    it("should be able to list all available cars", async () => {
        const car = await carsRepositoryInMemory.create({
            name: "Car1",
            description: "Car description",
            daily_rate: 110.0,
            license_plate: "DEF-1234",
            fine_amount: 40,
            brand: "Car_brand",
            category_id: "category_id",
        });

        const cars = await listCarsService.execute({});

        expect(cars).toEqual([car]);
    });

    // it('should be able to list all available cars by brand', async () => {
    //     const car = carsRepositoryInMemory.create({
    //         name: 'car',
    //         description: 'descriptgion car etstfvevr',
    //         daily_rate: 10,
    //         license_plate: 'abc-1234fvr',
    //         fine_amount: 30,
    //         brand: 'car brand',
    //         category_id: 'category_id',
    //     });

    //     const cars = await listCarsService.execute({
    //         brand: 'Car_brand_teste'
    //     })

    //     console.log('cars', cars)

    //     expect(cars).toEqual([car])
    // })
});
