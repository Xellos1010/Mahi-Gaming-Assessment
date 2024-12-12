import React from "react";
import styles from './BookMoreInfo.module.scss';
import { BookInfoProps } from "./BookInfoInterfaces";

const BookMoreInfo: React.FC<BookInfoProps> = ({ book }) => {
  return (
    <div className={styles.bookMoreInfoContainer}>
      {book.imageId ? (
        <img 
          src={book.imageId} 
          alt={`${book.title} cover`} 
          className={styles.bookCoverImage} 
        />
      ) : (
        <div className={styles.placeholderImage}>
          No Image Available
        </div>
      )}
      <p className={styles.bookDescription}>
        {book.description || 'No description available.'}
      </p>
    </div>
  );
};

export default BookMoreInfo;