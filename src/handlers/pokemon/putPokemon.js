const modifyData = require("../../controllers/pokemon/pkModifyData");
module.exports = async (req, res) => {
    const { id, name, image, imageShiny, hp, attack, defense, speed, height, weight, type1, type2 } = req.body;
    try {
        const pokemonModified = await modifyData(id, name, image, imageShiny, hp, attack, defense, speed, height, weight, type1, type2);
        res.status(200).json(pokemonModified)
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}