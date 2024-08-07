const {Router} = require('express');

const employeeRoutes = require('./employee');
const departmentRoutes = require('./department');

const router = Router();

router.use('/employee',employeeRoutes);
router.use('/department',departmentRoutes);

module.exports = router;