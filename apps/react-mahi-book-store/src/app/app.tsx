// apps/react-mahi-book-store/src/App.tsx
import React from "react";
import { useBooks } from "../context/BooksContext";
import FilterableBooksCatalog from "./components/Catalog/FilterableBooksCatalog";

const App: React.FC = () => {
  const { books, isLoading } = useBooks();

  if (isLoading) return <div>Loading...</div>;
  return (
    <div>
      <FilterableBooksCatalog books={books} />
    </div>
  );
};

export default App;
