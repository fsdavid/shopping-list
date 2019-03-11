import {Image} from './image.model';
import {PosProduct} from './pos-product.model';
import {Price} from './price.model';
import {Stock} from './stock.model';

export class Product {
  assortmentGroup: string;
  brand: string;
  bulkyProduct: boolean;
  code: string;
  contentUnit: string;
  description: string;
  images: Image[];
  name: string;
  numberContentUnits: string;
  posProduct: PosProduct;
  price: Price;
  stock?: Stock;
  url: string;
  campaigns?: string;
  constructor(  assortmentGroup: string,
                brand: string,
                bulkyProduct: boolean,
                code: string,
                contentUnit: string,
                description: string,
                images: Image[],
                name: string,
                numberContentUnits: string,
                posProduct: PosProduct,
                price: Price,
                stock: Stock = null,
                url: string,
                campaigns: string = null) {
    this.assortmentGroup = assortmentGroup;
    this.brand = brand;
    this.bulkyProduct = bulkyProduct;
    this.code = code;
    this.contentUnit = contentUnit;
    this.description = description;
    this.images = images;
    this.name = name;
    this.numberContentUnits = numberContentUnits;
    this.posProduct = posProduct;
    this.price = price;
    this.stock = stock;
    this.url = url;
    this.campaigns = campaigns;
  }
}

// export interface Product {
//   assortmentGroup: string;
//   brand: string;
//   bulkyProduct: boolean;
//   code: string;
//   contentUnit: string;
//   description: string;
//   images: Image[];
//   name: string;
//   numberContentUnits: string;
//   posProduct: PosProduct;
//   price: Price;
//   stock?: Stock;
//   url: string;
//   campaigns?: string;
// }
