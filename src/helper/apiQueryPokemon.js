const cache = {}
const apiQuery = async (id_api, buscar_cada_uno = false) => {
    if (cache.hasOwnProperty(id_api)) {
        return cache[id_api];
    }
    const response = await fetch(`https://pokeapi.co/api/v2/${id_api}`);
    const pokemons = await response.json();
    
    if(id_api === "type"){
        return pokemons;
    }
    
    if (buscar_cada_uno){
        let cadaPokemon = pokemons.results.map(async (pokemon) => {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon.name}`);
            const poke = await response.json();

            const stat = {
                hp: poke.stats[0].base_stat,
                attack: poke.stats[1].base_stat,
                defense: poke.stats[2].base_stat,
                height: poke.height,
                weight: poke.weight,
                speed: poke.stats[5].base_stat
            }
            const types = [{name: poke.types[0].type.name}]
            if (poke.types[1]) types.push({ name: poke.types[1].type.name })
            return {
                id: poke.id,
                name: poke.name,
                image: poke.sprites.other["official-artwork"].front_default,
                types,
                stat,
            }
        })
        let resultadoPromise = await Promise.all(cadaPokemon)
        cache[id_api] = resultadoPromise;
        return resultadoPromise;
    }

    const stat = {
        hp: pokemons.stats[0].base_stat,
        attack: pokemons.stats[1].base_stat,
        defense: pokemons.stats[2].base_stat,
        height: pokemons.height,
        weight: pokemons.weight,
        speed: pokemons.stats[5].base_stat
    }

    const types = [{ name: pokemons.types[0].type.name }]
    if (pokemons.types[1]) types.push({ name: pokemons.types[1].type.name })

    return {
        id: pokemons.id,
        name: pokemons.name,
        image: pokemons.sprites.other["official-artwork"].front_default,
        imageShiny: pokemons.sprites.other["official-artwork"].front_shiny,
        types,
        stat,
    }
};

module.exports = apiQuery