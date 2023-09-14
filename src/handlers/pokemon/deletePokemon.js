const deleteData = require("../../controllers/pokemon/pkDeleteData");
module.exports = async (req, res) => {
    const { id } = req.params;
    try {
        const idEliminado = await deleteData(id);
        res.status(200).json(idEliminado);
    } catch (error) {
        res.status(400).json({ "error": error.message })
    }
}