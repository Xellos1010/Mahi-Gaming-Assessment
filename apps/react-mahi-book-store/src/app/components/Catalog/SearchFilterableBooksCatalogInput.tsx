import React, { useState } from 'react';
import styles from './SearchFilterableBooksCatalogInput.module.scss';
import { SearchFilterableBooksCatalogInputProps } from './FiltersInterfaces';

const SearchFilterableBooksCatalogInput: React.FC<SearchFilterableBooksCatalogInputProps> = ({ onFilterChange }) => {
  const [filters, setFilters] = useState({ title: '', author: '' });

  const handleInputChange = (field: 'title' | 'author', value: string) => {
    const updatedFilters = { ...filters, [field]: value };
    setFilters(updatedFilters);
    onFilterChange(updatedFilters);
  };

  return (
    <div className={styles.searchContainer}>
      <input
        type="text"
        placeholder="Search by title"
        className={styles.searchInput}
        value={filters.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
      />
      <input
        type="text"
        placeholder="Search by author"
        className={styles.searchInput}
        value={filters.author}
        onChange={(e) => handleInputChange('author', e.target.value)}
      />
    </div>
  );
};

export default SearchFilterableBooksCatalogInput;