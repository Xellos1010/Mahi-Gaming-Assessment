import React from "react";
import { BookInfoProps } from "./BookInfoInterfaces";
import { useUser } from "../../../context/UserContext";
import styles from './BookRowData.module.scss';

const BookRowData: React.FC<BookInfoProps> = ({ book }) => {
  const { favoriteBooks, addToFavorites, removeFromFavorites } = useUser();
  const isFavorite = favoriteBooks.some((fav) => fav.id === book.id);

  const handleClick = () => {
    isFavorite ? removeFromFavorites(book.id) : addToFavorites(book.id);
  };

  return (
    <div className={styles.bookRowContainer}>
      <div className={styles.bookDetails}>
        <div className={styles.bookTitle}>{book.title}</div>
        <div className={styles.bookAuthor}>by {book.author}</div>
      </div>
      <button 
        onClick={handleClick} 
        className={styles.favoriteButton}
      >
        {isFavorite ? "Remove from Favorites" : "Add to Favorites"}
      </button>
    </div>
  );
};

export default BookRowData;
