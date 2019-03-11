export class SearchResultsModel {
  type: string;
  currentQuery: CurrentQuery;
  freeTextSearch: string;
  pagination: Pagination;
  products: Product[];
  sorts: Sort[];
  constructor (type: string,
               currentQuery: CurrentQuery,
               freeTextSearch: string,
               pagination: Pagination,
               products: Product[],
               sorts: Sort[]) {
    this.type = type;
    this.currentQuery = currentQuery;
    this.freeTextSearch = freeTextSearch;
    this.pagination = pagination;
    this.products = products;
    this.sorts = sorts;
  }

}
