const { Department } = require('../models/index');

const CRUDRepository = require('./CRUD-repository');

class DepartmentRepository extends CRUDRepository{
    constructor(){
        super(Department)
    }
};

module.exports = DepartmentRepository;