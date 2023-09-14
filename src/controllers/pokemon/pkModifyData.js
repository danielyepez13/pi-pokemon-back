const { Pokemon, Stats, Type, PokemonType } = require("../../db");

module.exports = async (id, name, image, imageShiny, hp, attack, defense, speed, height, weight, type1, type2) => {
    const exists = await Pokemon.findOne({ where: { id } })
    if (!exists) {
        throw Error("incomplete data to record");
    }

    if (!name || !image || !hp || !attack || !defense || (!type1 && !type2)) {
        throw Error("the pokemon already exists");
    }

    await PokemonType.destroy({
        where: {
            pokemonId: id
        }
    })

    const firstType = await Type.findOne({ where: { name: type1 } })
    const secondType = await Type.findOne({ where: { name: type2 } })
    if (firstType) {
        await PokemonType.create({ pokemonId: id, typeId: firstType.id })
    }

    if (secondType) {
        await PokemonType.create({ pokemonId: id, typeId: secondType.id })
    }

    const [unNull, pokemonUpdated] = await Pokemon.update({
        name, image, imageShiny
    }, { where: { id }, returning: true, plain: true })

    await Stats.update({
        hp: Number(hp), attack: Number(attack), defense: Number(defense), speed: Number(speed), height: Number(height), weight: Number(weight)
    }, { where: { id: pokemonUpdated.statId } });

    return await Pokemon.findOne({ where: { id: id }, include: [Type, Stats] });
}