import { Request, Response } from 'express'
import { container } from 'tsyringe'
import { ListCarsService } from './ListCarsService'

class ListCarsController {

    async handle(request: Request, response: Response): Promise<Response> {
        const { brand, name, category_id } = request.query;

        console.log(brand, name, category_id)

        const listCarsService = container.resolve(ListCarsService)

        const cars = await listCarsService.execute({
            brand: brand as string,
            name: name as string,
            category_id: category_id as string,
        })


        return response.json(cars)
    }

}

export { ListCarsController }