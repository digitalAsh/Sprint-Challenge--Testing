const request = require('supertest');

const server = require('./server.js');

const db = require('../data/dbConfig.js')
const Games = require('../games/gamesModel.js');

describe('server.js', () => {
    it('should set the test env', () => {
        expect(process.env.DB_ENV).toBe('testing');
    })

    describe('GET /', () => {
        it('should return 200', async () => {
            const res = await request(server).get('/');
            expect(res.status).toBe(200);
        })
    })

    describe('GET /games', () => {
        it('should return games and 200 code', async () => {
            const res = await request(server).get('/games');
            expect(res.status).toBe(200);
            expect(res.body).toEqual([]);
        })
    })

    describe('POST /games', () => {
        
        afterEach(async () => {
            //clean up
            await db('games').truncate();
        })
        
        it('should insert game into the db', async () => {
            //using our model method
            await Games.insert({ name: 'Pacman', genre: 'arcade', releaseYear: 1980 })
            await Games.insert({ name: 'Ice Cold Beer', genre: 'arcade', releaseYear: 1983 })

            //confirm with knex
            const games = await db('games');

            expect(games).toHaveLength(2);
            expect(games[0].name).toBe('Pacman');
            expect(games[0].genre).toBe('arcade');
            expect(games[0].releaseYear).toBe(1980);
        })
        
        afterEach(async () => {
            //clean up
            await db('games').truncate();
        })

        it('should return 200, have property name, genre, releaseYear', async () => {
            const res = await request(server)
                .post('/games')
                .send({
                    name: 'Pacman', genre: 'arcade', releaseYear: 1980
                })
            expect(res.body).toHaveProperty('name')  
            expect(res.body).toHaveProperty('genre')
            expect(res.body).toHaveProperty('releaseYear')  
            expect(res.statusCode).toBe(200)

        })

        afterEach(async () => {
            //clean up
            await db('games').truncate();
        })

        it('should return 422 if property input is missing', async () => {
            const res = await request(server)
                .post('/games')
                .send({
                    genre: 'arcade', releaseYear: 1980
                })
            expect(res.statusCode).toBe(422)
        })

    })
})