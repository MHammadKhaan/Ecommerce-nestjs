import { userSignInDto } from './../../../users/dto/signin-user.dto';
import { UsersService } from './../../../users/users.service';

import { BadRequestException, Injectable, NestMiddleware } from '@nestjs/common';
import { isArray } from 'class-validator';
import { Request, Response, NextFunction } from 'express';
import { verify } from "jsonwebtoken"
import { UserEntity } from 'src/users/entities/user.entity';
declare global {
    namespace Express {
        interface Request {
            currentUser?: UserEntity
        }
    }
}

@Injectable()
export class CurrentUserMiddleware implements NestMiddleware {
    constructor(private readonly UsersService: UsersService) { }
    async use(req: Request, res: Response, next: NextFunction) {
        const authHeader = req.headers.authorization || req.headers.Authorization
        try {
            if (!authHeader || isArray(authHeader)) {

                req.currentUser = null
                next()
            } else {
                const token = authHeader
                const { id } = <jwtPayload>verify(token, process.env.ACCESS_TOKEN_SECRET)
                const currentUser = await this.UsersService.findOne(+id)
                req.currentUser = currentUser
                console.log("currentUser", req.currentUser);
                next();
            }

        } catch (error) {
            throw new BadRequestException(error, " authorization error")

        }


    }

}
interface jwtPayload {
    id: string
}
