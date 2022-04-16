import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { map } from 'rxjs/operators';

@Injectable()
export class DefaultService {
    public pokeapi: any;

    constructor(
        private readonly configService: ConfigService,
        private httpService: HttpService,
    ) {
        this.pokeapi = this.configService.get('pokeapi');
    }

    // Return by default 20 instances of some path in pokeapi
    async findAll(path: string, limit = '20'): Promise<any> {
        return this.httpService.get(`${this.pokeapi.baseUrl}${path}/?limit=${limit}`).pipe(map((response) => response.data));
    }

    // Return only one object from pokeapi (pokemon name or id)
    async findByQuery(path: string, query: string): Promise<any> {
        return this.httpService.get(`${this.pokeapi.baseUrl}${path}/${query}`).pipe(map((response) => response.data));
    }
}