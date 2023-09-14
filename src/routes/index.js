const { Router } = require('express');
const pokemonRouter = require("./pokemonRouter");
const typeRouter = require("./typeRouter");

const router = Router();

router.use("/pokemons", pokemonRouter);
router.use("/types", typeRouter);

module.exports = router;
