import { TypeOrmModuleOptions } from '@nestjs/typeorm';

export const TypeOrmConfig: TypeOrmModuleOptions = {
    type: 'postgres',
    host: 'localhost',
    port: 5432,
    username: 'postgres',
    password: '123123',
    database: 'pokedex',
    entities: [__dirname + '/../**/*.entity.{js,ts}'],
    synchronize: true,
}