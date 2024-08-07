const { Op,fn, literal, col } = require("sequelize");
const { Employee,Department, Sequelize } = require("../models/index");
const { serverErrorCodes } = require("../utils/status-code");

const CRUDRepository = require("./CRUD-repository");

class EmployeeRepository extends CRUDRepository {
  constructor() {
    super(Employee);
  }

  async getHighestSalaryByGroup() {
    try {
      const response = await this.model.findAll({
        attributes: [
          "department_id",
          [fn("MAX", col("salary")), "highest_salary"],
        ],
        group: ["department_id"],
        include: [
          {
            model: Department,
            as:'department',
            attributes: ["name"],
          },
        ],
      });

      return response;
    } catch (error) {
      console.log("Error in getHighestSalaryByGroup method with error", error);
      throw {
        error: error,
        status_code: serverErrorCodes["INTERNAL_SERVER_ERROR"],
      };
    }
  }

  async getYoungestByGroup() {
    try {
      const response = await this.model.findAll({
        attributes: [
          [col("Department.name"), "department_name"],
          "name",
          [literal("TIMESTAMPDIFF(YEAR, Employee.dob, CURDATE())"), "age"],
        ],
        include: [
          {
            model: Department,
            as:'department',
            attributes: [],
          },
        ],
        where: {
          dob: {
            [Op.in]: Sequelize.literal(
              `(SELECT MIN(dob) FROM Employees WHERE department_id = Employee.department_id GROUP BY department_id)`
            ),
          },
        },
      });

      return response;
    } catch (error) {
      console.log("Error in getYoungestByGroup method with error", error);
      throw {
        error: error,
        status_code: serverErrorCodes["INTERNAL_SERVER_ERROR"],
      };
    }
  }
}



module.exports = EmployeeRepository;
