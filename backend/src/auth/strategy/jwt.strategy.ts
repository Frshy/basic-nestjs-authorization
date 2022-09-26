import { ForbiddenException, Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { Strategy, ExtractJwt } from "passport-jwt"
import { PrismaService } from "src/prisma/prisma.service";
import { JwtPayload } from "../interface";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private prisma: PrismaService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            secretOrKey: process.env.JWT_SECRET
        })
    }

    async validate({ id }: JwtPayload) {
        const user = await this.prisma.users.findUnique({
            where: { id }
        })

        if (!user) {
            throw new ForbiddenException(
                'unauthenticated'
            )
        }

        delete user.password
        return user
    }
}