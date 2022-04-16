import { Injectable, NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEntity } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import * as crypto from 'crypto';
import { ConflictException, InternalServerErrorException } from '@nestjs/common';
import { CredentialsDto } from '../auth/dto/credentials.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserEntity)
        private userRepository: Repository<UserEntity>
    ) { }

    async createUser(createUserDto: CreateUserDto): Promise<UserEntity> {
        if (createUserDto.password != createUserDto.passwordConfirmation) {
            throw new UnprocessableEntityException('As senhas não conferem');
        } else {
            const { email, name, password } = createUserDto;

            const user = this.userRepository.create(createUserDto);
            user.email = email;
            user.name = name;
            user.status = true;
            user.confirmationToken = crypto.randomBytes(32).toString('hex');
            user.salt = await bcrypt.genSalt();
            user.password = await this.hashPassword(password, user.salt);

            try {
                await user.save();
                delete user.password;
                delete user.salt;
                return user;
            } catch (error) {
                if (error.code.toString() === '23505') {
                    throw new ConflictException('[ERROR]: Email address is already in use');
                } else {
                    throw new InternalServerErrorException('[ERROR]: Unable to save user in database');
                }
            }
        }
    }

    async findAll() {
        try {
            return await this.userRepository.find({
                order: {
                    createdAt: 'ASC'
                }
            })
        } catch (error) {
            throw new InternalServerErrorException('[ERROR]: Cannot find all users');
        }
    }

    async findOneById(id: string): Promise<UserEntity> {
        try {
            const user = await this.userRepository.findOne({
                where: {
                    id: id
                }
            });

            if (!user) {
                throw new NotFoundException('Usuário não encontrado');
            }

            return user;
        } catch (error) {
            throw new InternalServerErrorException(`[ERROR]: Cannot find user with id ${id}`);
        }
    }

    async updateUser(updateUserDto: UpdateUserDto, id: string): Promise<UserEntity> {
        const user = await this.findOneById(id);
        const { name, email, password, status, favorites } = updateUserDto;

        user.name = name ? name : user.name;
        user.email = email ? email : user.email;
        user.password = password ? password : user.password;
        user.status = status === undefined ? user.status : status;

        if (favorites != null) {
            if (user.favorites.indexOf(favorites[0]) === -1) {
                user.favorites[user.favorites.length] = favorites[0];
            }
        }

        try {
            await user.save();
            return user;
        } catch (error) {
            throw new InternalServerErrorException('Erro ao salvar os dados no banco de dados');
        }
    }

    async deleteUser(id: string) {
        const result = await this.userRepository.delete({ id: id });

        if (result.affected === 0) {
            throw new NotFoundException('Não foi encontrado um usuário com o ID informado');
        }
    }

    async checkCredentials(credentialsDto: CredentialsDto): Promise<UserEntity> {
        const { email, password } = credentialsDto;
        const user = await this.userRepository.findOne({
            where: {
                email: email,
                status: true
            }
        });

        if (user && (await user.checkPassword(password))) {
            return user;
        } else {
            return null;
        }
    }

    private async hashPassword(password: string, salt: string): Promise<string> {
        return bcrypt.hash(password, salt);
    }
}