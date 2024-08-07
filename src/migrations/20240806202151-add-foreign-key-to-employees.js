'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('Employees', {
      fields: ['department_id'],
      type: 'foreign key',
      name: 'fk_department', // optional
      references: {
        table: 'Departments',
        field: 'id'
      },
      onDelete: 'RESTRICT',
      onUpdate: 'CASCADE'
    });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('Employees', 'fk_department');
  }
};
