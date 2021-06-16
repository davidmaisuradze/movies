export interface Filter {
  searchTerm: string;
  sort: Sort;
}

export interface Sort {
  sortByNamesAsc?: boolean;
  sortByDatesAsc?: boolean;
}
