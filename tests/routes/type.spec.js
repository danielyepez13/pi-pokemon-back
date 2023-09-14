/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Type, conn } = require('../../src/db.js');

const agent = session(app);
const type = {
    name: 'grass'
};

describe('Rutas de Tipos', () => {
    before(() => conn.authenticate()
        .catch((err) => {
            console.error('Inaccessible connection to the database:', err);
        }));
    beforeEach(() => Type.sync({ force: true })
        .then(() => Type.create(type)));
    describe('GET /types', () => {
        it('Should return GET 200', () =>
            agent.get('/types').expect(200)
        );
    });
});
