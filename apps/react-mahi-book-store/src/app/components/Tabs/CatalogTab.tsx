import React from "react";
import styles from './CatalogTab.module.scss';
import FilterableBooksCatalog from "../Catalog/FilterableBooksCatalog";
import { useBooks } from "@frontend/context/BooksContext";

const CatalogTab: React.FC = () => {
  const { books, isLoading } = useBooks();

  if (isLoading) {
    return <div className={styles.loadingState}>Loading books...</div>;
  }

  return (
    <div className={styles.catalogContainer}>
      <FilterableBooksCatalog books={books} />
    </div>
  );
};

export default CatalogTab;