export class CurrentQuery {
  query: Query;
  url: string;
  constructor (query: Query, url: string) {
    this.query = query;
    this.url = url;
  }
}
