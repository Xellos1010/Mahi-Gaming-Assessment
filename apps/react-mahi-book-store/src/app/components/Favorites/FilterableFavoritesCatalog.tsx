import React, { useState } from 'react';
import SearchFilterableBooksCatalogInput from '../Catalog/SearchFilterableBooksCatalogInput';
import { Filter } from '../Catalog/FiltersInterfaces';
import { useUser } from '@frontend/context/UserContext';
import FilterableScrollableBooksDisplay from '../Catalog/FilterableScrollableBooksDisplay';

const FilterableFavoritesCatalog: React.FC = () => {
  const { favoriteBooks } = useUser();
  const [filter, setFilter] = useState<Filter>({ title: '', author: '' });

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  // Filter favorite books based on title and author
  const filteredFavoriteBooks = favoriteBooks.filter((book) => {
    const isTitleMatch = !filter.title || book.title.toLowerCase().includes(filter.title.toLowerCase());
    const isAuthorMatch = !filter.author || book.author.toLowerCase().includes(filter.author.toLowerCase());
    return isTitleMatch && isAuthorMatch;
  });

  return (
    <div>
      <SearchFilterableBooksCatalogInput onFilterChange={handleFilterChange} />
      <FilterableScrollableBooksDisplay books={filteredFavoriteBooks} />
    </div>
  );
};

export default FilterableFavoritesCatalog;