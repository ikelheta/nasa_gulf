"use strict";
const bcrypt = require("bcrypt");
const { v4: uuidv4 } = require("uuid");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const hashedPassword = await bcrypt.hash("Aa12345@", 10);

    await queryInterface.bulkInsert(
      "admins",
      [
        {
          id: uuidv4(), // Automatically generates a UUID
          name: "Admin User",
          email: "superadmin@gmail.com",
          password: hashedPassword,
          image: "/uploads/avatar.jpg",
          passwordChangedAt: null,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete(
      "admins",
      { email: "superadmin@gmail.com" },
      {}
    );
  },
};
