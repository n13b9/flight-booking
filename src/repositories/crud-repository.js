import { status } from "http-status";
import { Logger } from "../config/index.js";
import AppError from "../utils/errors/app-error.js";

class CrudRepository {
  constructor(model) {
    this.model = model;
    console.log("Model in CrudRepository:", this.model);
  }

  async create(data) {
    try {
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
    const response = await this.model.destroy({
      where: { id: data },
    });
    if (!response) {
      throw new AppError("Cannot find city with given id", status.NOT_FOUND);
    }
    return response;
  }

  async get(data) {
    const response = await this.model.findByPk(data);
    if (!response) {
      throw new AppError("Cannot find city with given id", status.NOT_FOUND);
    }

    return response;
  }

  async getAll() {
    return await this.model.findAll();
  }

  async update(id, data) {
    return await this.model.update(data, {
      where: {
        id: id,
      },
    });
  }
}

export default CrudRepository;
