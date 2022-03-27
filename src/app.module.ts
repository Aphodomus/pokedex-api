import { Module } from '@nestjs/common';
import configuration from './config/configuration';
import { ConfigModule } from '@nestjs/config';
import { PokemonModule } from './modules/pokemon/pokemon.module';

@Module({
  imports: [
    PokemonModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
