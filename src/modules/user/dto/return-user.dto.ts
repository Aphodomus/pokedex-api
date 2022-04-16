import { UserEntity } from '../users.entity';

export class ReturnUserDto {
  user: UserEntity;
  message: string;
}