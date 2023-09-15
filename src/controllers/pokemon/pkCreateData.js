const { Pokemon, Type, Stats } = require("../../db");

module.exports = async (name, image, imageShiny, hp, attack, defense, speed, height, weight, type1, type2) => {
    if (!name || !image || !hp || !attack || !defense || (!type1 && !type2)) {
        throw Error("incomplete data to record");
    }
    name = name.toLowerCase().trim();
    image = image.trim();
    if (await Pokemon.findOne({ where: { name: name } })){
        throw Error("the pokemon already exists");
    }
    
    const statsPokemon = await Stats.create({ hp: Number(hp), attack: Number(attack), defense: Number(defense), speed: Number(speed), height: Number(height), weight: Number(weight) })
    
    if(!imageShiny || imageShiny === ""){
        imageShiny = image;
    }else {
        imageShiny = imageShiny.trim()
    }
    const pokemonCreated = await Pokemon.create({ name, image, imageShiny, statId: statsPokemon.id });

    if(type1){
        const firstType = await Type.findOne({
            where: {
                name: type1
            }
        })
    
        await pokemonCreated.addType(firstType)
    }
    if (type2 !== type1 && type2) {
        const secondType = await Type.findOne({
            where: {
                name: type2
            }
        })
        await pokemonCreated.addType(secondType);
    }
    return await Pokemon.findOne({where: {id: pokemonCreated.id}, include: [Type, Stats]});
};