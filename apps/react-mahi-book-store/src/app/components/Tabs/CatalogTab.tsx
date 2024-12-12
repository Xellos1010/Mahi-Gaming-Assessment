import React from "react";
import FilterableBooksCatalog from "../Catalog/FilterableBooksCatalog";
import { useBooks } from "@frontend/context/BooksContext";

const CatalogTab: React.FC = () => {
  const { books, isLoading } = useBooks();

  if (isLoading) return <div>Loading books...</div>;

  return (
    <div>
      <FilterableBooksCatalog books={books} />
    </div>
  );
};

export default CatalogTab;