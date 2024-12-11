// Define a type for the onFilterChange function
export interface SearchFilterableBooksCatalogInputProps {
    onFilterChange: (filters: Filter) => void;
}

export interface Filter {
    title: string,
    author: string; // Define the props interface with a Book type
}