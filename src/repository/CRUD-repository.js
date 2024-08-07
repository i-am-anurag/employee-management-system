const { serverErrorCodes } = require("../utils/status-code");

class CRUDRepository {
  constructor(model) {
    if (this.constructor == CRUDRepository) {
      throw new Error("You cannot create object of CRUDRepository class.");
    }
    this.model = model;
  }

  async create(data) {
    try {
      const result = await this.model.create(data);
      return result;
    } catch (error) {
      console.log("Something went wrong in create method",error);
      throw {
        error: error,
        status_code: serverErrorCodes["INTERNAL_SERVER_ERROR"],
      };
    }
  }

  async destroy(filter) {
    try {
      const deleteCount = await this.model.destroy({ where: filter });
      return deleteCount;
    } catch (error) {
      console.log("Something went wrong in destroy method",error);
      throw {
        error: error,
        status_code: serverErrorCodes["INTERNAL_SERVER_ERROR"],
      };
    }
  }

  async findOne(filter) {
    try {
      console.log("findOne Filter data",filter);
      const result = await this.model.findOne({ where: filter });
      return result;
    } catch (error) {
      console.log("Something went wrong in findOne",error);
      throw {
        error: error,
        status_code: serverErrorCodes["INTERNAL_SERVER_ERROR"],
      };
    }
  }

  async findAll(options = {}, includeOptions = null) {
    try {
      const { page, pageSize, ...filter } = options;

      const queryOptions = {
        where: filter,
      };

      if (includeOptions) {
        queryOptions.include = includeOptions;
      }

      if (page !== undefined && pageSize !== undefined) {
        const offset = (page - 1) * pageSize;
        const limit = pageSize;

        queryOptions.limit = limit;
        queryOptions.offset = offset;
      }

      return await this.model.findAll(queryOptions);
    } catch (error) {
      console.log("Something went wrong in findAll method",error);
      throw {
        error: error,
        status_code: serverErrorCodes["INTERNAL_SERVER_ERROR"],
      };
    }
  }

  async update(filter, data) {
    try {
      await this.model.update(data, { where: filter });
      return true;
    } catch (error) {
      console.log("Something went wrong in crus repo",error);
      throw {
        error: error,
        status_code: serverErrorCodes["INTERNAL_SERVER_ERROR"],
      };
    }
  }
}

module.exports = CRUDRepository;
