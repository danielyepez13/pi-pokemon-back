const { Type } = require("../../db");
const apiQuery = require("../../helper/apiQueryPokemon");

module.exports = async () => {
    const typesCount = await Type.count();

    if (typesCount === 0){
        const typesAPI = await apiQuery("type");
        
        let typesName = typesAPI.results.map(type => ({"name": type.name}))

        return await Type.bulkCreate(typesName);
    }

    return await Type.findAll();
}