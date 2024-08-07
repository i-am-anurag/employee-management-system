const {Op} = require('sequelize')
const EmployeeService = require('../services/employee.service');
const { SucessCodes, clientErrorCodes, serverErrorCodes } = require('../utils/status-code');
const { checkRequiredFields, checkUnexpectedFields, isFieldEmpty, isValidEmail } = require('../utils/utils');

class EmployeeController {
  constructor() {
    this._employeeService = new EmployeeService();
  }

  async createEmployee(req, res) {
    try {
      // Check required fields on employee creation
      checkRequiredFields(
        ["department_id", "name", "dob", "email", "salary"],
        req.body
      );
      const employeeData = req.body;
      if (!isValidEmail(employeeData.email)) {
        throw {
          message: "Invalid Email",
          status_code: clientErrorCodes["BAD_REQUEST"],
        };
      }
      const contactNoRegex =
        /^[+]?(\d{1,2})?[\s.-]?\(?\d{3}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/;
      if (employeeData.phone && !contactNoRegex.test()) {
        throw {
          message: "Invalid Phone number",
          status_code: clientErrorCodes["BAD_REQUEST"],
        };
      }
      const date = new Date(employeeData.dob);
      
      if (isNaN(date.getTime())) {
        throw {
          message: "Invalid Date Formate",
          status_code: clientErrorCodes["BAD_REQUEST"],
        };
      }

      employeeData.dob = date.toISOString();
      const response = await this._employeeService.createEmployee(employeeData);
      return res.status(SucessCodes["CREATED"]).json({
        success: true,
        data: response,
        message: "Employee created new employee",
        error: "",
      });
    } catch (error) {
      console.log("Error in emoloyee creation",error);
      error.status_code = error.status_code ?? serverErrorCodes['INTERNAL_SERVER_ERROR'];
      return res.status(error.status_code).json({
        success: false,
        data: {},
        message: "Error in employee creation",
        error: error.message,
      });
    }
  }

  async updateEmployee(req, res) {
    try {
      const { empId: employeeId } = req.params;
      // Check extra fields on employee updation
      checkUnexpectedFields(
        ["department_id", "name", "dob", "salary", "status"],
        req.body
      );
      const employeeData = req.body;
      const response = this._employeeService.updateEmployee(
        {
          id: employeeId,
        },
        employeeData
      );

      return res.status(SucessCodes["OK"]).json({
        success: true,
        data: response,
        message: "Successfully updated employee",
        error: "",
      });
    } catch (error) {
      error.status_code = error.status_code ?? serverErrorCodes['INTERNAL_SERVER_ERROR'];
      return res.status(error.status_code).json({
        success: false,
        data: {},
        message: "Error in employee creation",
        error: error.message,
      });
    }
  }

  async getAllEmployees(req, res) {
    try {
      const { page = 1, pageSize = 10, ...filterData } = req.query;
      console.log("Employee filter with data",req.query);
      checkUnexpectedFields(["name", "minSalary", "maxSalary","email","pageSize","page"], req.query);
      const filter = {
        page:parseInt(page),
        pageSize:parseInt(pageSize),
      };
      if (filterData.name && !isFieldEmpty(filterData.name)) {
        filter.name = filterData.name;
      }
      if (filterData.email && isValidEmail(filterData.email)) {
        filter.email = filterData.email;
      }

      if (!isNaN(filterData.minSalary) && !isNaN(filterData.maxSalary)) {
        filter.salary = { [Op.between]: [filterData.minSalary, filterData.maxSalary] };
      } else if (!isNaN(filterData.minSalary)) {
        filter.salary = { [Op.lte]: filterData.minSalary };
      } else if (!isNaN(filterData.maxSalary)) {
        filter.salary = { [Op.gte]: parseFloat(filterData.maxSalary) };
      }

      const employees = await this._employeeService.getAllEmployees(filter);

      return res.status(SucessCodes["OK"]).json({
        sucess: true,
        data: employees,
        message: "Sucessfully get all employees",
        error: "",
      });
    } catch (error) {
      console.log("Error in getting all employees");
      error.status_code = error.status_code ?? serverErrorCodes['INTERNAL_SERVER_ERROR'];
      return res.status(error.status_code).json({
        sucess: false,
        data: {},
        message: "Something went wrong in getting all employees",
        error: error.message,
      });
    }
  }

  async deleteEmployee(req, res) {
    try {
      const { empId: employeeId } = req.params;
      const filter = {};
      if (!isNaN(employeeId)) {
        filter.id = employeeId;
      }
      const response = await this._employeeService.deleteEmployee(filter);

      return res.status(SucessCodes["OK"]).json({
        sucess: true,
        data: response,
        message: "Sucessfully delete employee",
        error: "",
      });
    } catch (error) {
      console.log("Error in deleting employee");
      error.status_code = error.status_code ?? serverErrorCodes['INTERNAL_SERVER_ERROR'];
      return res.status(error.status_code).json({
        sucess: false,
        data: {},
        message: "Something went wrong in deleting employee",
        error: error.message,
      });
    }
  }

  async getHighestSalaryByDepartment(req,res){
    try {
      const employees = await this._employeeService.getHighestSalaryByDepartment();
      
      return res.status(SucessCodes['OK']).json({
        sucess:true,
        data: employees,
        message:'Sucessfully get all emoloyees',
        error:""
      })
    } catch (error) {
      error.status_code = error.status_code ?? serverErrorCodes['INTERNAL_SERVER_ERROR'];
      return res.status(error.status_code).json({
        sucess:false,
        data: {},
        message:'Error in getting employee by highest salary with department',
        error:error.message,
      })
    }
  }

  async getYoungestByDeparment(req,res){
    try {
      const employees = await this._employeeService.getYoungestByDeparment();
      
      return res.status(SucessCodes['OK']).json({
        sucess:true,
        data: employees,
        message:'Sucessfully get all emoloyees',
        error:""
      })
    } catch (error) {
      error.status_code = error.status_code ?? serverErrorCodes['INTERNAL_SERVER_ERROR'];
      return res.status(error.status_code).json({
        sucess:false,
        data: {},
        message:'Error in getting employee by youngest age with department',
        error:error.message,
      })
    }
  }
}

module.exports = new EmployeeController();