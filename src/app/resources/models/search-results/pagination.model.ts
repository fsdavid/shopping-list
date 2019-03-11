export class Pagination {
  currentPage: number;
  pageSize: number;
  sort: string;
  totalPages: number;
  totalResults: number;
  constructor (  currentPage: number,
                 pageSize: number,
                 sort: string,
                 totalPages: number,
                 totalResults: number) {
    this.currentPage = currentPage;
    this.pageSize = pageSize;
    this.sort = sort;
    this.totalPages = totalPages;
    this.totalResults = totalResults;
  }
}

// export interface Pagination {
//   currentPage: number;
//   pageSize: number;
//   sort: string;
//   totalPages: number;
//   totalResults: number;
// }
