const { DepartmentRepository } = require('../repository');
const { serverErrorCodes, clientErrorCodes } = require('../utils/status-code');

class DepartmentService {
    constructor(){
        this._departmentRepo = new DepartmentRepository();
    }

    async createDepartment(data) {
        try {
            
            const departMentExist = await this._departmentRepo.findOne({name:data.name});
            if(departMentExist){    
                throw {
                    message:'Department Already exist',
                    status_code:clientErrorCodes['BAD_REQUEST'],
                }
            }
            const employee = await this._departmentRepo.create(data);
            if(!employee){
                throw {
                    message:'Department not created',
                }
            }
            return employee;
        } catch (error) {
            console.log("Something went wrong service layer for Department creation with error",error);
            throw {
                message:error.message,
                status_code : error.status_code ?? serverErrorCodes['INTERNAL_SERVER_ERROR'],
            }
        }
    }

    async updateDepartment(filter,data){
        try {
            const response = await this._departmentRepo.update(filter,data);

            if(!response){
                throw {
                    message:'Department not updated',
                }
            }

            return response;
        } catch (error) {
            console.log("Something went wrong service layer for department updation with error",error);
            throw {
                message:error.message,
                status_code:error.status_code ?? serverErrorCodes['INTERNAL_SERVER_ERROR'],
            }
        }
    }

    async getAllDepartment(filter){
        try {
            const employees = await this._departmentRepo.findAll(filter);
            if(employees.length<=0){
                throw {
                    message:'Employees not found',
                    status_code :clientErrorCodes['NOT_FOUND'],
                }
            }

            return employees;
        } catch (error) {
            console.log("Something went wrong service layer for get all department with error",error);
            throw {
                message:error.message,
                status_code:error.status_code ?? serverErrorCodes['INTERNAL_SERVER_ERROR'],
            }
        }
    }

    async deleteDepartment(filter){
        try {
            const response = await this._departmentRepo.destroy(filter);
            if(!response){
                throw {
                    message: 'Department not found',
                    status_code:clientErrorCodes['NOT_FOUND']
                }
            }

            return true;
        } catch (error) {
            console.log("Something went wrong service layer for delete department with error",error);
            throw {
                error:error.message,
                status_code:error.status_code ?? serverErrorCodes['INTERNAL_SERVER_ERROR'],
            }
        }
    }
}   

module.exports = DepartmentService;