const { Router } = require('express');
const getPokemons = require("../handlers/pokemon/getPokemons");
const getName = require("../handlers/pokemon/getNamePokemon")
const getId = require("../handlers/pokemon/getIdPokemon")
const postPokemon = require("../handlers/pokemon/postPokemon")
const putPokemon = require("../handlers/pokemon/putPokemon")
const deletePokemon = require("../handlers/pokemon/deletePokemon")

const router = Router();

router.get("/", getPokemons)

router.get("/name", getName)

router.get("/:idPokemon", getId)

router.post("/", postPokemon)

router.put("/", putPokemon)

router.delete("/:id", deletePokemon)

module.exports = router;
