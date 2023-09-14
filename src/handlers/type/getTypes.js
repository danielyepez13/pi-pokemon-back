const obtainData = require("../../controllers/type/tyObtainData");
module.exports = async (req, res) => {
    const types = await obtainData();
    res.status(200).json(types);
}