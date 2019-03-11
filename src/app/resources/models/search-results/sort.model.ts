export class Sort {
  code: string;
  name: string;
  selected: boolean;
  constructor(code: string,
              name: string,
              selected: boolean) {
    this.code = code;
    this.name = name;
    this.selected = selected;
  }
}

// export interface Sort {
//   code: string;
//   name: string;
//   selected: boolean;
// }
