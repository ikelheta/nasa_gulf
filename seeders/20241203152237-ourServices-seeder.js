"use strict";
const { v4: uuidv4 } = require("uuid");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    const ourServicesId = uuidv4();
    await queryInterface.bulkInsert(
      "ourServices",
      [
        {
          id: ourServicesId, // Automatically generates a UUID
          body: `We empower businesses with IoT-enabled solutions, connecting devices and automating workflows. With specialization in smart home systems, SDK integration, and data-driven IoT platforms, we transform your vision into a connected reality.`,
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    const services = [
      {
        id: uuidv4(), // Automatically generates a UUID
        ourServicesId,
        title: "title 1",
        body: "body 1",
        icon: "/uploads/icon1.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(), // Automatically generates a UUID
        ourServicesId,
        title: "title 2",
        body: "body 2",
        icon: "/uploads/icon2.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(), // Automatically generates a UUID
        ourServicesId,
        title: "title 3",
        body: "body 3",
        icon: "/uploads/icon3.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(), // Automatically generates a UUID
        ourServicesId,
        title: "title 4",
        body: "body 4",
        icon: "/uploads/icon4.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(), // Automatically generates a UUID
        ourServicesId,
        title: "title 5",
        body: "body 5",
        icon: "/uploads/icon5.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: uuidv4(), // Automatically generates a UUID
        ourServicesId,
        title: "title 6",
        body: "body 6",
        icon: "/uploads/icon6.png",
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
    await queryInterface.bulkInsert("services", services, {});
  },

  async down(queryInterface, Sequelize) {
    // Delete all services first (to maintain referential integrity)
    await queryInterface.bulkDelete("services", null, {});
    // Then delete the `OurServices` entry
    await queryInterface.bulkDelete("ourServices", null, {});
  },
};
