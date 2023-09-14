/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Pokemon, conn } = require('../../src/db.js');

const agent = session(app);
const pokemon = {
  name: 'Pikachu', image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
};

describe('Pokemon routes', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Inaccessible connection to the database:', err);
    }));
  beforeEach(() => Pokemon.sync({ force: true })
    .then(() => Pokemon.create(pokemon)));
  describe('GET /pokemons', () => {
    it('Should return GET 200', (done) => {
      agent.get('/pokemons').expect(200)
      done();
    }
    );
  });
  describe("POST /pokemons", () => {
    it("Should return Post 200", () => {
      agent.post("/pokemons").send({ name: "pikacho", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png", imageShiny: "", hp: 45, attack: 30, defense: 40, speed: 40, height: 40, weight: 40, type1: "grass", type2: "water" }).expect(200)
    });
    it("Should return Post 400 if name exists", () => {
      agent.post("/pokemons").send({ name: "pikacho", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png", imageShiny: "", hp: 45, attack: 30, defense: 40, speed: 40, height: 40, weight: 40, type1: "grass", type2: "water" }).expect(400)
    })
  })
  describe("PUT /pokemons", () => {
    it("Should return PUT 200 if modified Pokemon", () => {
      const idPokemon = Pokemon.findOne({ where: { name: "pikacho" } }).then((data) => data.id);
      agent.put("/pokemons").send({ id: idPokemon, name: "pikacha", image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png", imageShiny: "", hp: 45, attack: 30, defense: 40, speed: 40, height: 40, weight: 42, type1: "grass", type2: "water" }).expect(200)
    })
  })
  describe("DELETE /pokemons", () => {
    it("Should return DELETE 200 if deleted Pokemon", () => {
      const idPokemon = Pokemon.findOne({ where: { name: "pikacho" } }).then((data) => data.id);
      agent.delete(`/pokemons/${idPokemon}`).expect(200)
    })
  })
});
