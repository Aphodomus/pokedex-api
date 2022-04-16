import { IsString, IsEmail, IsOptional, MinLength } from 'class-validator';

export class UpdateUserDto {
    @IsOptional()
    @IsString( { message: 'Informe um nome de usuário válido' } )
    name: string;

    @IsOptional()
    @IsEmail( {}, { message: 'Informe um endereço de email válido' } )
    email: string;

    @IsOptional()
    @MinLength(3, { message: 'A senha deve ter no mínimo 3 caracteres' })
    @IsString( { message: 'Informe uma senha válida' } )
    password: string;

    @IsOptional()
    status: boolean;

    @IsOptional()
    favorites: number[];
}