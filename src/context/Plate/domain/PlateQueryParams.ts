export interface PlateQuery {
  name_contains: string;
  description_contains: string;
  date_lte: Date;
  date_gte: Date;
  receipe_contains: string;
  menuUuid_equal: string;
}
