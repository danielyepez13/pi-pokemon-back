const { Pokemon, PokemonType, Stats } = require("../../db");

module.exports = async (id) => {
    const exists = await Pokemon.findOne({ where: { id } })
    if (!exists){
        throw Error("Error delete pokemon");
    }
    await PokemonType.destroy({
        where: {
            pokemonId: id
        }
    })

    await Stats.destroy({
        where: {
            id: exists.statId
        }
    })

    await Pokemon.destroy({
        where: {
            id
        }
    })

    return id;
}