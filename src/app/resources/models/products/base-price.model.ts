export class BasePrice {
  basePrice: number;
  basePriceBaseFactor: number;
  basePriceUnit: string;
  constructor(  basePrice: number,
                basePriceBaseFactor: number,
                basePriceUnit: string) {
    this.basePrice = basePrice;
    this.basePriceBaseFactor = basePriceBaseFactor;
    this.basePriceUnit = basePriceUnit;
  }
}

//
// export interface BasePrice {
//   basePrice: number;
//   basePriceBaseFactor: number;
//   basePriceUnit: string;
// }
