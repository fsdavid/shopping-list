import {Query} from './query.model';

export class CurrentQuery {
  query: Query;
  url: string;
  constructor (query: Query, url: string) {
    this.query = query;
    this.url = url;
  }
}
//
// export interface CurrentQuery {
//   query: Query;
//   url: string;
// }
