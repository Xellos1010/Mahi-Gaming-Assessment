import React, { useState } from 'react';
import styles from './FilterableBooksCatalog.module.scss';
import { BooksInfoProps } from '../Book/BookInfoInterfaces';
import FilterableScrollableBooksDisplay from './FilterableScrollableBooksDisplay';
import { Filter } from './FiltersInterfaces';
import SearchFilterableBooksCatalogInput from './SearchFilterableBooksCatalogInput';

const FilterableBooksCatalog: React.FC<BooksInfoProps> = ({ books }) => {
  const [filter, setFilter] = useState<Filter>({ title: '', author: '' });

  const handleFilterChange = (newFilter: Filter) => {
    setFilter(newFilter);
  };

  const filteredBooks = Array.isArray(books)
    ? books.filter((book) => {
      const isTitleMatch = !filter.title || book.title.toLowerCase().includes(filter.title.toLowerCase());
      const isAuthorMatch = !filter.author || book.author.toLowerCase().includes(filter.author.toLowerCase());
      return isTitleMatch && isAuthorMatch;
    })
    : [];
  
  // console.log('Is books an array?', Array.isArray(books));
  // console.log('books?', books);

  return (
    <div className={styles.catalogContainer}>
      <SearchFilterableBooksCatalogInput onFilterChange={handleFilterChange} />
      <FilterableScrollableBooksDisplay books={filteredBooks} />
    </div>
  );
};

export default FilterableBooksCatalog;