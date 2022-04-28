import { Injectable, UnauthorizedException, UnprocessableEntityException } from '@nestjs/common';
import { UserEntity } from '../user/users.entity';
import { CreateUserDto } from '../user/dto/create-user.dto';
import { UsersService } from '../user/users.service';
import { CredentialsDto } from './dto/credentials.dto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService
    ) {}

    async signUp(createUserDto: CreateUserDto): Promise<UserEntity> {
        if (createUserDto.password != createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem');
        } else {
            return await this.usersService.createUser(createUserDto);
        }
    }

    async signIn(credentialsDto: CredentialsDto): Promise<any> {
        const user = await this.usersService.checkCredentials(credentialsDto);

        if (user === null) {
            throw new UnauthorizedException('Credenciais inválidas');
        }

        const jwtPayload = {
            id: user.id
        };
        const token = this.jwtService.sign(jwtPayload);

        return { name: user.name, token: token };
    }
}