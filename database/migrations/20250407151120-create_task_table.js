'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.createTable("tasks", {
      id: {
        type: Sequelize.DataTypes.BIGINT,
        autoIncrement: true,
        primaryKey: true,
      },
      userId: Sequelize.DataTypes.BIGINT,
      title: Sequelize.DataTypes.STRING(75),
      description: Sequelize.DataTypes.STRING(255),
      statusId: Sequelize.DataTypes.BIGINT,
      dueDate: Sequelize.DataTypes.DATE(6),
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

  async down (queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
  }
};
