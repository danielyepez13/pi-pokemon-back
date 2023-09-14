const createData = require("../../controllers/pokemon/pkCreateData");
module.exports = async (req, res) => {
    const { name, image, imageShiny, hp, attack, defense, speed, height, weight, type1, type2 } = req.body;
    try {
        /* Falta relacionar con tipos */
        const pokemonCreated = await createData(name, image, imageShiny, hp, attack, defense, speed, height, weight, type1, type2);
        res.status(201).json(pokemonCreated);
    } catch (error) {
        res.status(400).json({ "error": error.message });
    }
}