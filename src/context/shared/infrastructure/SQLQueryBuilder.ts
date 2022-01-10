import { QueryBuilder } from "../domain/interfaces/QueryBuilder";

export class SQLQueryBuilder implements QueryBuilder {
  public build(queryObject: any) {
    let whereClause = "";

    Object.keys(queryObject).forEach((key) => {
      const keyOption = key as any;
      const value = queryObject[keyOption];

      if (keyOption.includes("contains")) {
        whereClause += `${key} LIKE '%${value}%' AND `;
      }

      if (keyOption.includes("equal")) {
        whereClause += `${key} = '${value}' AND `;
      }

      if (keyOption.includes("starts_with")) {
        whereClause += `${key} LIKE '${value}%' AND `;
      }

      if (keyOption.includes("ends_with")) {
        whereClause += `${key} LIKE '%${value}' AND `;
      }

      if (keyOption.includes("gt")) {
        whereClause += `${key} > ${value} AND `;
      }

      if (keyOption.includes("lt")) {
        whereClause += `${key} < ${value} AND `;
      }

      if (keyOption.includes("gte")) {
        whereClause += `${key} >= ${value} AND `;
      }

      if (keyOption.includes("lte")) {
        whereClause += `${key} <= ${value} AND `;
      }
    });

    return whereClause;
  }
}
