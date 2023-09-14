const obtainDetail = require("../../controllers/pokemon/pkObtainDetail");
module.exports = async (req, res) => {
    const { idPokemon } = req.params;
    
    try {
        const pokemon = await obtainDetail(idPokemon);
        res.status(200).json(pokemon);
    } catch (error) {
        res.status(400).json({ "error": error.message });
    }
}