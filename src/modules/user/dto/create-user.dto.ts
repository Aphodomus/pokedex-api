import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

export class CreateUserDto {
  @IsNotEmpty({ message: 'Informe um endereço de email' })
  @IsEmail( {}, { message: 'Informe um endereço de email válido' } )
  @MaxLength(200, { message: 'O endereço de email deve ter menos de 200 caracteres' })
  @IsString()
  email: string;

  @IsNotEmpty({ message: 'Informe o nome do usuário' })
  @IsString()
  name: string;

  @IsNotEmpty({ message: 'Informe uma senha' })
  @MinLength(3, { message: 'A senha deve ter no mínimo 3 caracteres' })
  @IsString()
  password: string;

  @IsNotEmpty({ message: 'Informe a confirmação de senha' })
  @MinLength(3, { message: 'A senha deve ter no mínimo 3 caracteres' })
  @IsString()
  passwordConfirmation: string;
}