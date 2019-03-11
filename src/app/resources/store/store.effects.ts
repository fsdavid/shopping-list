import {Injectable} from '@angular/core';
import {Actions, Effect, ofType} from '@ngrx/effects';
import {Observable} from 'rxjs/index';
import {Action, Store} from '@ngrx/store';
import * as storeActions from '../store/store.actions';
import * as storeReducer from '../store/store.reducers';
import {FetchSearchResults} from './store.actions';
import {catchError, map, mergeMap} from 'rxjs/internal/operators';
import {SearchResultsModel} from '../models/search-results/search-result.model';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class StoreEffects {
  @Effect()
  getUserInfo: Observable<Action> = this.actions$.pipe(
    ofType<FetchSearchResults>('FETCH_SEARCH_RESULTS'),
    mergeMap((action) => {

      return this.httpClient.get<SearchResultsModel>(
        'https://api.efood.real.de/api/v2/real/products/search?query=' +
        action.payload['query'] + ':' + action.payload['sortBy'] +
        ':category:1&currentPage=' + action.payload['currentPage'] + '&pageSize=' + action.payload['pageSize'], {
          observe: 'body',
          responseType: 'json'
        }).pipe(
          map(data => {
            return {
              type: 'ADD_SEARCH_RESULTS',
              payload: data
            };
          }
          ),
          // catchError(() => [{type: 'LOGOUT'}])
        );
      }
    )
  );

  constructor(private actions$: Actions,
              private httpClient: HttpClient,
              private store: Store<storeReducer.StoreState>) {}
}
