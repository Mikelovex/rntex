import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { CreateCarService } from './CreateCarService';

class CreateCarController {
    async handle(request: Request, response: Response): Promise<Response> {
        const {
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        } = request.body;

        const createCarUseCase = container.resolve(CreateCarService);

        const car = await createCarUseCase.execute({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
        });

        return response.status(201).json(car);
    }
}

export { CreateCarController };
