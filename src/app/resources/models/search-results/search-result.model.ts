import {CurrentQuery} from './current-query.model';
import {Pagination} from './pagination.model';
import {Sort} from './sort.model';
import {Product} from '../products/product.model';

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

// export interface SearchResultsModel {
//   type: string;
//   currentQuery: CurrentQuery;
//   freeTextSearch: string;
//   pagination?: Pagination;
//   products?: Product[];
//   sorts?: Sort[];
// }
