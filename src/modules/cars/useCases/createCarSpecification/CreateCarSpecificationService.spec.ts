import { AppError } from "../../../../shared/errors/AppError"
import { CarsRepositoryInMemory } from "../../repositories/in-memory/CarsRepositoryInMemory"
import { CreateCarSpecificationService } from "./CreateCarSpecificationService"

let createCarSpecificationService: CreateCarSpecificationService
let carsRepositoryInMemory: CarsRepositoryInMemory

describe('Create car specification', () => {

    beforeEach(() => {
        carsRepositoryInMemory = new CarsRepositoryInMemory()
        createCarSpecificationService = new CreateCarSpecificationService(carsRepositoryInMemory)
    })

    // it("should not be able to add a specification to a non-existent car", async () => {
    //     expect(async () => {
    //         const car_id = "1234"
    //         const specifications_id = ['54321']

    //         await createCarSpecificationService.execute({ car_id, specifications_id })
    //     }).rejects.toBeInstanceOf(AppError)

    // })

    it("should be able to add a new car specification", async () => {
        const car = await carsRepositoryInMemory.create({
            name: 'name car',
            description: 'description car',
            daily_rate: 100,
            license_plate: 'abc-1234',
            fine_amount: 60,
            brand: 'brand',
            category_id: 'category',
        });

        const specifications_id = ['54321']

        await createCarSpecificationService.execute({ car_id: car.id, specifications_id })

    })


})