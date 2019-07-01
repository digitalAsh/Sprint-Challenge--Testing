
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('games')
    .truncate()
    .then(function () {
      // Inserts seed entries
      return knex('games').insert([
        {id: 1, name: 'Pacman', genre: 'Arcade', releaseYear: 1980},
        {id: 2, name: 'Ice Cold Beer', genre: 'Arcade', releaseYear: 1983},
        {id: 3, name: 'The Simpsons', genre: 'Pinball', releaseYear: 1990}
      ]);
    });
};
