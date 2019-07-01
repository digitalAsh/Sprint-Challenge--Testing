const db = require('../data/dbConfig.js');

module.exports = {
    insert,
    getAll,
    findById
};

async function insert(game) {
    const [id] = await db('games').insert(game);
    return db('games').where({ id }).first()
}

function getAll() {
    return db('games')
}

function findById(id) {
    return db('games')
        .where({ id })
        .first()
}