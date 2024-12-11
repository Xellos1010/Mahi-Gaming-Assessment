import { useState, useEffect } from 'react';
import mockBooks from '../data/mockBooks';
import { Book } from "@prisma/client";

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate API fetch delay
    setTimeout(() => {
      setBooks(mockBooks);
      setIsLoading(false);
    }, 1000);
  }, []);

  return { books, isLoading };
};

export default useBooks;
