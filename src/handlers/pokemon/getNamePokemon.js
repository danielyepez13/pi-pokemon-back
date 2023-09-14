const getName = require("../../controllers/pokemon/pkObtainName");
module.exports = async (req, res) => {
    const { name } = req.query;
    try {
        const pokemonName = await getName(name);
        res.status(200).json(pokemonName);
    } catch (error) {
        res.status(400).json({ "error": error.message });
    }
}