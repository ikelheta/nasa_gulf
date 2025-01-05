"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      "heros",
      [
        {
          id: uuidv4(), // Automatically generates a UUID
          body: `Are you facing difficulties with your website? Do you have a website but lack traffic? No need to worry.`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete(
      "heros",
      {}
    );
  },
};
