import * as storeActions from './store.actions';

import {Product} from '../models/products/product.model';
import {ShoppingListModel} from '../models/shopping-list/shopping-list.model';
import {SearchResultsModel} from '../models/search-results/search-result.model';

export interface StoreState {
  store: State;
}

export interface State {
  products: Product[];
  shoppingLists: ShoppingListModel[];
  searchResults: SearchResultsModel;
}

const initialState: State = {
  products: [],
  shoppingLists: [{
    listId: 0,
    shoppingListName: 'Default list',
    shoppingListDescription: 'Default list to use generally.',
    shoppingListItems: []
  }],
  searchResults: {
    type: '',
    currentQuery: {
      query: {
        value: ''
      },
      url: ''
    },
    freeTextSearch: '',
    pagination: {
      currentPage: 0,
      pageSize: 0,
      sort: '',
      totalPages: 0,
      totalResults: 0
    },
    products: [],
    sorts: []
  }
};

export function storeReducer (state = initialState, action: storeActions.StoreActions) {
  switch (action.type) {

    case (storeActions.CREATE_SHOPPING_LIST) :
      return {
        ...state,
        shoppingLists: [...state.shoppingLists, action.payload]
      };
    case (storeActions.RENAME_SHOPPING_LIST) :
      const indexChangeListName = state.shoppingLists.findIndex((obj => obj.listId === action.payload['listId']));
      const listToEditName = state.shoppingLists[indexChangeListName];

      const editedList = listToEditName;
      editedList.shoppingListName = action.payload['listName'];
      editedList.shoppingListDescription = action.payload['listDescription'];

      const updatedList = {
        ...listToEditName,
        ...editedList
      };

      const listsToUpdate = [...state.shoppingLists];
      listsToUpdate[indexChangeListName] = updatedList;
      return {
        ...state,
        shoppingLists: listsToUpdate
      };

    case (storeActions.REMOVE_SHOPPING_LIST) :
      const indexRemoveShoppingList = state.shoppingLists.findIndex((obj => obj.listId === action.payload));
      const removingList = [...state.shoppingLists];
      removingList.splice(indexRemoveShoppingList, 1);
      return {
        ...state,
        shoppingLists: removingList,
      };


    case (storeActions.REMOVE_ITEM_FROM_SHOPPING_LIST) :
      const indexRemoveItemFrom = state.shoppingLists.findIndex((obj => obj.listId === action.payload['listId']));
      const indexOfRemoveItem = state.shoppingLists[indexRemoveItemFrom].shoppingListItems.findIndex((obj => obj.item.code === action.payload['itemCode']));


      const removingItemFromList = [...state.shoppingLists];

      removingItemFromList[indexRemoveItemFrom].shoppingListItems.splice(indexOfRemoveItem, 1);
      return {
        ...state,
        shoppingLists: removingItemFromList,
      };

    case (storeActions.CHANGE_ITEM_COUNT_IN_SHOPPING_LIST) :
      const indexUpdateItemCountFrom = state.shoppingLists.findIndex((obj => obj.listId === action.payload['listId']));
      const indexUpdateItemCount = state.shoppingLists[indexUpdateItemCountFrom].shoppingListItems.findIndex((obj => obj.item.code === action.payload['itemCode']));
      const updateItemCount = state.shoppingLists[indexUpdateItemCountFrom].shoppingListItems[indexUpdateItemCount];
      const editedUpdateItemCount = updateItemCount;

      if (action.payload['changeBy'] === 1) {
        if (updateItemCount.itemCount > 1) {
          editedUpdateItemCount.itemCount -= 1;
        }
      } else if (action.payload['changeBy'] === 2) {
        editedUpdateItemCount.itemCount += 1;
      }

      const updatedListItem = {
        ...updateItemCount,
        ...editedUpdateItemCount
      };

      const listItemsToUpdate = [...state.shoppingLists];
      listItemsToUpdate[indexUpdateItemCountFrom].shoppingListItems[indexUpdateItemCount] = updatedListItem;
      return {
        ...state,
        shoppingLists: listItemsToUpdate
      };


    case (storeActions.CHECK_ITEM_IN_SHOPPING_LIST) :
      const indexUpdateItemChechFrom = state.shoppingLists.findIndex((obj => obj.listId === action.payload['listId']));
      const indexUpdateItemChech = state.shoppingLists[indexUpdateItemChechFrom].shoppingListItems.findIndex((obj => obj.item.code === action.payload['itemCode']));
      const updateItemCheck = state.shoppingLists[indexUpdateItemChechFrom].shoppingListItems[indexUpdateItemChech];
      const editedUpdateItemCheck = updateItemCheck;

      editedUpdateItemCheck.itemChecked = !editedUpdateItemCheck.itemChecked;

      const updatedListItemCheck = {
        ...updateItemCheck,
        ...editedUpdateItemCheck
      };

      const listItemsToUpdateCheck = [...state.shoppingLists];
      listItemsToUpdateCheck[indexUpdateItemChechFrom].shoppingListItems[indexUpdateItemChech] = updatedListItemCheck;
      return {
        ...state,
        shoppingLists: listItemsToUpdateCheck
      };


    case (storeActions.ADD_ITEM_TO_SHOPPING_LIST) :
      const indexshoppingListToAddItem = state.shoppingLists.findIndex(obj => obj.listId === action.payload['listId']);

      const shoppingListToAddItem = state.shoppingLists[indexshoppingListToAddItem];
      const editedShoppingListToAdd = shoppingListToAddItem;


      const itemAlreadyAdded = editedShoppingListToAdd.shoppingListItems.findIndex((obj => obj.item.code === action.payload['item']['item']['code']));



      if (itemAlreadyAdded === -1) {
        editedShoppingListToAdd.shoppingListItems.push(action.payload['item']);
      } else {
        editedShoppingListToAdd.shoppingListItems[itemAlreadyAdded].itemCount += 1;
      }


      const addedlistItemsToUpdate = [...state.shoppingLists];
      addedlistItemsToUpdate[indexshoppingListToAddItem] = editedShoppingListToAdd;
      return {
        ...state,
        shoppingLists: addedlistItemsToUpdate
      };


    case (storeActions.ADD_SEARCH_RESULTS) :
      return {
        ...state,
        searchResults: action.payload
      };

    case (storeActions.UPDATE_SEARCH_RESULTS) :

      const searchResultToUpdate = state.searchResults;

      searchResultToUpdate.pagination.currentPage = action.payload['pagination']['currentPage'];
      if (action.payload['products']) {
        action.payload['products'].forEach(eachObj => {
          searchResultToUpdate.products.push(eachObj);
        });
      }

      return {
        ...state,
        searchResults: searchResultToUpdate
      };


    case (storeActions.CLEAR_SEARCH_RESULTS) :
      return {
        ...state,
        searchResults: {
          type: '',
          currentQuery: {
            query: {
              value: ''
            },
            url: ''
          },
          freeTextSearch: '',
          pagination: {
            currentPage: 0,
            pageSize: 0,
            sort: '',
            totalPages: 0,
            totalResults: 0
          },
          products: [],
          sorts: []
        }
      };





    default:
      return state;
  }
}
