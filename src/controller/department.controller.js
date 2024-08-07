const DepartmentService = require('../services/department.service');
const { SucessCodes } = require('../utils/status-code');
const { checkRequiredFields, checkUnexpectedFields, isFieldEmpty } = require('../utils/utils');
class EmployeeController {
  constructor() {
    this._departmentService = new DepartmentService();
  }

  async createDepartment(req, res) {
    try {
      // Check required fields on department creation
      checkRequiredFields(["name"], req.body);
      const departmentData = req.body;
      const response = await this._departmentService.createDepartment(departmentData);
      return res.status(SucessCodes["CREATED"]).json({
        success: true,
        data: response,
        message: "Sucessfully created new department",
        error: "",
      });
    } catch (error) {
        console.log("create department error:",error);
      return res.status(error.status_code).json({
        success: false,
        data: {},
        message: "Error in department creation",
        error: error.message,
      });
    }
  }

  async updateDepartment(req, res) {
    try {
      const { dptId: departmentId } = req.params;
      // Check extra fields on employee updation
      checkUnexpectedFields(["name", "status"], req.body);
      const departmentData = req.body;
      console.log('update department with data',departmentId,departmentData)
      const response = this._departmentService.updateDepartment({id: departmentId},departmentData);

      return res.status(SucessCodes["OK"]).json({
        success: true,
        data: response,
        message: "Sucessfully updated department information",
        error: "",
      });
    } catch (error) {
      console.log("Update department error",error);
      return res.status(error.status_code).json({
        success: false,
        data: {},
        message: "Error in department updation",
        error: error.message,
      });
    }
  }

  async getAllDepartment(req, res) {
    try {
      const { page = 1, pageSize = 10, ...filterData } = req.query;
      console.log("Getting all department with data",req.query);
      checkUnexpectedFields(["name", "status","page","pageSize"], req.query);
      const filter = {
        page: parseInt(page),
        pageSize: parseInt(pageSize),
      };
      if (filterData.name && !isFieldEmpty(filterData.name)) {
        filter.name = filterData.name;
      }

      const employees = await this._departmentService.getAllDepartment(filter);

      return res.status(SucessCodes["OK"]).json({
        sucess: true,
        data: employees,
        message: "Sucessfully get all departments",
        error: "",
      });
    } catch (error) {
      console.log("Error in getting all departments");

      return res.status(error.status_code).json({
        sucess: false,
        data: {},
        message: "Something went wrong in getting all departments",
        error: error.message,
      });
    }
  }

  async deleteDepartment(req, res) {
    try {
      const { dptId: departmentId } = req.params;
      const filter = {};
      if (!isNaN(departmentId)) {
        filter.id = departmentId;
      }
      const response = await this._departmentService.deleteDepartment(filter);

      return res.status(SucessCodes["OK"]).json({
        sucess: true,
        data: response,
        message: "Sucessfully delete department",
        error: "",
      });
    } catch (error) {
      console.log("Error in deleting department",error.message);

      return res.status(error.status_code).json({
        sucess: false,
        data: {},
        message: "Something went wrong in deleting department",
        error: error.message,
      });
    }
  }
}

module.exports = new EmployeeController();