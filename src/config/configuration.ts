export default () => ({
    port: parseInt(process.env.PORT, 10) || 3000,
    env: process.env.NODE_END || 'development',
    pokeapi: {
        limits: {
            pokemon: '809',
            items: '954',
        },
        baseUrl: 'https://pokeapi.co/api/v2',
        pokemonUrl: '/pokemon',
    },
});