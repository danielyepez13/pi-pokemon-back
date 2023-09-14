const { Pokemon, Stats, Type } = require("../../db");
const apiQuery = require("../../helper/apiQueryPokemon");

module.exports = async (name) => {
    const nameMinus = name.toLowerCase();
    return await Promise.all([apiQuery(`pokemon/${nameMinus}`), Pokemon.findOne({ where: { name: nameMinus }, include: [Stats, Type] })]);
};