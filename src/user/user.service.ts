import { ConflictException, ForbiddenException, HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from '../prisma/prisma.service';
import { DeleteDto, EditDto } from './dto';

@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getAll() {
        const allUsers = await this.prisma.users.findMany()
        return allUsers
    }

    async edit(editDto: EditDto) {
        const id = editDto.id
        delete editDto.id

        try {
            await this.prisma.users.update({
                where: { id },
                data: {
                    ...editDto
                }
            })
        } catch (e) {
            if (e instanceof Prisma.PrismaClientKnownRequestError) {
                if (e.code === 'P2002') {
                    throw new ConflictException(
                        'Nazwa uzytkownika jest juz zajeta!'
                    )
                }
            }
            throw e
        }

        return {
            message: 'poprawnie zedytowano uzytkownika'
        }
    }

    async delete(deleteDto: DeleteDto) {
        const userFound = await this.prisma.users.findUnique({
            where: { id: deleteDto.id }
        })

        if (!userFound) {
            throw new ForbiddenException(
                'user not found'
            )
        }

        await this.prisma.users.delete({
            where: { id: deleteDto.id }
        })

        return {
            message: 'poprawnie usunieto uzytkownika'
        }
    }
}