import { Body, Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { GetUser } from 'src/auth/decorator/get-user.decorator';
import { User } from 'src/auth/entity/user.entity';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { DeleteDto, EditDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) { }

    @Get('getAll')
    async getAll() {
        return this.userService.getAll()
    }

    @Patch('edit')
    @UseGuards(JwtAuthGuard)
    async edit(@Body() editDto: EditDto) {
        return this.userService.edit(editDto)
    }

    @Delete('delete')
    @UseGuards(JwtAuthGuard)
    async delete(@Body() deleteDto: DeleteDto) {
        return this.userService.delete(deleteDto)
    }

    @Get('getMe')
    @UseGuards(JwtAuthGuard)
    getMe(@GetUser() user: User) {
        return this.userService.getMe(user)
    }
}