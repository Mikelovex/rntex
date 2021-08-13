import { Request, Response } from 'express';
import { container } from 'tsyringe';

import { UpdateUserAvatarService } from './UpdateUserAvatarService';

class UpdateUserAvatarController {
    async handle(req: Request, res: Response): Promise<Response> {
        const { id } = req.user;

        const avatar = req.file.filename;

        const updateUserAvatarService = container.resolve(
            UpdateUserAvatarService,
        );

        await updateUserAvatarService.execute({
            user_id: id,
            avatar_file: avatar,
        });

        return res.status(204).send();
    }
}

export { UpdateUserAvatarController };
