import { Controller, Post, Body, ValidationPipe, Get, Param, Patch, Delete } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { ReturnUserDto } from './dto/return-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
    constructor(private usersService: UsersService) {}

    @Get('')
    async findAll(): Promise<any> {
        const user = await this.usersService.findAll();
        return { user, message: 'Usuarios encontrados' };
    }

    @Get(':id')
    async findOneById(@Param('id') id: string): Promise<ReturnUserDto> {
        const user = await this.usersService.findOneById(id);
        return { user, message: 'Usuario encontrado' };
    }

    @Patch(':id')
    async updateUser(@Body(ValidationPipe) updateUserDto: UpdateUserDto, @Param('id') id: string): Promise<ReturnUserDto> {
        const user = await this.usersService.updateUser(updateUserDto, id);
        return { user, message: 'Usuario atualizado'};
    }

    @Delete(':id')
    async deleteUser(@Param('id') id: string) {
        await this.usersService.deleteUser(id);
        return { message: 'Usuario removido com sucesso' };
    }
}