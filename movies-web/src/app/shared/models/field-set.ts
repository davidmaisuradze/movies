export enum ViewFieldSet {
  horizontal = 1,
  vertical = 2
}

export interface FieldSet extends Object {
  id: string;
  label?: string;
  value?: any;
  validators?: any;
  isGroup?: boolean;
  isArray?: boolean;
  hidden?: boolean;
  disabled?: boolean;
  view?: ViewFieldSet;
}
