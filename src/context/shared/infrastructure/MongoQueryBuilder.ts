import { NewsQueryParams } from "../../News/domain/NewsQueryParams";
import { QueryBuilder } from "../domain/interfaces/QueryBuilder";

export class MongoQueryBuilder implements QueryBuilder {
  public build(query: any) {
    const filter: any = {};

    Object.keys(query).forEach((key) => {
      const keyOption = key as any;
      const value = query[keyOption];

      if (!this.isValidValue(value)) return;

      const property = keyOption.split("_")[0];

      if (keyOption.includes("contains")) {
        filter[property] = { $regex: `.*${value.trim()}.*`, $options: "i" };
      }

      if (keyOption.includes("equal")) {
        filter[property] = { $eq: value };
      }

      if (keyOption.includes("starts_with")) {
        filter[property] = { $regex: `^${value}.*`, $options: "i" };
      }

      if (keyOption.includes("ends_with")) {
        filter[property] = { $regex: `.*${value}$`, $options: "i" };
      }

      if (keyOption.includes("gt")) {
        filter[property] = { ...filter[property], $gt: value };
      }

      if (keyOption.includes("lt")) {
        filter[property] = { ...filter[property], $lt: value };
      }

      if (keyOption.includes("gte")) {
        filter[property] = { ...filter[property], $gte: value };
        delete filter[property].$gt;
      }

      if (keyOption.includes("lte")) {
        filter[property] = { ...filter[property], $lte: value };
        delete filter[property].$lt;
      }
    });

    return filter;
  }

  private isValidValue(value: any) {
    const is = value ? true : false;
    const isNumber = !isNaN(value as number);
    const isCero = isNumber && value === 0;

    const isDate = value instanceof Date;
    const isValidDate = isDate && !isNaN(value.getTime());

    const isValid = (is && !isDate) || (isNumber && isCero) || isValidDate;

    return isValid;
  }
}
