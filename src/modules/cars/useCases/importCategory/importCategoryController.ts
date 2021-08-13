import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { ImportCategoryService } from './importCategoryService';

class ImportCategoryController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { file } = req;

        const importCategoryService = container.resolve(ImportCategoryService);
        await importCategoryService.execute(file);

        return res.send();
    }
}

export { ImportCategoryController };
