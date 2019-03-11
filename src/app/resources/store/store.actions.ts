import {Action} from '@ngrx/store';
import {ShoppingListItem, ShoppingListModel} from '../models/shopping-list/shopping-list.model';
import {SearchResultsModel} from '../models/search-results/search-result.model';


// Manage shopping lists
export const CREATE_SHOPPING_LIST = 'CREATE_SHOPPING_LIST';
export const RENAME_SHOPPING_LIST = 'RENAME_SHOPPING_LIST';
export const REMOVE_SHOPPING_LIST = 'REMOVE_SHOPPING_LIST';

// Manage shopping list items
export const ADD_ITEM_TO_SHOPPING_LIST = 'ADD_ITEM_TO_SHOPPING_LIST';
export const REMOVE_ITEM_FROM_SHOPPING_LIST = 'REMOVE_ITEM_FROM_SHOPPING_LIST';
export const CHANGE_ITEM_COUNT_IN_SHOPPING_LIST = 'CHANGE_ITEM_COUNT_IN_SHOPPING_LIST';
export const CHECK_ITEM_IN_SHOPPING_LIST = 'CHECK_ITEM_IN_SHOPPING_LIST';


// Manage Searching
export const FETCH_SEARCH_RESULTS = 'FETCH_SEARCH_RESULTS';
export const ADD_SEARCH_RESULTS = 'ADD_SEARCH_RESULTS';
export const UPDATE_SEARCH_RESULTS = 'UPDATE_SEARCH_RESULTS';
export const CLEAR_SEARCH_RESULTS = 'CLEAR_SEARCH_RESULTS';




//// Manage shopping lists ////
export class CreateShoppingList implements Action {
  readonly type = CREATE_SHOPPING_LIST;
  constructor (public payload: ShoppingListModel) {}
}

export class RenameShoppingList implements Action {
  readonly type = RENAME_SHOPPING_LIST;
  constructor (public payload: {listId: number, listName: string, listDescription: string}) {}
}

export class RemoveShoppingList implements Action {
  readonly type = REMOVE_SHOPPING_LIST;
  constructor (public payload: number) {}
}

//// Manage shopping list items////
export class AddItemToShoppingList implements Action {
  readonly type = ADD_ITEM_TO_SHOPPING_LIST;
  constructor (public payload: {item: ShoppingListItem, listId: number}) {}
}

export class RemoveItemFromShoppingList implements Action {
  readonly type = REMOVE_ITEM_FROM_SHOPPING_LIST;
  constructor (public payload: {itemCode: string, listId: number}) {}
}

export class ChangeItemCountInShoppingList implements Action {
  readonly type = CHANGE_ITEM_COUNT_IN_SHOPPING_LIST;
  constructor (public payload: {itemCode: string, listId: number, changeBy: number}) {}
}

export class CheckItemInShoppingList implements Action {
  readonly type = CHECK_ITEM_IN_SHOPPING_LIST;
  constructor (public payload: {itemCode: string, listId: number}) {}
}

//// Manage searching ////
export class FetchSearchResults implements Action {
  readonly type = FETCH_SEARCH_RESULTS;
  constructor (public payload: {query: string, sortBy: string, currentPage: string, pageSize: string, isFirstFetch: boolean}) {}
}

export class AddSearchResults implements Action {
  readonly type = ADD_SEARCH_RESULTS;
  constructor (public payload: SearchResultsModel) {}
}

export class UpdateSearchResults implements Action {
  readonly type = UPDATE_SEARCH_RESULTS;
  constructor (public payload: SearchResultsModel) {}
}

export class ClearSearchResults implements Action {
  readonly type = CLEAR_SEARCH_RESULTS;
  constructor (public payload = true) {}
}


export type StoreActions =
  CreateShoppingList |
  RenameShoppingList |
  RemoveShoppingList |
  AddItemToShoppingList |
  RemoveItemFromShoppingList |
  ChangeItemCountInShoppingList |
  CheckItemInShoppingList |
  FetchSearchResults |
  AddSearchResults |
  UpdateSearchResults |
  ClearSearchResults
  ;
