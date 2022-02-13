import { News } from "../domain/News.model";
import { NewsQueryParams } from "../domain/NewsQueryParams";
import { NewsFinder } from "./NewsFinder";

export class NewsPublishedFinder {
  constructor(private newsFinder: NewsFinder) {}

  public async findAll(
    page: number = 1,
    sort_by: string = "createdAt",
    order: "asc" | "desc" = "desc",
    query: NewsQueryParams = {}
  ): Promise<News[]> {
    const fixedQuery: NewsQueryParams = {
      ...query,
      publishingState_equal: "PUBLISHED",
    };

    const normalizedPage = this.normalizePage(page);
    const quantity = 10;
    const from = (normalizedPage - 1) * quantity;

    return await this.newsFinder.filter(
      fixedQuery,
      from,
      quantity,
      sort_by,
      order
    );
  }

  private normalizePage(page: any): number {
    if (isNaN(page)) return 1;
    return page < 1 ? 1 : page;
  }
}
