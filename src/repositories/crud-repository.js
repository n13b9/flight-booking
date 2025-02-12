import { Logger } from "../config/index.js";

class CrudRepository {
  constructor(model) {
    this.model = model;
    console.log("Model in CrudRepository:", this.model);
  }

  async create(data) {
    try {
      console.log("Data in CrudRepository create method:", data);
      if (!data) {
        throw new Error("Data is undefined");
      }
      const response = await this.model.create(data);
      return response;
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async destory(data) {
    try {
      return await this.model.destroy({
        where: {
          id: data.id,
        },
      });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async get(data) {
    try {
      return await this.model.findByPk({
        where: {
          id: data.id,
        },
      });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async getAll() {
    try {
      return await this.model.findAll();
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }

  async update(id, data) {
    try {
      return await this.model.update(data, {
        where: {
          id: id,
        },
      });
    } catch (error) {
      Logger.error(error);
      throw error;
    }
  }
}

export default CrudRepository;
