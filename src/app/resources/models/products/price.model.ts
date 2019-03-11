import {BasePrice} from './base-price.model';

export class Price {
  currencyIso: string;
  formattedValue: string;
  priceType?: string;
  value: number;
  basePrice?: BasePrice;
  constructor(  currencyIso: string,
                formattedValue: string,
                priceType: string = null,
                value: number,
                basePrice: BasePrice = null) {
    this.currencyIso = currencyIso;
    this.formattedValue = formattedValue;
    this.priceType = priceType;
    this.value = value;
    this.basePrice = basePrice;
  }
}

// export interface Price {
//   currencyIso: string;
//   formattedValue?: string;
//   priceType?: string;
//   value: number;
//   basePrice?: BasePrice;
// }
