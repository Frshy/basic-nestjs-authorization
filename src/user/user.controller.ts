import { Body, Controller, Delete, Get, Patch, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { DeleteDto, EditDto } from './dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
    constructor(private userService: UserService) {}

    @Get('getAll')
    async getAll() {
        return this.userService.getAll()
    }
    
    @UseGuards(JwtAuthGuard)
    @Patch('edit')
    async edit(@Body() editDto: EditDto) {
        return this.userService.edit(editDto)
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete')
    async delete(@Body() deleteDto: DeleteDto) {
        return this.userService.delete(deleteDto)
    }
}