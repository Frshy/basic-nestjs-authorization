import { createParamDecorator } from '@nestjs/common';

import { User } from '../entity/user.entity';

export const GetUser = createParamDecorator(
    (_, ctx): User => {
        return ctx.switchToHttp().getRequest().user;
    }
);