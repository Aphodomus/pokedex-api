import { Body, Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    private offset = 0;

    constructor(private readonly pokemonService: PokemonService) {}

    @Get()
    async getPokemon() {
        const resp = await this.pokemonService.getPokemon(this.offset);
        return resp;
    }

    @Get('all')
    async findAll() {
        return this.pokemonService.findAll();
    }

    @Get(':id')
    async findById(@Param('id') id: string) {
        return this.pokemonService.findById(id);
    }
}