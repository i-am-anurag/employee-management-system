const {Router} = require('express');
const employeeController = require('../controller/employee.controller');

const router = Router();

router.post('/create',employeeController.createEmployee.bind(employeeController));
router.get('/',employeeController.getAllEmployees.bind(employeeController));
router.put('/update/:empId',employeeController.updateEmployee.bind(employeeController));
router.delete('/delete/:empId',employeeController.deleteEmployee.bind(employeeController));

module.exports = router;