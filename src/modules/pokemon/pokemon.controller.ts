import { Body, Controller, Get, Param } from '@nestjs/common';
import { PokemonService } from './pokemon.service';

@Controller('pokemon')
export class PokemonController {
    private offset = 0;
    private pokemons = [];

    constructor(private readonly pokemonService: PokemonService) {}

    @Get()
    async getPokemon(loadMore = true) {
        if (loadMore) {
            this.offset += 25;
        }

        const resp = await this.pokemonService.getPokemon(this.offset);
        resp.subscribe(resp => {
            if (this.offset > 0) {
                this.pokemons = [...this.pokemons, ...resp];
            } else {
                this.pokemons = resp;
            }
        });
        console.log(this.pokemons);
        return this.pokemons;
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