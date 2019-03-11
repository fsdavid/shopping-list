import {Product} from '../products/product.model';

export class  ShoppingListModel {
  listId: number;
  shoppingListName: string;
  shoppingListDescription?: string;
  shoppingListItems?: ShoppingListItem[];
  constructor(listId: number, shoppingListName: string, shoppingListDescription: string = '', shoppingListItems: ShoppingListItem[] = null) {
    this.listId = listId;
    this.shoppingListName = shoppingListName;
    this.shoppingListDescription = shoppingListDescription;
    this.shoppingListItems = shoppingListItems;
  }
}

export class ShoppingListItem {
  itemChecked: boolean;
  itemCount: number;
  item: Product;
  constructor( itemChecked: boolean, itemCount: number, item: Product) {
    this.itemChecked = itemChecked;
    this.itemCount = itemCount;
    this.item = item;
  }
}
