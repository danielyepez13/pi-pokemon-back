const { Pokemon, conn } = require('../../src/db.js');
const { expect } = require('chai');

describe('Pokemon model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('does not connect to the database:', err);
    }));
  describe('Validations', () => {
    beforeEach(() => Pokemon.sync({ force: true }));
    describe('Pokemon data', () => {
      it('It should throw an error if any of the required fields are empty.', (done) => {
        Pokemon.create({})
          .then(() => done(new Error('Name, image address, life, attack and defense statistics are required.')))
          .catch(() => done());
      });
      it('Should throw an error if the name contains any number', (done) => {
        Pokemon.create({
          name: 'Pikach0', image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"
        })
          .then(() => done(new Error('A valid name is required, that is, one that only contains letters')))
          .catch(() => done());
      });
      it('Should throw an error if the image is not an address', (done) => {
        Pokemon.create({
          name: 'Pikachu', image: "imagen real"
        })
          .then(() => done(new Error('A valid image is required')))
          .catch(() => done());
      });

      it('They should work when each of the necessary fields does have its corresponding value', () => {
        Pokemon.create({
          name: 'Pikachu', image: "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/25.png"});
      });
    });
  });
});
