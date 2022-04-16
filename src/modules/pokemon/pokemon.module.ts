import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { DefaultServiceModule } from 'src/services/default.module';
import { PokemonController } from './pokemon.controller';
import { PokemonService } from './pokemon.service';

@Module({
    imports: [DefaultServiceModule, HttpModule],
    controllers: [PokemonController],
    providers: [PokemonService],
})
export class PokemonModule {}