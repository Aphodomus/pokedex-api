export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    env: process.env.NODE_END || 'development',
    pokeapi: {
        limits: {
            pokemon: '809',
            items: '954',
        },
        baseUrl: 'https://pokeapi.co/api/v2',
        imageUrl: 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/',
        pokemonUrl: '/pokemon',
    },
});