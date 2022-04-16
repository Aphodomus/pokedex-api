import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { DefaultService } from 'src/services/default.service';
import { HttpService } from '@nestjs/axios';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';

@Injectable()
export class PokemonService {
    public pokeapi: any;

    constructor(
        private baseService: DefaultService,
        private httpService: HttpService, 
        private configService: ConfigService,
    ) {
        this.pokeapi = this.configService.get('pokeapi');
    }

    // Return all pokemons from pokeapi
    async findAll(): Promise<Array<any>> {
        try {
            return await this.baseService.findAll(this.baseService.pokeapi.pokemonUrl);
        } catch (error) {
            console.error(error);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Return only one pokemon from pokeapi
    async findById(id: string):Promise<any> {
        try {
            return await this.baseService.findByQuery(this.baseService.pokeapi.pokemonUrl, id);
        } catch (error) {
            console.error(error);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    // Return a paginated list of pokemon, by default 20
    getPokemon(offset: number = 0) {
        try {
            return this.httpService.get(`${this.pokeapi.baseUrl}/pokemon?offset=${offset}&limit=25`).pipe(
                map((response) => response.data['results']),
                map(pokemons => {
                    return pokemons.map((pokemon, index) => {
                        pokemon.image = this.getPokemonImages(index + offset + 1);
                        pokemon.pokeIndex = offset + index + 1;
                        return pokemon;
                    });
                })
            );
        } catch (error) {
            console.error(error);
            throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    getPokemonImages(index: string) {
        return `${this.pokeapi.imageUrl}${index}.svg`;
    }

    findPokemon(value: string) {
        return this.httpService.get(`${this.pokeapi.baseUrl}/pokemon/${value}`).pipe();
    }
}