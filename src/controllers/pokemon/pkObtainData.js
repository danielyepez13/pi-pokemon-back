const { Pokemon, Type, Stats } = require("../../db");
const apiQuery = require("../../helper/apiQueryPokemon");

module.exports = async () => {
    const ApiyBD = await Promise.all([apiQuery(`pokemon/?limit=60`, true), Pokemon.findAll({ include: [Type, Stats] })]);
    return ApiyBD;
};