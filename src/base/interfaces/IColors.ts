export interface IColors extends IBaseColors {
  transparent: string;
  white: string;
  black: string;
  primary: string;
  overlay: string;
  outline: string;
  error: string;
}

interface IBaseColors {
  [key: string]: string;
}
