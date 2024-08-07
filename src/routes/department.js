const {Router} = require('express');
const employeeController = require('../controller/employee.controller');
const departmentController = require('../controller/department.controller');

const router = Router();

router.post('/create',departmentController.createDepartment.bind(departmentController));
router.get('/',departmentController.getAllDepartment.bind(departmentController));
router.put('/update/:dptId',departmentController.updateDepartment.bind(departmentController));
router.delete('/delete/:dptId',departmentController.deleteDepartment.bind(departmentController));
router.get('/highest-salary',employeeController.getHighestSalaryByDepartment.bind(employeeController));
router.get('/youngest-employee',employeeController.getYoungestByDeparment.bind(employeeController));

module.exports = router;