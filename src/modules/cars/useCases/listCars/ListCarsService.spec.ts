import { CarsRepositoryInMemory } from '../../repositories/in-memory/CarsRepositoryInMemory';
import { ListCarsService } from './ListCarsService';

let listCarsService: ListCarsService;
let carsRepositoryInMemory: CarsRepositoryInMemory;

describe('List Cars', () => {
    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory();
        listCarsService = new ListCarsService(carsRepositoryInMemory);
    });

    it('should be able to list all availables cars', async () => {
        carsRepositoryInMemory.create({
            name: 'car',
            description: 'descriptgion car etstfvevr',
            daily_rate: 10,
            license_plate: 'abc-1234fvr',
            fine_amount: 30,
            brand: 'car brand',
            category_id: 'category_id',
        });

        const cars = await listCarsService.execute();
        console.log(cars);
    });

    it('should be able to list all available cars by name', () => {
      
    })
});
