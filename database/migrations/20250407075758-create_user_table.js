"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("users", {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      firstName: Sequelize.DataTypes.STRING(45),
      lastName: Sequelize.DataTypes.STRING(45),
      email: Sequelize.DataTypes.STRING(75),
      password: Sequelize.DataTypes.STRING(255),
      loginToken: Sequelize.DataTypes.STRING(255),
      createdAt: {
        type: Sequelize.DataTypes.DATE(6),
        defaultValue: Sequelize.literal("CURRENT_TIMESTAMP(6)"),
      },
      updatedAt: {
        type: Sequelize.DataTypes.DATE(6),
        defaultValue: Sequelize.literal(
          "CURRENT_TIMESTAMP(6) ON UPDATE CURRENT_TIMESTAMP(6)"
        ),
      },
      isActive: { type: Sequelize.DataTypes.TINYINT, defaultValue: 1 },
      isDeleted: { type: Sequelize.DataTypes.TINYINT, defaultValue: 0 },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  },
};
