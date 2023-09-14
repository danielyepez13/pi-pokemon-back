const { Pokemon, Type, Stats } = require("../../db");
const apiQuery = require("../../helper/apiQueryPokemon")

module.exports = async (idPokemon) => {
    const id_api = Number(idPokemon);

    if (!isNaN(id_api)) {
        return await apiQuery(`pokemon/${id_api}`);
    }

    const pokemon = await Pokemon.findOne({ where: { id: idPokemon }, include: [Type, Stats] });

    if (!pokemon.name) {
        throw new Error("The pokemon is not found in the database.");
    }
    return pokemon;
};