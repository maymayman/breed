'use strict';
const breeds = require('./data/breeds.json');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
  //  console.log(breeds.filter((breed) => !breed.image || breed.reference_image_id !== breed.image.id))
    const breedBulk = breeds
      .map((breed) => { 
        
        breed.weight = JSON.stringify(breed.weight);
        if (!breed.image || !breed.image.id) {delete breed.reference_image_id};
        delete breed.image; 
        return breed; 
      });

    await queryInterface.bulkInsert("breed", breedBulk);
  },

  down: async (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
