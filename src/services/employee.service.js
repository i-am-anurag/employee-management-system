const {Department} = require('../models')

const {EmployeeRepository} = require('../repository/');
const { serverErrorCodes, clientErrorCodes } = require('../utils/status-code');

class EmployeeService {
  constructor() {
    this._employeeRepo = new EmployeeRepository();
  }

  async createEmployee(data) {
    try {
      data.salary = parseInt(data.salary);
      data.department_id = parseInt(data.department_id);

      const isEmployeeExist = await this._employeeRepo.findOne({ email: data.email });
      if (isEmployeeExist) {
        throw {
          message: "Employee already exist",
          status_code: clientErrorCodes["BAD_REQUEST"],
        };
      }
      const employee = await this._employeeRepo.create(data);
      if (!employee) {
        throw {
          message: "Employee not created",
        };
      }
      return employee;
    } catch (error) {
      console.log(
        "Something went wrong service layer for employee creation with error",
        error
      );
      throw {
        message: error.message,
        status_code:
          error.status_code ?? serverErrorCodes["INTERNAL_SERVER_ERROR"],
      };
    }
  }

  async updateEmployee(filter, data) {
    try {
      const response = await this._employeeRepo.update(filter, data);

      if (!response) {
        throw {
          message: "Employee not updated",
        };
      }

      return response;
    } catch (error) {
      console.log(
        "Something went wrong service layer for employee updation with error",
        error
      );
      throw {
        message: error.message,
        status_code:
          error.status_code ?? serverErrorCodes["INTERNAL_SERVER_ERROR"],
      };
    }
  }

  async getAllEmployees(filter) {
    try {
      const includeOptions = [
        {
          model: Department,
          as: 'department',
          attributes: ["name", "status"],
        },
      ];
      const employees = await this._employeeRepo.findAll(
        filter,
        includeOptions
      );
      if (employees.length <= 0) {
        throw {
          message: "Employees not found",
          status_code: clientErrorCodes["NOT_FOUND"],
        };
      }

      return employees;
    } catch (error) {
      console.log(
        "Something went wrong service layer for get all employee with error",
        error
      );
      throw {
        message: error.message,
        status_code:
          error.status_code ?? serverErrorCodes["INTERNAL_SERVER_ERROR"],
      };
    }
  }

  async deleteEmployee(filter) {
    try {
      const response = await this._employeeRepo.destroy(filter);
      if (!response) {
        throw {
          message: "Employee not found",
          status_code: clientErrorCodes["NOT_FOUND"],
        };
      }

      return true;
    } catch (error) {
      console.log(
        "Something went wrong service layer for delete employee with error",
        error
      );
      throw {
        error: error.message,
        status_code:
          error.status_code ?? serverErrorCodes["INTERNAL_SERVER_ERROR"],
      };
    }
  }

  async getHighestSalaryByDepartment() {
    try {
      const employees = await this._employeeRepo.getHighestSalaryByGroup();
      if (employees.length <= 0) {
        throw {
          message: "Employees not found",
          status_code: clientErrorCodes["NOT_FOUND"],
        };
      }

      return employees;
    } catch (error) {
      throw {
        error: error.message,
        status_code:
          error.status_code ?? serverErrorCodes["INTERNAL_SERVER_ERROR"],
      };
    }
  }

  async getYoungestByDeparment() {
    try {
      const employees = await this._employeeRepo.getYoungestByGroup();
      if (employees.length <= 0) {
        throw {
          message: "Employees not found",
          status_code: clientErrorCodes["NOT_FOUND"],
        };
      }

      return employees;
    } catch (error) {
      throw {
        error: error.message,
        status_code:
          error.status_code ?? serverErrorCodes["INTERNAL_SERVER_ERROR"],
      };
    }
  }
}   

module.exports = EmployeeService;