"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable("task_status", {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      code: Sequelize.DataTypes.STRING(45),
      name: Sequelize.DataTypes.STRING(75),
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

    await queryInterface.bulkInsert("task_status", [
      {
        code: "PD",
        name: "Pending",
      },
      {
        code: "CP",
        name: "Completed",
      },
    ]);
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
