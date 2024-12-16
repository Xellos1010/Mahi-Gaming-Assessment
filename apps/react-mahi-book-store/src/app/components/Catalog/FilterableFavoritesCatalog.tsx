import React, { useState } from 'react';
import styles from './FilterableFavoritesCatalog.module.scss';
import SearchFilterableBooksCatalogInput from './SearchFilterableBooksCatalogInput';
import { Filter } from './FiltersInterfaces';
import FilterableScrollableBooksDisplay from './FilterableScrollableBooksDisplay';
import { useUser } from '../../..//context/UserContext';

interface FilterableFavoritesCatalogProps {
  isEditing?: boolean;
}

const FilterableFavoritesCatalog: React.FC<FilterableFavoritesCatalogProps> = ({ isEditing = false }) => {
  const { favoriteBooks, removeFromFavorites } = useUser();
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
    <div className={styles.favoritesContainer}>
      <SearchFilterableBooksCatalogInput onFilterChange={handleFilterChange} />
      <div className={styles.booksListContainer}>
        <FilterableScrollableBooksDisplay 
          books={filteredFavoriteBooks}
          isEditing={isEditing}
          onRemoveFavorite={isEditing ? removeFromFavorites : undefined}
        />
      </div>
    </div>
  );
};

export default FilterableFavoritesCatalog;