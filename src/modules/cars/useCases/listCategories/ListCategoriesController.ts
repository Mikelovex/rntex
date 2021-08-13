import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ListCategoriesService } from './ListCategoriesService';

class ListCategoriesController {
    async handle(req: Request, res: Response): Promise<Response> {
        const listCategoriesService = container.resolve(ListCategoriesService);
        const all = await listCategoriesService.execute();

        return res.json(all);
    }
}

export { ListCategoriesController };
