const obtainData = require("../../controllers/pokemon/pkObtainData");
module.exports = async (req, res) => {
    const pokemons = await obtainData();
    res.status(200).json(pokemons);
}