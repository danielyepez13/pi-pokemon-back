const { Router } = require('express');
const getTypes = require("../handlers/type/getTypes")

const router = Router();

router.get("/", getTypes)

module.exports = router;