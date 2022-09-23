import { ConflictException, ForbiddenException, HttpCode, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { LoginDto, RegisterDto } from './dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(
        private jwtService: JwtService,
        private prisma: PrismaService
    ) { }

    async register(registerDto: RegisterDto) {
        const existingUser = await this.prisma.users.findUnique({
            where: { username: registerDto.username }
        })

        if (existingUser) {
            throw new ConflictException(
                'nazwa uzytkownika jest juz zajeta!'
            )
        }

        const salt = await bcrypt.genSalt();
        const hash = bcrypt.hashSync(registerDto.password, salt)

        const user = await this.prisma.users.create({
            data: {
                username: registerDto.username,
                password: hash,
            }
        })

        return {
            message: 'poprawnie zarejestrowano!'
        }
    }

    async login(loginDto: LoginDto) {
        const user = await this.prisma.users.findUnique({
            where: { username: loginDto.username }
        })

        if (!user) {
            throw new ForbiddenException(
                'uzytkownik nie istnieje'
            )
        }

        const passwordMatch = await bcrypt.compare(loginDto.password, user.password)

        if (!passwordMatch) {
            throw new ForbiddenException(
                'nieprawidlowe haslo'
            )
        }

        const payload = { id: user.id }
        
        return {
            access_token: this.jwtService.sign(payload)
        }
    }
}