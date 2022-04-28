import { Controller, Post, Body, ValidationPipe } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { CredentialsDto } from './dto/credentials.dto';


@Controller('auth')
export class AuthController {
    constructor(private authService: AuthService) {}

    @Post('/signup')
    async signUp(@Body(ValidationPipe) createUserDto: CreateUserDto): Promise<{ message: string}> {
        await this.authService.signUp(createUserDto);
        return { message: 'Cadastro realizado com sucesso' };
    }

    @Post('/signin')
    async signIn(@Body(ValidationPipe) credentialsDto: CredentialsDto): Promise<{ name: string, token: string }> {
        return await this.authService.signIn(credentialsDto);
    }
}